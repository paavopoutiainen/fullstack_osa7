import React from 'react'
import { connect } from "react-redux"
import { compose } from "redux"
import { setUser } from "../reducers/userReducer"
import { withRouter, Link } from "react-router-dom"




const User = (props) => {

    const logout = () => {
        window.localStorage.removeItem("loggedBloglistappUser")
        props.history.push("/")

        props.setUser(null)
    }

    const blogs = () => {
        return props.userWithBlogs.blogs.map((x, i) => <li key = {i}>{x.title}</li>)
    }

    if(props.userInStore === null) {
        props.history.push("/")
        return null
    }

    return (
        <div>
            <h1>Blogs</h1>
            <Link to="/">Blogs</Link>
            <Link to="/users">Users</Link>
            <p>{props.userInStore.name} logged in</p>
            <button onClick={logout}>Logout</button>
            <h1>{props.userWithBlogs.name}</h1>
            <h4>Added blogs</h4>
            <ul>
                {blogs()}
            </ul>
        </div>
    )
}

const findById = (id, users) => {
    return users.find(x => x.id === id)
}

const mapStateToProps = (state, ownProps) => {
    const user = findById(ownProps.id, state.users)

    return {
        blogs: state.blogs,
        users: state.users,
        userWithBlogs: user,
        userInStore: state.user
    }
}



export default compose(withRouter, connect(mapStateToProps, { setUser }))(User)