import React from "react"
import { Navbar, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { setUser } from "../reducers/userReducer"
import SignedInLinks from "./SignedInLinks"




const Navigation = (props) => {

    const logout = () => {
        window.localStorage.removeItem("loggedBloglistappUser")
        props.setUser(null)
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#">BlogsApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {props.user === null ? null : <SignedInLinks />}
                    {props.user === null ? null : <Button variant="outline-danger" onClick={logout}>Logout</Button>}

                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user
    }
}

export default connect(mapStateToProps, { setUser })(Navigation)