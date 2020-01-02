import React, { useEffect } from 'react'
import './App.css'
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import blogService from "./services/blogService"
import loginService from "./services/loginService"
import Blog from "./components/Blog"
import Users from "./components/Users"
import Blogs from "./components/Blogs"
import User from "./components/User"
import Navigation from "./components/Navigation"
import { useField } from './hooks'
import { connect } from "react-redux"
import { newErrorNotification, newSuccessNotification } from "./reducers/notificationReducer"
import { initBlogs, deleteBlog, updateBlog } from "./reducers/blogsReducer"
import { setUser, emptyUser } from "./reducers/userReducer"
import { BrowserRouter, Switch, Route } from "react-router-dom"

function App(props) {
    const username = useField("text")
    const password = useField("password")

    useEffect(() => {
        props.initBlogs()
    }, [])

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem("loggedBloglistappUser"))
        if (user){
            props.setUser(user)
            blogService.setToken(user.token)

        }
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const user = await loginService.login({ username: e.target.username.value, password: e.target.password.value })
            console.log("user", user)
            window.localStorage.setItem("loggedBloglistappUser", JSON.stringify(user))
            await props.setUser(user)
            blogService.setToken(user.token)

        } catch (exception){
            console.error(exception)
            props.newErrorNotification("wrong username or password")

        }
    }

    if (props.user === null) {
        return (
            <div className = "container">
                <Navigation></Navigation>
                <h2>Log into application</h2>
                <Notification/>
                <LoginForm username={username} password={password} handleLogin={handleLogin}/>
            </div>
        )
    }


    return (
        <div className="container">
            <BrowserRouter >

                <Navigation ></Navigation>
                <Switch>
                    <Route exact path="/" render={() => <Blogs ></Blogs>}/>
                    <Route exact path="/users" render = {() => <Users/>}/>
                    <Route exact path = "/users/:id" render={({ match }) => {
                        return <User id={match.params.id}></User>
                    }}></Route>
                    <Route exact path="/blogs/:id" render = {({ match }) => {
                        return <Blog id={match.params.id}/>
                    }}></Route>
                </Switch>
            </BrowserRouter>
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
