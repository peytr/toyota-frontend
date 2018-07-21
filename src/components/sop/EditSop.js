import React, { Component } from 'react'
import Loader from '../layout/Loader'
import axios from '../api/init'

class EditSop extends Component {
  state = {
    sop: null,
    loaded: false,
  }

  componentDidMount() {
    axios.get(`/sops/${this.props.match.params.id}`)
      .then((response) => {
        console.log(response);
        this.setState({
          sop: response.data,
          loaded: true
        })
      })
    .catch((error)=>{
        console.log(error);
    })
  }
    

  render() {
    if (!this.state.loaded) { return(<Loader/>)}
    return(
      <dl class="row">
        <dt class="col-sm-3">Title</dt>
        <dd class="col-sm-9">{this.state.sop.title}</dd>

        <dt class="col-sm-3">Department</dt>
        <dd class="col-sm-9">{this.state.sop.department}</dd>

        <dt class="col-sm-3">Author</dt>
        <dd class="col-sm-9">
          {this.state.sop.currentVersion.author}
        </dd>

        <dt class="col-sm-3">Date Created</dt>
        <dd class="col-sm-9">
          {this.state.sop.currentVersion.createdAt}
        </dd>

        <dt class="col-sm-3">Latest Version</dt>
        <dd class="col-sm-9">
          {this.state.sop.currentVersion.version}
        </dd>
    </dl>
    )
  }
}

export default EditSop