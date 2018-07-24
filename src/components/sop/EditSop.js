import React, { Component } from 'react'
import Loader from '../layout/Loader'
import axios from '../api/init'
import { Link } from 'react-router-dom'
import Multiselect from 'react-widgets/lib/Multiselect'
import ReactSvgPieChart from "react-svg-piechart"
import moment from 'moment'
import 'react-widgets/dist/css/react-widgets.css'

class EditSop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      sop: null,
      sopVersion: null,
      sopTitle: null,
      sopCurrentVersion: null,
      sopPreviousVersions: null,
      usersRead: [],
      usersUnread: [],
      usersSelectable: [],
      selected: [],
      successMessage: false
    }
    this.onUsersFormSubmit = this.onUsersFormSubmit.bind(this)
  }

  componentDidMount() {
    axios.get(`/sops/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          sop: response.data.sop,
          sopVersion: response.data.sop.version,
          sopTitle: response.data.sop.title,
          sopCurrentVersion: response.data.sop.currentVersion,
          sopPreviousVersions: response.data.sop.previousVersions,
          sopAwsPath: response.data.sop.currentVersion.awsPath,
          usersRead: response.data.sop.currentVersion.usersRead,
          usersUnread: response.data.usersUnread,
          usersSelectable: response.data.usersSelectable,
          loaded: true
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

  onUsersFormSubmit(e){
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
    }})
  }

  onChange(e) {
    this.setState({file:e.target.files[0]})
  }

  render() {
    if (!this.state.loaded) { return(<Loader/>)}
    const previousSops = this.state.sopPreviousVersions.map((sop, i) => <tr key={i}><td>{sop.version}</td><td>{sop.createdAt}</td><td>{sop.author}</td><td>{sop.awsPath}</td></tr>)
    const usersRead = this.state.usersRead.map( (user, i) => <div className="list-group-item" key={i}>{user.fullName}</div>)
    const usersUnread = this.state.usersUnread.map( (user, i) => <div className="list-group-item" key={i}>{user.fullName} <button onClick={() => this.onRemoveUser(user)}>Remove</button></div>)
    const pieData = [
      {
          "title": "Read",
          "value": this.state.usersRead.length,
          "color": "green"
      },
      {
          "title": "Unread",
          "value": this.state.usersUnread.length,
          "color": "red"
      }
  ]
    return(
      <div>
        <div className="data-wrapper3">
          <h3 className="solid-heading">SOP - Current Version</h3>
          <br/>
          <dl className="row">
            <dt className="col-sm-3">Title</dt>
            <dd className="col-sm-9">{this.state.sop.title}</dd>
            <dt className="col-sm-3">Department</dt>
            <dd className="col-sm-9">{this.state.sop.department}</dd>
          </dl>
          <hr />
          <dl className="row">
            <dt className="col-sm-3">Author</dt>
            <dd className="col-sm-9">{this.state.sop.currentVersion.author}</dd>
            <dt className="col-sm-3">Date Created</dt>
            <dd className="col-sm-9">{moment(this.state.sop.currentVersion.createdAt).format('DD MMMM YYYY')}</dd>
            <dt className="col-sm-3">Date Expiring</dt>
            <dd className="col-sm-9">{moment(this.state.sop.currentVersion.currentExpires).format('DD MMMM YYYY')}</dd>
            <dt className="col-sm-3">Latest Version</dt>
            <dd className="col-sm-9">{this.state.sop.currentVersion.version}</dd>
          </dl>
          
          <hr />

          <div className="row">
            <div className="col-sm-8">
              <dl className="row">
                <dt className="col-sm-4 ">Users Viewed</dt>
                <dd className="col-sm-8">{this.state.usersRead.length}</dd>
                <dt className="col-sm-4">Users Not Viewed</dt>
                <dd className="col-sm-8">{this.state.usersUnread.length}</dd>
                <dt className="col-sm-4">Users Required To View</dt>
                <dd className="col-sm-8">{this.state.usersRead.length + this.state.usersUnread.length}</dd>
              </dl>
            </div>
            <div className="col-sm-3">
              <ReactSvgPieChart data={pieData} />
            </div>
          </div>
          
          <hr />
          
            <div className="card">
              <div className="card-header" id="SopEmployees" data-toggle="collapse" data-target="#employees" aria-expanded="true" aria-controls="employees">
                    <strong>+ Manage Users Required to View this SOP</strong>
              </div>
              <div id="employees" className="collapse" aria-labelledby="SopEmployees" data-parent="#accordion">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="list-group">
                        <div className="list-group-item list-group-item-light">Users Read</div>
                        {usersRead}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="list-group">
                        <div className="list-group-item list-group-item-light">Users Unread</div>
                        {usersUnread}
                      </div>
                    </div>
                  </div>
                <br />
                <form className="list-group" onSubmit={this.onUsersFormSubmit}>
                  <div className="list-group-item list-group-item-light">Add users required to read this SOP</div>
                  <div className="list-group-item text-right">
                    <Multiselect
                      className="col-xs-9"
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
                    <button className="btn btn-light " type="submit">Add Users </button>
                  </div>
                </form>
              </div>
            </div>
            </div>          

        <hr/>

        <div className="d-flex flex-wrap justify-content-around">
          <Link to="#"><button className="btn btn-success">Edit details of SOP</button></Link>
          <Link to={
            {
              pathname: `/sops/${this.props.match.params.id}/addversion`,
              state: {sop: this.state.sop}
            }}> <button className="btn btn-success">Add New Version of SOP</button> </Link>
          <button className="btn btn-danger">Delete SOP</button>
        </div>

        <hr/>

      </div>

      <div className="data-wrapper3">
        <h3 className="solid-heading">SOP - Previous Versions</h3>
        <table className="table">
          <thead>
            <tr>
            <th>Version</th>
            <th>Date Created</th>
            <th>Author</th>
            <th>View</th>
            </tr>
          </thead>
          <tbody>
            {previousSops}
          </tbody>
        </table>
      </div>
    </div>
    )
  }
}

export default EditSop