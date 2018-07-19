import React from 'react'

const Header = () => {
    return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <img className="logo" src={ require('../../img/Toyota_logo.png') } />
      <h1 className="title">TOYOTA</h1>
    </nav> 
    )
}

export default Header