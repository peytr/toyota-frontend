import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import instance from '../api/init'

class AdminViewUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    }
    // bind handle form change to this class
    this.handleChange = this.handleChange.bind(this);
    // bind handle submit 
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handle change function executed on form input change
  // sets the state to the current value of the input
  handleChange (event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
        [name]: value
    });
  }

  // handle submit executes on form submit
  // logs current value of inputs
  // prevents default form action
  handleSubmit (event) {
    console.log('Form value: ' + this.state.inputvalue);
    event.preventDefault();
    
    //TODO: need to understand how to pass this.state.inputvalue each corresponding key
    user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      employeeNumber: this.state.employeeNumber,
      email: this.state.email,
      department: this.state.department,
      password: this.state.password,
      password2: this.state.password2
    }

    // post input values to user
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
  
  render() {
    if(this.state.user) {
    return (
      
      <div>
        <h1>Admin View User</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label className="label">First Name</label>
          <div className="control">
              <input className="input" type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder={this.state.user.firstName}/>
          </div>
          <p></p>
          <label className="label">Last Name</label>
          <div className="control">
              <input className="input" type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder={this.state.user.lastName}/>
          </div>
          <p></p>
          <label className="label">Employee Number</label>
          <div className="control">
              <input className="input" type="text" name="employeeNumber" value={this.state.employeeNumber} onChange={this.handleChange} placeholder={this.state.user.employeeNumber}/>
          </div>
          <p></p>
          <label className="label">Email</label>
          <div className="control">
              <input className="input" type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder={this.state.user.email}/>
          </div>
          <p></p>
          <label className="label">Department</label>
          <div className="control">
              <input className="input" type="text" name="department" value={this.state.department} onChange={this.handleChange} placeholder={this.state.user.department}/>
          </div>
          <p></p>
          <div className="control">
            <label className="checkbox">
              <input
                name="active"
                type="checkbox"
                checked={this.state.active}
                onChange={this.handleChange}
              />
              Active
            </label>
          </div>
          <p></p>
          <div className="control">
            <label className="checkbox">
              <input
                name="admin"
                type="checkbox"
                checked={this.state.admin}
                onChange={this.handleChange}
              />
              Admin
            </label>
          </div>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
    } 
    return (
      <p>Loading user</p>
    )
  }
}

export default AdminViewUser