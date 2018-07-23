import React, { Component } from 'react'
import axios from '../api/init'
import Loader from '../layout/Loader'

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
  
  //TODO: Remove space between unread list items
  //TODO: Responsive styling for unread list items and mark as read buttons
  render() {
    const readSops = this.state.readSops.map((sop, i) => <li className="sop-read" key={i}> <img className="pdf-logo" src={ require('../../img/pdf.png') } />{sop.title}</li>)

    const unreadSops = this.state.unreadSops.map((sop, i) => 
      <li className="unread-list-item" key={i}>
          <a className="sop-unread-user" href={`${process.env.REACT_APP_BACKEND_URL}/sops/download/${sop.currentVersion.awsPath}`}>
          <img className="pdf-logo" src={ require('../../img/pdf.png') } />
          {sop.title}</a>
          <p className="button-mark-read" onClick={() => this.onReadSop(sop)}> Mark As Read </p>
      </li>)

    const outdatedSops = this.state.outdatedSops.map((sop, i) => <li className="sop-outdated" key={i}>  <img className="pdf-logo" src={ require('../../img/pdf.png') } /> {sop.title}  <button> Mark As Read </button> </li>)

    if (!this.state.loaded) { return(<Loader/>)}

    return (
      <div className="data-wrapper3">
        <div className="col-md-12 m-auto">
        <h3 className="head text-center">Your SOPs</h3>
        {unreadSops.length !== 0 ?
          <div>
            <h3 className="solid-heading">Unread</h3>
            <ul className="sop-list">
              {unreadSops}
            </ul> 
          </div> : null}
          {outdatedSops.length !== 0 ?
          <div>
            <h3 className="solid-heading">Outdated</h3>
            <ul className="sop-list">
              {outdatedSops}
            </ul>
          </div> : null}
          {readSops.length !== 0 ?
          <div>
            <h3 className="solid-heading">Read</h3>
            <ul className="sop-list">
              {readSops}
            </ul>
          </div> : null}
        </div>
      </div>
    )
  }
}

export default MySop