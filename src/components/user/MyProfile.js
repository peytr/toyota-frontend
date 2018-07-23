import React, { Component } from 'react'
import instance from '../api/init'
// import { Link } from 'react-router-dom'

class MyProfile extends Component {

  state = { user: "" }

  componentDidMount() {
    instance.get('users/me')
     .then((response) => {
       console.log(response);
       this.setState({
         user: response.data
        })
     })
    .catch((error)=>{
       console.log(error);
    })
  }

  render() {
    return (  
 <div>    
      <h3 className="head text-center">{this.state.user.firstName} {this.state.user.lastName} -  {this.state.user.department} </h3>
  <div className="data-wrapper">
    <br/>
      <div className="profile-heading">
        <h3 className="profile-title">Profile</h3>
      </div>    
      <div className="details">
        <ul className="list-group">
          <li className="list-group-item 1">First Name:<span className="tab-space1">{this.state.user.firstName}</span> </li>
          <li className="list-group-item 2">Second Name:<span className="tab-space2"> {this.state.user.lastName}</span></li>
          <li className="list-group-item 3">Email:<span className="tab-space3"> {this.state.user.email}</span></li>
          <li className="list-group-item 4">Department:<span className="tab-space4"> {this.state.user.department}</span></li>
          <li className="list-group-item 5">Employee Number:<span className="tab-space5"> {this.state.user.employeeNumber}</span></li>
        </ul>
      </div>

      <div className="btn-toolbar text-center">
        <a href= "http://localhost:3000/password">
          <button type="button" id="btnSubmit" className="btn btn-secondary btn-sm butty">Change Password</button>
        </a>
        <a href={`mailto:${process.env.REACT_APP_EMAIL}?subject=Please update my details on SOP Portal`}>
          <button type="button" id="btnCancel" className="btn btn-secondary btn-sm butty">Request Update</button>
        </a> 
      </div>
  </div> 
</div> 
    )
  }
}

export default MyProfile