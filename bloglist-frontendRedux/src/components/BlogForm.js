import React from 'react'
import PropTypes from "prop-types"
import {  Form, Button } from 'react-bootstrap'



const BlogForm = ({ createNewBlog }) => {

    function createNew (e) {
        createNewBlog(e, { title: e.target.title.value,
            author: e.target.author.value,
            url: e.target.url.value
        })
        Array.from(e.target.querySelectorAll('[name]')).map(n => n.value = "")
    }

    return (
        <div>
            <Form onSubmit={createNew}>
                <Form.Group>
                    <Form.Label>title:</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                    />
                    <Form.Label>author:</Form.Label>
                    <Form.Control
                        type="text"
                        name="author"
                    />
                    <Form.Label>URL:</Form.Label>
                    <Form.Control
                        type="text"
                        name="url"
                    />
                    <Button variant="outline-primary" type="submit">
                        Create
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

BlogForm.propTypes = {
    createNewBlog: PropTypes.func.isRequired
}

export default BlogForm