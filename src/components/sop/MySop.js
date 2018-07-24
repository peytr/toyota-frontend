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
  
  render() {
    const readSops = this.state.readSops.map((sop, i) => <div className="sop-read" key={i}> <img className="pdf-logo" src={ require('../../img/pdf2.png') } />{sop.title}</div>)

    const unreadSops = this.state.unreadSops.map((sop, i) => 
      <div className="unread-list-item" key={i}>
        <div className="sop-unread-user">
          <a href={`${process.env.REACT_APP_BACKEND_URL}/sops/download/${sop.currentVersion.awsPath}`}>
            <img className="pdf-logo" src={ require('../../img/pdf2.png') } />
            {sop.title}
          </a>
        </div>
        <div className="button-mark-read" onClick={() => this.onReadSop(sop)}> Mark As Read </div>
      </div>)


    const outdatedSops = this.state.outdatedSops.map((sop, i) => 
    <div className="unread-list-item" key={i}>
      <div className="sop-outdated-user">
        <a href={`${process.env.REACT_APP_BACKEND_URL}/sops/download/${sop.currentVersion.awsPath}`}>
          <img className="pdf-logo" src={ require('../../img/pdf2.png') } />
          {sop.title}
        </a>
      </div>
      <div className="button-mark-read-outdated" onClick={() => this.onReadSop(sop)}> Mark As Read </div>
    </div>)

    // const outdatedSops = this.state.outdatedSops.map((sop, i) => 
    //   <div className="sop-outdated" key={i}>  
    //     <img className="pdf-logo" src={ require('../../img/pdf2.png') } /> 
    //     {sop.title}  
    //     <button> Mark As Read </button> </div>)

    if (!this.state.loaded) { return(<Loader/>)}

    return (
      <div className="data-wrapper4">
        <h3 className="head text-center">Your SOPs</h3>
        <h3 className="solid-heading">Unread</h3>
        {unreadSops.length !== 0 ?
          <div className="sop-list">
            {unreadSops}
          </div>
          :
          <div className="read-success-message">
            <h5>You are all up to date.</h5>
          </div>
        }
        <h3 className="solid-heading">New Versions Available</h3>
        {outdatedSops.length !== 0 ?
          <div className="sop-list">
            {outdatedSops}
          </div>
          : 
          <div className="read-success-message">
            <h5>You are all up to date.</h5>
          </div>
        }

        <h3 className="solid-heading">Read</h3>
        {readSops.length !== 0 ?
          <div className="sop-list">
            {readSops}
          </div>
          : 
          <div className="read-success-message">
            <h5>No read SOP.</h5>
          </div>
        }
      </div>
    )
  }
}

export default MySop