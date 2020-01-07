import React from "react"
import { connect } from "react-redux"
import { deleteBlog, updateBlog, initBlogs } from "../reducers/blogsReducer"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import { Button, Form, Col, ListGroup } from "react-bootstrap"
import blogService from "../services/blogService"

const Blog = props => {
    const blogStyle = {
        paddingLeft: 2,
        marginTop: 6,
        paddingTop: 10,
        //border: 'solid',
        //borderWidth: 1,
        marginBottom: 5
    }

    const currentUser = JSON.parse(
        window.localStorage.getItem("loggedBloglistappUser")
    ).username

    const handleLikeClick = async () => {
        try {
            await props.updateBlog(props.blog)
        } catch (exception) {
            console.error(exception)
        }
    }

    const handleDeleteClick = async () => {
        if (
            window.confirm(
                `Are you sure you want to remove blog ${props.blog.title} by ${props.blog.author}`
            )
        ) {
            try {
                props.history.push("/")
                await props.deleteBlog(props.blog)
            } catch (exception) {
                console.error(exception)
            }
        }
    }

    const onSubmit = async e => {
        e.preventDefault()
        const comment = e.target.comment.value
        e.target.comment.value = ""
        await blogService.createComment(comment, props.blog.id)
        props.initBlogs()
    }

    if (props.blog === undefined) {
        return null
    }

    return (
        <div style={blogStyle} className="blog">
            <div className="blogInfo">
                <div>
                    <h3 className="titleAndAuthor">
                        {props.blog.title} by {props.blog.author}{" "}
                    </h3>
                    <a href={props.blog.url}>{props.blog.url}</a> <br />
                    {props.blog.user ? `Added by ${props.blog.user.name}` : null}
                </div>
                <div>
                    {props.blog.likes} likes{" "}
                    <button onClick={() => handleLikeClick()}>like</button>
                </div>
                {currentUser === props.blog.user.username ? (
                    <div>
                        <button onClick={() => handleDeleteClick()}>DELETE</button>
                    </div>
                ) : null}
                <div className="comments" style={{ paddingTop: 10 }}>
                    <h4>Comments</h4>
                    <div className="commentForm">
                        <Form onSubmit={onSubmit}>
                            <Form.Row>
                                <Col>
                                    <Form.Control type="text" name="comment" />
                                </Col>
                                <Col>
                                    <Button variant="outline-primary" type="submit">
                                        add comment
                                    </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </div>
                    <div>
                        <ListGroup style={{ paddingTop: 5 }}>
                            {props.commentElements}
                        </ListGroup>
                    </div>
                </div>
            </div>
        </div>
    )
}

const findById = (id, blogs) => {
    return blogs.find(b => b.id === id)
}

const mapStateToProps = (state, ownProps) => {
    console.log("blogsit", state.blogs)
    const blog = findById(ownProps.id, state.blogs)
    const commentElements = blog.comments.map((c, index) => (
        <ListGroup.Item key={index}>{c.commentStr}</ListGroup.Item>
    ))
    console.log(blog)
    return {
        blog: blog,
        commentElements
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, { initBlogs, updateBlog, deleteBlog })
)(Blog)
