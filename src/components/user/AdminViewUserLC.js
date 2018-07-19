import React, { Component } from 'react'
import axios from '../api/init'
import instance from '../api/init'

class AdminViewUserLC extends Component {
  constructor() {
    super()
    this.state = {
      user: null
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  
  onSubmit(e) {
    e.preventDefault()
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      employeeNumber: this.state.employeeNumber,
      email: this.state.email,
      department: this.state.department,
      password: this.state.password,
      password2: this.state.password2
    }
    console.log(user)
    axios.post("/users/5b4c221a7c75af5f989a3e35", user) 
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(err => console.error(err))
  }

componentDidMount() {
  instance.get('/users/5b4c221a7c75af5f989a3e35')
   .then((response) => {
     console.log(response);
     this.setState({user: response.data});
   })
  .catch((error)=>{
     console.log(error);
  })
}  

//TODO: work out how to have selected user department show as default in dropdown so admin does not have to select everytime on user edit
  render() {
    if(this.state.user) {
    return (
      <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
          <br/>
            <p className="lead text-center">Update User</p>
           
            <form onSubmit={this.onSubmit.bind(this)}>
           
            <br/>
              <div className="form-group">
                <input type="text" 
                className="form-control 
                form-control-md" 
                placeholder={this.state.user.firstName}
                name="firstName" 
                value={this.state.firstName}
                onChange={this.onChange.bind(this)}
                />
              </div>
              <div className="form-group">
                <input 
                type="text" 
                className="form-control form-control-md" 
                placeholder={this.state.user.lastName}
                name="lastName" 
                value={this.state.lastName}
                onChange={this.onChange.bind(this)} 
                />
              </div>
              <div className="form-group">
                <input 
                type="text" 
                className="form-control form-control-md" 
                placeholder={this.state.user.employeeNumber} 
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
                placeholder={this.state.user.email}
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
  return (
    <p>Loading user</p>
  )
  }
}

export default AdminViewUserLC