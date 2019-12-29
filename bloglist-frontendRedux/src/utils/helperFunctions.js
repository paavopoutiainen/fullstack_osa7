
export const propsForInputField = field => {
    return (({ type, value, onChange }) => ({ type, value, onChange }))(field)
}

