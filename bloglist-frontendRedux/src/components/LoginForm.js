import React from "react"
import { Form, Button } from "react-bootstrap"

const LoginForm = ({ handleLogin }) => {
    return (
        <div >
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>username:</Form.Label>
                    <Form.Control
                        id="username"
                        type="text"
                        name="username"
                    />
                    <Form.Label>password:</Form.Label>
                    <Form.Control
                        id="password"
                        type="password"
                        name="password"
                    />
                    <Button variant="outline-primary" type="submit">
                        login
                    </Button>
                </Form.Group>
            </Form>
            <p>testdude2</p>
            <p>s77#eJret</p>
        </div>
    )
}

export default LoginForm