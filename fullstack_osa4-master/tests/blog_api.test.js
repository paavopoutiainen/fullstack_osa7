const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app.js")
const api = supertest(app)
const Blog = require("../models/blog")
const User = require("../models/user")
const helper = require("./test_helper")

beforeEach(async () => {
    //tyhjennetään testitietokanta
    await Blog.deleteMany({})
    //Täytetään tietokanta testidatala
    await Blog.insertMany(helper.blogs)
})

describe("GET for all", () => {
    test("blogs are returned in JSON", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })
    test("returns three blogs", async () => {
        const response = await api.get("/api/blogs")

        expect(response.body.length).toEqual(helper.blogs.length)
    })
    test("A specific blog is amongst the returned blogs", async () => {
        const response = await api.get("/api/blogs")

        const titles = response.body.map(x => x.title)

        expect(titles).toContain("Canonical string reduction")
    })
    test("returned objects have field *id* instead of *_id*", async () => {
        const response = await api.get("/api/blogs")
        expect(response.body[0].id).toBeDefined()
    })
})

describe("POST", () => {
    test("increases the number of blogs in the db by one and the content of blog object matches", async () => {
        const newBlog = {
            title: "reseptit",
            author: "Andrea",
            url: "www.reseptit.fi",
            likes: 3000
        }
        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        console.log(blogsAtEnd)

        expect(blogsAtEnd.length).toBe(helper.blogs.length + 1)
        expect(blogsAtEnd.map(b => b.title)).toContain("reseptit")
    })
    test("added blog without likes value is given likes value of 0", async () => {
        const newBlog = {
            title: "reseptit",
            author: "Andrea",
            url: "www.reseptit.fi"
        }
        await api.post("/api/blogs").send(newBlog)

        const blogsAtEnd = await helper.blogsInDb()
        const addedBlog = blogsAtEnd.find(b => b.title === "reseptit")

        expect(addedBlog.likes).toBe(0)
    })
    test("of blog without fields title and url responds with 400", async () => {
        const newBlog = {
            author: "Andrea",
            likes: 19
        }

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(400)
    })
})

describe("DELETE", () => {
    test("succeeds if id is valid", async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtStart.length).toBe(blogsAtEnd.length + 1)
        const ids = blogsAtEnd.map(b => b.id)
        expect(blogsAtEnd).not.toContain(blogToDelete.id)
    })
})

describe("PUT", () => {
    test("valid update returns 204 and document gets updated", async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        const likes = blogToUpdate.likes

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({ ...blogToUpdate, likes: likes + 1 })
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)

        expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1)

    })
})

describe("saving a new user, when there is initially one in db", () => {
    beforeEach(async () => {
        //await User.deleteMany({})
        const user = new User({
            username: "testiykkönen",
            name: "paavo poutiainen",
            passwordHash: "fuLLStack9#00"
        })
        await user.save()
    })
    test("succeeds with proper status code when username is unique and password is valid", async () => {
        const usersAtStart = await helper.usersInDb()

        const user = {
            username: "paavo9000uniikki",
            name: "paavo poutiainen",
            password: "fuLLStack9#00"
        }

        await api
            .post("/api/users")
            .send(user)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const usersAtEnd = await helper.usersInDb()

        const usernames = usersAtEnd.map(u => u.username)

        expect(usernames).toContain("paavo9000uniikki")
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    })
    test("doesn't save if username already exists, response status 400", async () => {
        const usersAtStart = await helper.usersInDb()
        const takenUsername = usersAtStart[0].username
        console.log("taken", takenUsername)

        const newUser = {
            username: takenUsername,
            name: "puavo",
            password: "seRre#6d"
        }
        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()

        expect(usersAtStart.length).toBe(usersAtEnd.length)
    })
    test("doesn't save if username is too short, response status 400", async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "ly",
            name: "puavo",
            password: "seRre#6d"
        }
        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)

        //expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()

        expect(usersAtStart.length).toBe(usersAtEnd.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})