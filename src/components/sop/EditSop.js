import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader'
import axios from '../api/init'
import Multiselect from 'react-widgets/lib/Multiselect'
import 'react-widgets/dist/css/react-widgets.css';
import ReactSvgPieChart from "react-svg-piechart"

class EditSop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sop: null,
      loaded: false,
      usersUnread: [],
      usersSelectable: [],
      selected: [],
      pieData: [],
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  componentDidMount() {
    axios.get(`/sops/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          sop: response.data.sop,
          loaded: true,
          usersUnread: response.data.usersUnread,
          usersSelectable: response.data.usersSelectable,
          pieData: response.data.sop.currentVersion.pieData
        })
      })
    .catch((error)=>{
        console.log(error);
    })
  }

  onRemoveUser(user) {
    const userId = user._id
    axios.patch(`/sops/removeuser/${this.props.match.params.id}`, {userId})
    .then(
      this.setState((prevState) => {
        const usersUnread  = prevState.usersUnread.filter( x => x._id !== userId)
        const usersSelectable = prevState.usersSelectable.concat(user)
      return {
        usersUnread,
        usersSelectable
      }})
    )
    .catch()
  }

  onFormSubmit(e){
    e.preventDefault()
    const userIds = this.state.selected.map(user => user._id)
    axios.patch(`/sops/addusers/${this.props.match.params.id}`, {userIds})
    .then(res => { if (res.data.success) {
      this.setState(((prevState) => {
        const usersUnread  = prevState.usersUnread.concat(prevState.selected)
        const usersSelectable = prevState.usersSelectable.filter(user => usersUnread.indexOf(user) === -1)
        return {
          usersUnread,
          usersSelectable,
          selected: []
        }
      }))
    } })
  }

  render() {
    if (!this.state.loaded) { return(<Loader/>)}
    const usersRead = this.state.sop.currentVersion.usersRead.map( (user, i) => <li key={i}>{user.fullName}</li>)
    const usersUnread = this.state.usersUnread.map( (user, i) => <li key={i}>{user.fullName} <button onClick={() => this.onRemoveUser(user)}>Remove</button></li>)
    return(
      <div>
        <dl className="row">
          <dt className="col-sm-3">Title</dt>
          <dd className="col-sm-9">{this.state.sop.title}</dd>

          <dt className="col-sm-3">Department</dt>
          <dd className="col-sm-9">{this.state.sop.department}</dd>

          <dt className="col-sm-3">Author</dt>
          <dd className="col-sm-9">{this.state.sop.currentVersion.author}</dd>

          <dt className="col-sm-3">Date Created</dt>
          <dd className="col-sm-9">{this.state.sop.currentVersion.createdAt}</dd>

          <dt className="col-sm-3">Latest Version</dt>
          <dd className="col-sm-9">{this.state.sop.currentVersion.version}</dd>
      </dl>

      <div className="row">
        <div className="col-sm-8">
          <dl className="row">
          <dt className="col-sm-4">Users Viewed</dt>
          <dd className="col-sm-8">{this.state.sop.currentVersion.summaryStats.read}</dd>

          <dt className="col-sm-4">Users Not Viewed</dt>
          <dd className="col-sm-8">{this.state.sop.currentVersion.summaryStats.unread}</dd>

          <dt className="col-sm-4">Users Required To View</dt>
          <dd className="col-sm-8">{this.state.sop.currentVersion.summaryStats.total}</dd>
          </dl>
        </div>
        <div className="col-sm-4">
          <ReactSvgPieChart data={this.state.sop.currentVersion.pieData} />
        </div>
      </div>
    <div>
      <p> Users Read </p>
      <ul>{usersRead}</ul>
    </div>
    <div>
      <p> Users Unread </p>
      <ul>{usersUnread}</ul>
    </div>
    
      <form onSubmit={this.onFormSubmit}>
        <Multiselect
          data={this.state.usersSelectable}
          value={this.state.selected}
          valueField='_id'
          textField='fullName'
          groupBy='department'
          multiple="true"
          caseSensitive={false}
          minLength={3}
          filter='contains'
          name='test'
          id='test'
          onChange={selected => this.setState({ selected })}
        />
        <button className="btn btn-primary" type="submit">Add Users </button>
      </form>
    </div>
    )
  }
}

export default EditSop