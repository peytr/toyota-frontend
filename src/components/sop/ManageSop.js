import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader'
import axios from '../api/init'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class ManageSop extends Component {
  state = {
    sops: [],
    loaded: false,
  }

  componentDidMount() {
    axios.get('/sops')
      .then((response) => {
        console.log(response);
        this.setState({
          sops: response.data,
          loaded: true
        })
      })
    .catch((error)=>{
        console.log(error);
    })
  }
    

  render() {
    if (!this.state.loaded) { return(<Loader/>)}
    const sops = this.state.sops.map( (sop, i) => (
      <tr key={i}>
      <td>
        <a href={`${process.env.REACT_APP_BACKEND_URL}/sops/download/${sop.currentVersion.awsPath}`}>
        {sop.title}
        </a>
      </td>
      <td>{sop.department}</td>
      <td>{sop.currentVersion.author}</td>
      <td>{sop.currentVersion.version}</td>
      <td>{sop.currentVersion.createdAt}</td>
      <td>
      <Link to={`/sops/${sop._id}`}>
        Edit
      </Link>
      </td>
    </tr>
    ))
    
    return (
      <div>
        <div className="solid-heading d-flex justify-content-between">Manage SOPs <Link to="/sops/create"><button className="btn btn-secondary">Create New SOP</button></Link></div>
        
        <ReactTable 
          data={this.state.sops}
          columns={[
            {
              Header: "Title",
              accessor: "title"
            },
            {
              Header: "Department",
              accessor: "department"
            },
            {
              Header: "Latest Version",
              accessor: "currentVersion.version"
            },
            {
              Header: "Created At",
              accessor: "currentVersion.createdAt"
            },
            {
              Header: "Edit",
              accessor: "_id",
              Cell: row => (
                <Link to={`/sops/${row.value}`}>Edit</Link>
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

export default ManageSop