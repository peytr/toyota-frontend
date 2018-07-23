import React, { Component } from 'react'
import Loader from '../layout/Loader'
import instance from '../api/init'

class ViewUser extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: false,
      firstName: null,
      lastName: null,
      employeeNumber: null,
      email: null,
      department: null,
      active: true,
      administrator: false,
      loaded: false,
      readSops: [],
      unreadSops: [],
      outdatedSops: []
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({[e.target.name]: e.target.value})

    this.setState({
      [name]: value
    });
  }

  validate = () => {
    let isError = false
    const errors = {
      firstNameError: "",
      lastNameError: "",
      employeeNumberError: "",
      emailError: "",
      departmentError: "",
      passwordError: "",
      password2Error: ""
    }
    if (this.state.firstName.length < 3 || this.state.firstName.length > 30) {
      isError = true
      errors.firstNameError = 'First name must be between 2 and 30 characters'
    }

    if (this.state.lastName.length < 3 || this.state.lastName.length > 30) {
      isError = true
      errors.lastNameError = 'Last name must be between 2 and 30 characters'
    }

    if (this.state.employeeNumber.length !== 6) {
      isError = true
      errors.employeeNumberError = 'Please enter a valid employee number'
    }

    if (this.state.email.length < 2 || this.state.email.indexOf("@") === -1 || this.state.email.indexOf(".com.au") === -1) {
      isError = true
      errors.emailError = 'Please enter a valid email address'
    }

    if (isError) {
      this.setState(errors)
    }
    return isError
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);

    const err = this.validate()
    if (!err) {

      // clear form
      this.setState({
        firstName: this.state.firstName,
        firstNameError: "",
        lastName: this.state.lastName,
        lastNameError: "",
        employeeNumber: this.state.employeeNumber,
        employeeNumberError: "",
        email: this.state.email,
        emailError: "",
        department: this.state.department
      })

    // on submit form data to update user in database
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      employeeNumber: this.state.employeeNumber,
      email: this.state.email  || this.state.user.email,
      department: this.state.department,
      active: this.state.active,
      administrator: this.state.administrator
    }
    console.log(user)
    instance.patch(`/users/${this.props.match.params.id}`, user) 
    .then(res => {
      console.log(res.data);
      alert('User successfully updated')
      this.props.history.go(-1)
    })
    .catch(err => console.error(err))
  }
}

  componentDidMount() {
    instance.get(`/users/${this.props.match.params.id}`)
     .then((response) => {
       console.log(response);
       this.setState({
        user: true,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        employeeNumber: response.data.user.employeeNumber,
        email: response.data.user.email,
        department: response.data.user.department,
        active: response.data.user.active,
        administrator: response.data.user.administrator,
        loaded: true,
        readSops: response.data.summarySop.readSops,
        unreadSops: response.data.summarySop.unreadSops,
        outdatedSops: response.data.summarySop.outdatedSops
       });
     })
    .catch((error) => {
       console.log(error);
    })
  }

  render() {
    const readSops = this.state.readSops.map((sop, i) => <li key={i}>{sop.title}</li>)
    const unreadSops = this.state.unreadSops.map((sop, i)=> <li key={i}>{sop.title}  <button onClick={() => this.onReadSop(sop)}> Mark As Read </button> </li>)
    const outdatedSops = this.state.outdatedSops.map((sop, i) => <li key={i}>{sop.title}  <button> Mark As Read </button> </li>)

    if(this.state.user) {
      return (
        <div>
          <div className="">
            <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <div className="profile-heading">
                    <h3 className="profile-title">View / Update User</h3>
                  </div>
                  <br/>
                  <form className='form' onSubmit={this.onSubmit}>
                    <div className='form-group'>
                      <label className='label'>First Name</label>
                      <div className='control'>
                        <input
                          className='form-control form-control-md'
                          type='text'
                          name='firstName'
                          value={this.state.firstName}
                          onChange={this.onChange}
                          />
                      <div className="form-alert">{this.state.firstNameError}</div>
                      </div>
                    </div>

                    <div className='form-group'>
                      <label className='label'>Last Name</label>
                      <div className='control'>
                        <input
                          className='form-control form-control-md'
                          type='text'
                          name='lastName'
                          value={this.state.lastName}
                          onChange={this.onChange}
                          />
                          <div className="form-alert">{this.state.lastNameError}</div>
                      </div>
                    </div>

                    <div className='form-group'>
                      <label className='label'>Employee Number</label>
                      <div className='control'>
                        <input
                          className='form-control form-control-md'
                          type='text'
                          name='employeeNumber'
                          value={this.state.employeeNumber}
                          onChange={this.onChange}
                          />
                          <div className="form-alert">{this.state.employeeNumberError}</div>
                      </div>
                    </div>

                    <div className='form-group'>
                      <label className='label'>Email</label>
                      <div className='control'>
                        <input
                          className='form-control form-control-md'
                          type='text'
                          name='email'
                          value={this.state.email}
                          onChange={this.onChange}
                          />
                          <div className="form-alert">{this.state.emailError}</div>
                      </div>
                    </div>

                     <div className="form-group">
                      <label className='label'>Department</label>
                      <select 
                      className="form-control" 
                      name="department" value={this.state.department} 
                      onChange={this.onChange.bind(this)}>
                        <option>Product Planning & Pricing</option>
                        <option>Product Design</option>
                        <option>Regulations, Conversions & Accessories</option>
                        <option>Vehicle Evaluation</option>
                        <option>Connected Vehicle Services</option>
                        <option>Technical administration</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          className='checkbox'
                          name="active"
                          type="checkbox"
                          checked={this.state.active}
                          onChange={this.onChange}
                        />
                        Active
                      </label>
                    </div>
                    <p></p>
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          className='checkbox'
                          name="administrator"
                          type="checkbox"
                          checked={this.state.administrator}
                          onChange={this.onChange}
                        />
                        Administrator
                      </label>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input
                          type="submit"
                          value="Update User"
                          className="btn btn-secondary"
                        />
                      </div>
                    </div>
                  </form>

                  <br />
                  
                  <div>
                    <div className="profile-heading">
                      <h3 className="profile-title">Unread SOP</h3>
                    </div>
                      <ul>
                        {unreadSops}
                      </ul>
                    <div className="profile-heading">
                      <h3 className="profile-title">Outdated SOP</h3>
                    </div>
                      <ul>
                        {outdatedSops}
                      </ul>
                    <div className="profile-heading">
                      <h3 className="profile-title">Read SOP</h3>
                    </div>
                      <ul>
                        {readSops}
                      </ul>
                  </div>

                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <Loader/>
    )
  }
}

export default ViewUser