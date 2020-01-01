import React from 'react'
import { Link } from "react-router-dom"
import { Nav } from "react-bootstrap"



const SignedInLinks = () => {
    return (
        <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
                <Link to="/">Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
                <Link to="/users">Users</Link>
            </Nav.Link>
        </Nav>
    )
}

export default SignedInLinks