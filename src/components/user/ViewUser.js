import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import instance from '../api/init'

class ViewUser extends Component {

  componentDidMount() {
    instance.get(`users/${this.props.match.params.id}`)
     .then((response) => {
       console.log(response.data);
       this.setState({email: response.data.email, firstName: response.data.firstName})
     })
    .catch((error)=>{
       console.log(error);
    })
  }
  
  render() {
    return (
      <div>
    <h1>View User</h1>
      <p>{this.props.match.params.id}</p>
      {/* <p>{this.state.email}</p> */}

      </div>
    )
  }
}

export default ViewUser