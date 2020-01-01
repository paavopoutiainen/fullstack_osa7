import React, { useEffect } from 'react'
import '../App.css'
import Notification from "./Notification"
import Togglable from "./Togglable"
import blogService from "../services/blogService"
import BlogForm from "./BlogForm"
import { connect } from "react-redux"
import { newErrorNotification, newSuccessNotification } from "../reducers/notificationReducer"
import { initBlogs, deleteBlog, updateBlog } from "../reducers/blogsReducer"
import { setUser, emptyUser } from "../reducers/userReducer"
import { Link } from "react-router-dom"
import { compose } from "redux"
import { withRouter } from "react-router-dom"






function Blogs(props) {

    const blogFormRef = React.createRef()

    useEffect(() => {
        props.initBlogs()
    }, [])

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem("loggedBloglistappUser"))
        if (user){
            props.setUser(user)
        }
    }, [])

    const createNewBlog = async (e, blog) => {
        e.preventDefault()
        try {
            await blogService.create(blog)
            props.initBlogs()
            blogFormRef.current.toggleVisibility()

            props.newSuccessNotification(`a new blog ${blog.title} by ${blog.author} added`)

        } catch(exception){
            console.error("here", exception)
            props.newErrorNotification("Was unable to save the blog")
        }

    }


    const rows = () => {
        const blogs = props.blogs.map((blog, i) => <Link key = {i} to={`/blogs/${blog.id}`}><h4>{blog.title} </h4></Link>)
        return blogs
    }

    return (
        <div style={{ paddingTop: 10 }}>
            <Notification />
            <Togglable buttonLabel="New blog" ref={blogFormRef}>
                <BlogForm
                    createNewBlog= {createNewBlog}
                />
            </Togglable>
            {rows()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user
    }
}

export default compose(withRouter, connect(mapStateToProps, { 
    setUser,
    emptyUser,
    initBlogs,
    deleteBlog,
    updateBlog,
    newErrorNotification,
    newSuccessNotification }))(Blogs)
