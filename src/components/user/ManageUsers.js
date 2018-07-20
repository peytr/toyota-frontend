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
    <h1>Manage your Users </h1>
    <ListWrapper {...this.state} />
    <Link to="/register">
        <button type="button">
              Create new user
        </button>
     </Link>
     <Link to="/user/5b4b105fc370096ec3bd4660">
        <button type="button">
            User 1
        </button>
    </Link>
      
      </div>
    )
  }
}

export default ManageUsers