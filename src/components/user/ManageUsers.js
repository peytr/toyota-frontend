import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import instance from '../api/init'
import ListWrapper from './ListWrapper.js'

class ManageUsers extends Component {

  state = {users: [{}] } 

  componentDidMount() {
    instance.get('users/')
     .then((response) => {
       console.log(response);
       this.setState({
         users: response.data
        })
       console.log(this.state)
     })
    .catch((error)=>{
       console.log(error);
    })
  }


  render() {
    return (
      <div>
        <h1>Manage Users </h1>
        <ListWrapper {...this.state} />
        <Link to="/register"><button className="btn btn-primary">Create New User</button></Link>
      </div>
    )
  }
}

export default ManageUsers