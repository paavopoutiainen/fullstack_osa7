import React from 'react'
import { Link } from "react-router-dom"
import { Nav } from "react-bootstrap"
import { connect } from "react-redux"



const SignedInLinks = (props) => {
    return (
        <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
                <Link to="/">Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
                <Link to="/users">Users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
                {props.user === null ? null : <em style ={{}}>{props.user.name} logged in</em> }
            </Nav.Link>
        </Nav>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(SignedInLinks)