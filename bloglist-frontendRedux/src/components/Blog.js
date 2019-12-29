import React, { useState } from 'react'

const Blog = ({ blog, modifyLikes, deleteBlog }) => {
    const [toShow, setToShow] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }


    const toggleToShow = () => {
        setToShow(!toShow)
    }



    const hide = { display: !toShow ? "" : "none" }
    const showAll = { display: toShow ? "" : "none" }

    const adderOftheBlog = JSON.parse(window.localStorage.getItem("loggedBloglistappUser")).username
    console.log("username", adderOftheBlog)

    return (
        <div style={blogStyle} className="blog">
            <div className="blogTitle" style = {hide} onClick= {toggleToShow}>
                <h4>{blog.title} </h4>
            </div>
            <div className = "blogInfo" style = {showAll}>
                <div  onClick= {toggleToShow}>
                    <h4 className = "titleAndAuthor">{blog.title} by {blog.author} </h4>
                    <p> {blog.author} <br/>
                        <a href={blog.url}>{blog.url}</a> <br/>
                        {blog.user !== null  ? `Added by ${blog.user.name}`: null}
                    </p>
                </div>
                <div>{blog.likes} likes <button onClick={() => modifyLikes(blog)}>like</button></div>
                {adderOftheBlog === blog.user.username ?<div><button onClick={() => deleteBlog(blog)}>DELETE</button></div>: null}
            </div>
        </div>
    )
}

export default Blog