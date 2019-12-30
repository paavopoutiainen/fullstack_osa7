import React, { useEffect } from 'react'
import './App.css'
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import blogService from "./services/blogService"
import loginService from "./services/loginService"
import BlogForm from "./components/BlogForm"
import Blog from "./components/Blog"
import Users from "./components/Users"
import Blogs from "./components/Blogs"
import { useField } from './hooks'
import { connect } from "react-redux"
import { newErrorNotification, newSuccessNotification } from "./reducers/notificationReducer"
import { initBlogs, deleteBlog, updateBlog } from "./reducers/blogsReducer"
import { setUser, emptyUser } from "./reducers/userReducer"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"




function App(props) {
    const username = useField("text")
    const password = useField("password")

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

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const user = await loginService.login({ username: username.value, password: password.value })
            console.log("user", user)
            window.localStorage.setItem("loggedBloglistappUser", JSON.stringify(user))
            props.setUser(user)
            username.reset()
            password.reset()
            blogService.setToken(user.token)

        } catch (exception){
            console.error(exception)
            props.newErrorNotification("wrong username or password")

        }
    }

    const createNewBlog = async (e, blog) => {
        e.preventDefault()
        try {
            blogService.setToken(props.user.token)
            blogFormRef.current.toggleVisibility()
            await blogService.create(blog)
            props.initBlogs()

            props.newSuccessNotification(`a new blog ${blog.title} by ${blog.author} added`)

        } catch(exception){
            console.error("here", exception)
            props.newErrorNotification("Was unable to save the blog")
        }

    }

    const modifyLikes = async (blog) => {

        try {
            await props.updateBlog(blog)

            console.log("hurya")
        }catch(exception){
            console.error(exception)
        }
    }
    const deleteBlog = async (blog) => {
        if(window.confirm(`Are you sure you want to remove blog ${blog.title} by ${blog.author}`)){
            try {
                await props.deleteBlog(blog)
            } catch (exception) {
                console.error(exception)
            }
        }
    }

    const logout = () => {

        window.localStorage.removeItem("loggedBloglistappUser")
        props.setUser(null)
    }

    if (props.user === null) {
        return (
            <div>
                <h2>Log into application</h2>
                <Notification/>
                <LoginForm username={username} password={password} handleLogin={handleLogin}/>
            </div>
        )
    }
    const rows = () => {
        const blogs = props.blogs.map((blog, i) => <Link key = {i} to={`/blogs/${blog.id}`}><h4>{blog.title} </h4></Link>)
        return blogs
    }

    return (
        <div>
            <h1>Blogs</h1>
            <Link to="/users">Users</Link>
            <p>{props.user.name} logged in</p>
            <button onClick={logout}>Logout</button>
            <Notification />
            <p>hellllooooou</p>
            <Togglable buttonLabel="New blog" ref={blogFormRef}>
                /////////////////////
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

export default connect(mapStateToProps, { setUser, emptyUser, initBlogs, deleteBlog, updateBlog, newErrorNotification, newSuccessNotification })(App)
