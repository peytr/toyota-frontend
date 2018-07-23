import React, { Component } from 'react'
import axios from '../api/init'
import Loader from '../layout/Loader'

// import { Link } from 'react-router-dom'

class MySop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      readSops: [],
      unreadSops: [],
      outdatedSops: []
    }
  }

  componentDidMount() {
    axios.get(`/sops/mysop`)
      .then((response) => {
        this.setState({
          loaded: true,
          readSops: response.data.readSops,
          unreadSops: response.data.unreadSops,
          outdatedSops: response.data.outdatedSops
        })
      })
    .catch((error)=>{
        console.log(error);
    })
  }

  onReadSop(sop) {
    const sopId = sop._id
    axios.patch(`/sops/markasread/${sopId}`)
    .then(res => {
      if (res.data.success) {
        this.setState((prevState) => {
          const readSops = prevState.readSops.concat(sop)
          const unreadSops  = prevState.unreadSops.filter( x => x._id !== sopId)
          const outdatedSops = prevState.outdatedSops.filter( x => x._id !== sopId)
          return {
            readSops,
            unreadSops,
            outdatedSops
          }
        })
      }})
    .catch()
  }
  
  render() {
    const readSops = this.state.readSops.map((sop, i) => <li key={i}>{sop.title}</li>)
    const unreadSops = this.state.unreadSops.map((sop, i)=> <li key={i}>{sop.title}  <button onClick={() => this.onReadSop(sop)}> Mark As Read </button> </li>)
    const outdatedSops = this.state.outdatedSops.map((sop, i) => <li key={i}>{sop.title}  <button> Mark As Read </button> </li>)

    if (!this.state.loaded) { return(<Loader/>)}

    return (
      <div>
        <h1>Your SOPs</h1>
          <h3>Unread</h3>
            <ul>
              {unreadSops}
            </ul>
          <h3>Outdated</h3>
            <ul>
              {outdatedSops}
            </ul>
          <h3>Read</h3>
            <ul>
              {readSops}
            </ul>
      </div>
    )
  }
}

export default MySop