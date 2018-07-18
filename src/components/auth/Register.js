import React, { Component } from 'react'
import axios from '../api/init'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      firstName: "",
      lastName: "",
      employeeNumber: "",
      email: "",
      department: "",
      password: "", 
      password2: "",
      errors: {}
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  
  onSubmit(e) {
    e.preventDefault()
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      employeeNumber: this.state.employeeNumber,
      email: this.state.email,
      department: this.state.department,
      password: this.state.password,
      password2: this.state.password2
    }
    console.log(newUser)
    axios.post("/users/register", newUser) 
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(err => console.error(err))
}

  

  render() {
    return (
      <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
          <br/>
            <p className="lead text-center">Create New User</p>
           
            <form onSubmit={this.onSubmit.bind(this)}>
            <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">First Name</label>
            <div class="col-10">
              <input class="form-control" type="text" value="Artisanal kale" id="example-text-input"/>
            </div>
            </div>
            <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Last Name</label>
            <div class="col-10">
              <input class="form-control" type="text" value="Artisanal kale" id="example-text-input"/>
            </div>
            </div>
            <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">First Name</label>
            <div class="col-10">
              <input class="form-control" type="text" value="Artisanal kale" id="example-text-input"/>
            </div>
            </div>
            <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">First Name</label>
            <div class="col-10">
              <input class="form-control" type="text" value="Artisanal kale" id="example-text-input"/>
            </div>
            </div>
            <br/>
              <div className="form-group">
                <input type="text" 
                className="form-control 
                form-control-md" 
                placeholder="First Name" 
                name="firstName" 
                value={this.state.firstName}
                onChange={this.onChange.bind(this)}
                required 
                />
              </div>
              <div className="form-group">
                <input 
                type="text" 
                className="form-control form-control-md" 
                placeholder="Last Name" 
                name="lastName" 
                value={this.state.lastName}
                onChange={this.onChange.bind(this)}
                required 
                />
              </div>
              <div className="form-group">
                <input 
                type="text" 
                className="form-control form-control-md" 
                placeholder="Toyota Number" 
                name="employeeNumber"
                value={this.state.employeeNumber}
                onChange={this.onChange.bind(this)}
                 />
              </div>
              <div className="form-group">
                <input 
                type="email" 
                className="form-control 
                form-control-md" 
                placeholder="Email" 
                name="email" 
                value={this.state.email}
                onChange={this.onChange.bind(this)}
                />
              </div>
              <div className="form-group">
                <select className="form-control" name="department" value={this.state.department} onChange={this.onChange.bind(this)}>
                  <option>Product Planning & Pricing</option>
                  <option>Product Design</option>
                  <option>Regulations, Conversions & Accessories</option>
                  <option>Vehicle Evaluation</option>
                  <option>Connected Vehicle Services</option>
                  <option>Technical administration</option>
                </select>
              </div>
              <div className="form-group">
                <input 
                type="password" 
                className="form-control form-control-md" 
                placeholder="Password" 
                name="password" 
                value={this.state.password}
                onChange={this.onChange.bind(this)}
                />
              </div>
              <div className="form-group">
                <input 
                type="password" 
                className="form-control 
                form-control-md" 
                placeholder="Confirm Password" 
                name="password2"
                value={this.state.password2} 
                onChange={this.onChange.bind(this)}
                />
              </div>
              <br/>
              <div className="text-center"> 
            <input type="submit" className="btn btn-primary" />
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    )
  }
}

export default Register