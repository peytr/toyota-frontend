import React, { Component, Fragment } from 'react'
import ListItems from './ListItems.js'

const ListWrapper = (props) => {

    return (
        <Fragment>
            <br/>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Employee #</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Admin</th>
                        <th>Active</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    <ListItems {...props}/>
                </tbody>
            </table>
        </Fragment>

    )
}

export default ListWrapper