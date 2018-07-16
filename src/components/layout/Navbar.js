import React, { Component } from 'react'
// import Toyota_logo from '../img/Toyota_logo.png'

class Navbar extends Component {
  render() {
    return (
      <div>
       <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div className="container">
      <a className="navbar-brand" href="landing.html"></a>
      <img className="logo" src={ require('../../img/Toyota_logo.png') } />
      <h1 className="title">TOYOTA</h1>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="profiles.html"> 
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="register.html">Manage SOP</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="register.html">Manage Users</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="register.html">My SOP</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="login.html">Log out</a>
          </li>
        </ul>
      </div>
    </div>
  </nav> 
      </div>
    )
  }
}

export default Navbar