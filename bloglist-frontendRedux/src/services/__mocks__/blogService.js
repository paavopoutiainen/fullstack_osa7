const blogs = [
    {
        title: "testdude merkintä",
        author: "blogaaja",
        url: "www.testtttt",
        likes: 15,
        user: {
            username: "pekka",
            name: "pekka",
        }
    },
    {
        title: "testdude merkintä",
        author: "blogaaja",
        url: "www.testtttt",
        likes: 15,
        user: {
            username: "pekka",
            name: "pekka",
        }
    },
    {
        title: "testdude merkintä",
        author: "blogaaja",
        url: "www.testtttt",
        likes: 15,
        user: {
            username: "pekka",
            name: "pekka",
        }
    }
]

const getAll = () => {
    return blogs
}

const setToken = () => {
    return "heeeey token setting mocked"
}

export default { getAll, setToken }