import React, { useState } from 'react'
import { withRouter, Link } from "react-router-dom"
import { connect } from "react-redux"
import { initBlogs, deleteBlog, updateBlog } from "../reducers/blogsReducer"




const Blog = (props) => {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const adderOftheBlog = JSON.parse(window.localStorage.getItem("loggedBloglistappUser")).username
    console.log("username", adderOftheBlog)

    const handleLikeClick = async () => {
        try {
            await props.updateBlog(props.blog)

            console.log("hurya")
        }catch(exception){
            console.error(exception)
        }
    }

    const handleDeleteClick = async () => {
        if(window.confirm(`Are you sure you want to remove blog ${props.blog.title} by ${props.blog.author}`)){
            try {
                await props.deleteBlog(props.blog)
            } catch (exception) {
                console.error(exception)
            }
        }
    }

    return (
        <div style={blogStyle} className="blog">
            
            <div className = "blogInfo" >
                <div >
                    <h4 className = "titleAndAuthor">{props.blog.title} by {props.blog.author} </h4>
                    <p> {props.blog.author} <br/>
                        <a href={props.blog.url}>{props.blog.url}</a> <br/>
                        {props.blog.user !== null  ? `Added by ${props.blog.user.name}`: null}
                    </p>
                </div>
                <div>{props.blog.likes} likes <button onClick={() => handleLikeClick()}>like</button></div>
                {adderOftheBlog === props.blog.user.username ?<div><button onClick={() => handleDeleteClick()}>DELETE</button></div>: null}
            </div>
        </div>
    )
}

const findById = (id, blogs) => {
    return blogs.find(b => b.id === id)
}

const mapStateToProps = (state, ownProps) => {
    const blog = findById(ownProps.id, state.blogs)

    return {
        blog: blog
    }
}

export default connect(mapStateToProps,{ updateBlog, deleteBlog })(Blog)