import React, { useEffect } from 'react'
import { connect } from "react-redux"
import { compose } from "redux"
import { getUsers } from "../reducers/usersReducer"
import { withRouter, Link } from "react-router-dom"
import { setUser } from "../reducers/userReducer"
import { Table } from 'react-bootstrap'




const Users = (props) => {

    useEffect(() => {
        props.getUsers()
    }, [])

    const users = () => {
        const users =  props.users.map((x, i) => {
            console.log(x)
            return <tr key = {i}>
                <td><Link to={`/users/${x.id}`}>{x.name}</Link></td>
                <td >{x.blogs.length}</td>
            </tr>

        })
        return users
    }

    if(props.user === null){
        return null
    }
    return (
        <div>
            <h1>Users</h1>
            <Table striped>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users()}
                </tbody>
            </Table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        user: state.user
    }
}

export default compose(withRouter, connect(mapStateToProps, { getUsers, setUser }))(Users)