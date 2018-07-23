import React, { Component } from 'react'
import Loader from '../layout/Loader'
import axios from '../api/init'
import Multiselect from 'react-widgets/lib/Multiselect'
import 'react-widgets/dist/css/react-widgets.css';
import ReactSvgPieChart from "react-svg-piechart"
import { post } from 'axios';

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
      file: null,
      author: '',
      createdAt: ''
    }
    this.onUsersFormSubmit = this.onUsersFormSubmit.bind(this)
    this.onNewVersionFormSubmit = this.onNewVersionFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
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
    } })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  onNewVersionFormSubmit(e){
    e.preventDefault()
    const {file, author, createdAt} = this.state
    this.fileUpload(file, author, createdAt).then((response)=>{
      console.log(response.data);
    })
  }

  onChange(e) {
    this.setState({file:e.target.files[0]})
  }

  fileUpload(file, author, createdAt){
    const url = `${process.env.REACT_APP_BACKEND_URL}/sops/addversion/${this.props.match.params.id}`;
    const formData = new FormData();
    formData.append('file', file)
    formData.append('author', author)
    formData.append('createdAt', createdAt)
    const config = {
        withCredentials: true,
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return post(url, formData, config)
  }

  render() {
    if (!this.state.loaded) { return(<Loader/>)}
    const previousSops = this.state.sop.previousVersions.map((sop, i) => <tr><td>{sop.version}</td><td>{sop.createdAt}</td><td>{sop.author}</td><td>{sop.awsPath}</td></tr>)
    const usersRead = this.state.sop.currentVersion.usersRead.map( (user, i) => <li key={i}>{user.fullName}</li>)
    const usersUnread = this.state.usersUnread.map( (user, i) => <li key={i}>{user.fullName} <button onClick={() => this.onRemoveUser(user)}>Remove</button></li>)
    return(
      <div>
        <dl className="row data-wrapper3">
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

        <div className="row data-wrapper3">
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
      <div className="data-wrapper3">
        <p> Users Read </p>
        <ul>{usersRead}</ul>
        <p> Users Unread </p>
        <ul>{usersUnread}</ul>

        <form onSubmit={this.onUsersFormSubmit}>
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
          <button className="btn btn-success" type="submit">Add Users </button>
        </form>
      </div>
      <div className="data-wrapper3">
        <form onSubmit={this.onNewVersionFormSubmit}>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input type="text" 
                  name="author" id="author"
                  className="form-control" 
                  value={this.state.author} 
                  onChange={this.handleInputChange} />
          </div>


          <div className="form-group">
            <label htmlFor="createdAt">Date Created</label>
            <input type="date" className="form-control" id="createdAt" name="createdAt"
            value={this.state.createdAt} 
            onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <input type="file" className="form-control-file" onChange={this.onChange} />
          </div>

          <button className="btn btn-success" type="submit">Add SOP Version</button>
          </form>
      </div>

      <div className="data-wrapper3">
        <h3>Previous Versions</h3>
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