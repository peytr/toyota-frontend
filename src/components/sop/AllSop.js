import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader'
import axios from '../api/init'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import moment from 'moment'
const pdfLogo = require('../../img/pdf.png')

class AllSop extends Component {
  state = {
    sops: [],
    loaded: false,
  }

  componentDidMount() {
    axios.get('/sops')
      .then((response) => {
        this.setState({
          sops: response.data,
          loaded: true
        })
      })
    .catch((error)=>{
        console.log(error);
    })
  }

  onReadSop() {
    console.log("hi")
  }
    

  render() {
    if (!this.state.loaded) { return(<Loader/>)}
    return (
      <div>
        <div className="solid-heading d-flex justify-content-between">All SOPs <Link to="/sops/create"><button className="btn btn-secondary">Create New SOP</button></Link></div>        
        <ReactTable 
          data={this.state.sops}
          columns={[
            {
              Header: "Title",
              accessor: "title",
              Cell: (data) => (
                <a href={`${process.env.REACT_APP_BACKEND_URL}/sops/download/${data.original.currentVersion.awsPath}`}><span><img src={pdfLogo} /> {data.value} </span></a>
              )
            },
            {
              Header: "Latest Version",
              accessor: "version"
            },
            {
              Header: "Department",
              accessor: "department"
            },
            {
              Header: "Author",
              accessor: "author"
            },
            {
              id: "createdAt",
              Header: "Created",
              accessor: d => {
                return moment(d.currentVersion.createdAt).format('DD MMM YYYY')
              }
            },
            {
              Header: "Read",
              accessor: "read",
              Cell: data => (
                <span>{ data.value ? "Read" : "Not Read"}</span>
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

export default AllSop