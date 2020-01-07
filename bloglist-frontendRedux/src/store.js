import { createStore, combineReducers, applyMiddleware } from "redux"
import notificationReducer from "./reducers/notificationReducer"
import blogsReducer from "./reducers/blogsReducer"
import userReducer from "./reducers/userReducer"
import usersReducer from "./reducers/usersReducer"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"


const combined = combineReducers({
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer
})

const store = createStore(combined,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store