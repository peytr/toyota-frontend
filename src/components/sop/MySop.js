import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

const MySop = (props) => {
  return (
    <div>
      <h1>Your SOPs</h1>
      <p>{props.match.path}</p>
    </div>
  )
}

export default MySop