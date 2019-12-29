const notificationReducer = (state = { success: null, error: null }, action) => {
    switch(action.type) {
    case "NEW_SUCCESS":
        return { success: action.data, error: null }
    case "NEW_ERROR":
        return { error: action.data, success: null }
    case "HIDE":
        return { success: null, error: null }
    default: return state
    }
}

export const newSuccessNotification = (notification) => {
    return dispatch => {
        dispatch({
            type: "NEW_SUCCESS",
            data: notification
        })
        setTimeout(() => {
            dispatch({
                type: "HIDE"
            })
        }, 5000)
    }
}

export const newErrorNotification = (notification) => {
    return dispatch => {
        dispatch({
            type: "NEW_ERROR",
            data: notification
        })
        setTimeout(() => {
            dispatch({
                type: "HIDE"
            })
        }, 5000)
    }
}

export default notificationReducer