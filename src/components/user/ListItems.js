import React, { Component, Fragment } from 'react'
import ListWrapper from './ListWrapper.js'
import { Link } from 'react-router-dom'

class ListItems extends Component {

    makeUserObjectsIntoListHtml(arrayOfUsers){
        console.log(arrayOfUsers)
        const arrayOfListObjects = arrayOfUsers.map((user, index) => {
            return (
                <tr>
                    {/* <td>{user._id}</td> */}
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.employeeNumber}</td>
                    <td>{user.email}</td>
                    <td>{user.department}</td>
                    <td>{user.administrator}</td>
                    <td>{user.active}</td>
                    <td>
                      <Link to={`/users/${user._id}`}>
                        <button type="button">
                           View User
                        </button>
                      </Link>
                    </td>
                </tr>
            )
        })
        return arrayOfListObjects
    }

    render(){
        const listElements = this.makeUserObjectsIntoListHtml(this.props.users)
        console.log(listElements)

        console.log("LISTITEMS")
        console.log(this.props)
        return (
            <Fragment>
                {listElements}
            </Fragment>
        )
    }
}
export default ListItems