import React, { useEffect } from 'react'
import { connect } from "react-redux"
import { compose } from "redux"
import { getUsers } from "../reducers/usersReducer"
import { withRouter, Link } from "react-router-dom"
import { setUser } from "../reducers/userReducer"



const Users = (props) => {

    useEffect(() => {
        props.getUsers()
    }, [])




    const users = () => {
        const users =  props.users.map((x, i) => {
            console.log(x)
            return <tr key = {i}>
                <td><Link to={`/users/${x.id}`}>{x.name}</Link></td>
                <td style={{textAlign: "center"}}>{x.blogs.length}</td>
            </tr>

        })
        return users
    }

    const logout = () => {
        window.localStorage.removeItem("loggedBloglistappUser")
        props.setUser(null)
        props.history.push("/")
    }

    if(props.user === null){
        return null
    }
    return (
        <div>
            <h1>Users</h1>
            <p>{props.user.name} logged in</p>
            <button onClick={logout}>Logout</button>
            <table>
                <thead>
                    <tr>
                        <th>user</th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users()}
                </tbody>
                
                
            </table>
            
            
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