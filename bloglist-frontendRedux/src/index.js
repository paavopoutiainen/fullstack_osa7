import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from "react-redux"
import store from "./store"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import Users from "./components/Users"
import User from "./components/User"
import Blog from "./components/Blog"




ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
        <Switch>
            <Route exact path="/" render={() => <App></App>}/>
            <Route exact path="/users" render = {() => <Users/>}/>
            <Route exact path = "/users/:id" render={({ match }) => {
                return <User id={match.params.id}></User>
            }}></Route>
            <Route exact path="/blogs/:id" render = {({ match }) => {
                return <Blog id={match.params.id}/>
            }}></Route>
        </Switch>
    </BrowserRouter>

</Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
