import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { setUser } from "../reducers/userReducer"
import { withRouter } from "react-router-dom"




const User = (props) => {

    const blogs = () => {
        return props.userWithBlogs.blogs.map((x, i) => <li key={i}>{x.title}</li>)
    }

    if (props.userInStore === undefined || props.userWithBlogs === undefined) {
        return null
    }

    return (
        <div>
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
        //in this one we only have token, username and name not the blogs
        userInStore: state.user,
        //so we need to get the blogs from the state in the store which holds all the users data
        userWithBlogs: user
    }
}



export default compose(withRouter, connect(mapStateToProps, { setUser }))(User)