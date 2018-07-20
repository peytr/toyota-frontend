import React, { Component } from 'react'
import instance from '../api/init'

class AdminViewUser extends Component {
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
      administrator: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({[event.target.name]: event.target.value})

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);

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
    instance.patch("/users/5b4c221a7c75af5f989a3e35", user) 
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.error(err))
  }

  componentDidMount() {
    instance.get('/users/5b4c221a7c75af5f989a3e35')
     .then((response) => {
       console.log(response);
       this.setState({
        user: true,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        employeeNumber: response.data.employeeNumber,
        email: response.data.email,
        department: response.data.department,
        active: response.data.active,
        administrator: response.data.administrator,
        
       });
     })
    .catch((error) => {
       console.log(error);
    })
  }

  render() {
    if(this.state.user) {
      return (
        <div>
          <div className="data-wrapper">
            <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <br/>
                  <p className="lead text-center">Update User</p>
                  <form className='form' onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                      <label className='label'>First Name</label>
                      <div className='control'>
                        <input
                          className='form-control form-control-md'
                          type='text'
                          name='firstName'
                          value={this.state.firstName}
                          onChange={this.handleChange}
                          // placeholder={this.state.user.firstName}
                          />
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
                          onChange={this.handleChange}
                          // placeholder={this.state.user.lastName}
                          />
                      </div>
                    </div>

                    <div className='form-group'>
                      <label className='label'>Employee Number</label>
                      <div className='control'>
                        <input
                          className='form-control form-control-md'
                          type='text'
                          name='lastName'
                          value={this.state.employeeNumber}
                          onChange={this.handleChange}
                          // placeholder={this.state.user.employeeNumber}
                          />
                      </div>
                    </div>

                    <div className='form-group'>
                      <label className='label'>Email</label>
                      <div className='control'>
                        <input
                          className='form-control form-control-md'
                          type='text'
                          name='lastName'
                          value={this.state.email}
                          onChange={this.handleChange}
                          // placeholder={this.state.user.email}
                          />
                      </div>
                    </div>

                    <div className='form-group'>
                      <label className='label'>Department</label>
                      <div className='control'>
                        <input
                          className='form-control form-control-md'
                          type='text'
                          name='lastName'
                          value={this.state.department}
                          onChange={this.handleChange}
                          // placeholder={this.state.user.department}
                          />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="checkbox">
                        <input
                          className='form-control form-control-md'
                          name="active"
                          type="checkbox"
                          checked={this.state.active}
                          onChange={this.handleChange}
                        />
                        Active
                      </label>
                    </div>
                    <p></p>
                    <div className="form-group">
                      <label className="checkbox">
                        <input
                          className='form-control form-control-md'
                          name="administrator"
                          type="checkbox"
                          checked={this.state.administrator}
                          onChange={this.handleChange}
                        />
                        Admin
                      </label>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input
                          type="submit"
                          value="Edit User"
                          className="btn btn-primary"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
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

export default AdminViewUser