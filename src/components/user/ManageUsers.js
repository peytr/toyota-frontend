import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import instance from '../api/init'
import ListWrapper from './ListWrapper.js'
import ReactTable from 'react-table'

class ManageUsers extends Component {
  state = {users: [{}] } 
  componentDidMount() {
    instance.get('users/')
     .then((response) => {
       console.log(response);
       this.setState({
         users: response.data
        })
      //  console.log(this.state)
     })
    .catch((error)=>{
       console.log(error);
    })
  }

  render() {
    return (
      <div>
        <div className="solid-heading  d-flex justify-content-between">Manage Users <Link to="/register"><button className="btn btn-secondary">Create New User</button></Link></div>
        <ReactTable 
          data={this.state.users}
          columns={[
            {
              Header: "First Name",
              accessor: "firstName",
            },
            {
              Header: "Last Name",
              accessor: "lastName"
            },
            {
              Header: "Employee Number",
              accessor: "employeeNumber"
            },
            {
              Header: "Email",
              accessor: "email"
            },
            {
              Header: "Department",
              accessor: "department"
            },
            {
              id: "Admin",
              Header: "Admin",
              accessor: d => {
                return d.administrator ? "Yes" : "No"
              }
            },
            {
              id: "Active",
              Header: "Active",
              accessor: d => {
                return d.active ? "Yes" : "No"
              }
            },            
            {
              Header: "Edit",
              accessor: "_id",
              Cell: row => (
                <Link to={`/users/${row.value}`}>Edit</Link>
              )
            }
          ]}
          className="-striped -highlight"
          minRows={1}
          filterable={true}
        />
      </div>
    )
  }
}

export default ManageUsers