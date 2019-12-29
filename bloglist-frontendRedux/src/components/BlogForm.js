import React from 'react'
import PropTypes from "prop-types"
import  { useField } from '../hooks'
import { propsForInputField } from "../utils/helperFunctions"


const BlogForm = ({ createNewBlog }) => {

    const title = useField("text")
    const author = useField("text")
    const url = useField("text")

    function createNew (e) {
        createNewBlog(e, { title: title.value, author: author.value, url: url.value })
        title.reset()
        author.reset()
        url.reset()
    }

    return (
        <div>

            <form>
                <h1>create new</h1>
                <div>
                    <label>title: </label>
                    <input {...propsForInputField(title)}></input>
                </div>
                <div>
                    <label>author: </label>
                    <input {...propsForInputField(author)}></input>
                </div>
                <div>
                    <label>URL: </label>
                    <input {...propsForInputField(url)}></input>
                </div>
                <button onClick={(e) => createNew(e)}>Create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createNewBlog: PropTypes.func.isRequired
}

export default BlogForm