import React, { Component } from 'react'
import axios from '../api/init'
import { Redirect } from 'react-router-dom';

require('dotenv').config()

class Login extends Component {
  constructor() {
    super()
    this.state = {
      employeeNumber: "",
      password: "", 
      loggedIn: false,
      errors: {}
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  
  onSubmit(e) {
    e.preventDefault()
    const user = {
      employeeNumber: this.state.employeeNumber,
      password: this.state.password,
    }
    console.log(user)
    axios.post("/users/login", user) 
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({loggedIn: true})
       
        if(this.state.loggedIn = true){
         console.log("hi, you're logged in!")
       }
      })
      .catch(err => console.error(err))
 
  }

  render() {
    return (
      <div className="login">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          {/* <h2 className="display-4 text-center">Log In</h2> */}
          <br/>
          <br/>
          <br/>
          <h3 className="display-8 text-center">Toyota Australia</h3>
          <h3 className="display-8 text-center">Product Planning Division</h3>
          <h3 className="display-8 text-center">Standard Operating Procedures</h3>
          <br/>
          <br/>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
              <input type="text" 
              className="form-control form-control-lg" 
              placeholder="Toyota Number" 
              name="employeeNumber"
              value={this.state.employeeNumber}
              onChange={this.onChange.bind(this)} 
              />
            </div>
            <br/>
            <div className="form-group">
              <input type="password" 
              className="form-control form-control-lg" 
              placeholder="Password" 
              name="password" 
              value={this.state.password}
              onChange={this.onChange.bind(this)} 
              />
            </div>
            <br/>
            <br/>
            <div className="text-center"> 
            <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
    )
  }
}

export default Login
