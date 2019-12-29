import axios from "axios"
const baseUrl = "http://localhost:3003/api/blogs"

let token = null

const getAll = async () => {
    const response = await axios.get(baseUrl)
    console.log(response)
    return response.data
}

const setToken = (newToken) => {
    token = `bearer ${newToken}`
    console.log(token)
}

const create = async (newBlog) => {
    console.log("yyyy",token)
    const config= {
        headers: { authorization: token }
    }

    const response = await axios.post(baseUrl, newBlog, config)
    return response
}

const update = async (newBlog) => {

    const response = await axios.put(`${baseUrl}/${newBlog.id}`, { ...newBlog, likes: newBlog.likes + 1 })
    return response
}

const deleteBlog = async (blog) => {
    const config= {
        headers: { authorization: token }
    }
    try{
        const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
        return response
    } catch(exception){
        console.error(exception)
    }


}



export default { getAll: getAll, create: create, setToken, update, deleteBlog }