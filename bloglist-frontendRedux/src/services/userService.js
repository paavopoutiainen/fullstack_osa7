import axios from "axios"

const baseUrl = "http://localhost:3003/api/users"


const getAll = async () => {
    try {
        const users = await axios.get(baseUrl)
        console.log(users.data)
        return users.data
    }catch(exception){
        console.error(exception)
    }
}

export default { getAll }