import blogService from "../services/blogService"


const blogsReducer = (state = [], action) => {
    switch(action.type) {
    case "INIT_BLOGS":
        return action.data.sort((a, b) => b.likes - a.likes)
    case "DELETE_BLOG":
        return state.filter(x => x.id !== action.data.id)
    case "UPDATE_BLOG":
        return state.map(x => {
            if(x.id === action.data.id){
                console.log("xid", x.id)
                console.log("actionid", action.data.id)

                return { ...x, likes: x.likes + 1 }
            } else {
                return x
            }
        })
    default: return state
    }
}

export const initBlogs = () => {
    return async dispatch => {
        try {
            const blogsFromDb = await blogService.getAll()
            console.log(blogsFromDb)
            dispatch({
                type: "INIT_BLOGS",
                data: blogsFromDb
            })
        } catch (exception){
            console.error(exception)
        }
    }
}

export const deleteBlog = (blog) => {
    return async (dispatch) => {
        try {
            await blogService.deleteBlog(blog)
            console.log("hiaaar", blog)
            dispatch({
                type: "DELETE_BLOG",
                data: blog
            })
            console.log("heeeei")
        }catch(exception) {
            console.error(exception)
        }
    }
}

export const updateBlog = (blog) => {
    return async (dispatch) => {
        try {
            await blogService.update(blog)
            dispatch({
                type: "UPDATE_BLOG",
                data: blog
            })
        }catch (exception) {
            console.error(exception)
        }
    }

}

export default blogsReducer