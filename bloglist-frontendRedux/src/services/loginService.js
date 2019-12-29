import axios from "axios"
const url = "http://localhost:3003/api/login"

const login = async (credentials) => {
    const response = await axios.post(url, credentials)
    console.log("here", response)
    return response.data
}

export default { login }

