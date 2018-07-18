import React, { Component } from 'react'
import instance from '../api/init'
// import { Link } from 'react-router-dom'

class MyProfile extends Component {

  componentDidMount() {
    instance.get('users/5b4b105fc370096ec3bd4660')
     .then((response) => {
       console.log(response);
       this.setState({email: response.data.email, firstName: response.data.firstName})
       console.log(this.state)
     })
    .catch((error)=>{
       console.log(error);
    })
  }

  render() {
    return (
      <div>
        <h1>Your profile</h1>
      </div>
    )
  }
}

export default MyProfile