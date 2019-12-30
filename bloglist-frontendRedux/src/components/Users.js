import React from 'react'
import { connect } from "react-redux"
import { getUsers } from "../reducers/usersReducer"

const Users = (props) => {
    return (
        <div>
            <h1>Blogs</h1>
            <p>{props.user.name} logged in</p>
            <button onClick={props.logout}>Logout</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        user: state.user
    }
}

export default connect(mapStateToProps, { getUsers })(Users)