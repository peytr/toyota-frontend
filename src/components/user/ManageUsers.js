import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ManageUsers extends Component {
  render() {
    return (
      <div>
    <h1>Manage your Users </h1>
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