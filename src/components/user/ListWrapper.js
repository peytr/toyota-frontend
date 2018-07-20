import React, { Component, Fragment } from 'react'
import ListItems from './ListItems.js'

const ListWrapper = (props) => {

    return (
        <Fragment>
            <table>
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Employee #</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Administrator</th>
                        <th>Active</th>
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