import React from 'react'
import { connect } from "react-redux"
import { newErrorNotification, newSuccessNotification } from "../reducers/notificationReducer.js"

const Notification = (props) => {
    if (props.message === null && props.errorMessage === null){
        return null
    }
    if (props.message !== null && props.errorMessage === null) {
        return (
            <div className="success">
                {props.message}
            </div>
        )
    }

    return (
        <div className="error">
            {props.errorMessage}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        message: state.notification.success,
        errorMessage: state.notification.error,
        show: state.notification.show
    }
}

export default connect(mapStateToProps, { newErrorNotification, newSuccessNotification })(Notification)