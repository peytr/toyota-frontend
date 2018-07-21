import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader'
import axios from '../api/init'

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
        <h1>Manage your SOPs Here</h1>
        <Link to="/sops/create"><button className="btn btn-primary">CREATE</button></Link>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Department</th>
              <th>Author </th>
              <th>Lastest Version</th>
              <th>Date Created</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {sops}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ManageSop