const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const Comment = require("../models/Comment")

blogRouter.get("/", async (req, res, next) => {
    try {
        var blogs = await Blog.find({})
            .populate("comments", "-blog")
            .populate("user", { username: 1, name: 1 })
        res.json(blogs.map(b => b.toJSON()))
    } catch (exception) {
        next(exception)
    }
})

blogRouter.post("/", async (req, res, next) => {
    console.log("eeee", req.token)
    const body = req.body

    //eli täällä ennen blogin tallentamista täytyy verifioida onko token validi ja sitten
    //decoodata token ja ottaa siitä id ja laittaa kyseinen id blogin user kenttään
    //jos tokenia tai dekooodatun tokenin id:tä ei löydy palautetaan 401
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        console.log("dtoken", decodedToken)
        if (!req.token || !decodedToken.id) {
            res.status(401).json({ error: "token missing or invalid" })
        }
        const user = await User.findById(decodedToken.id)
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })

        //tallennetaan blogi tietokantaan
        const savedBlog = await blog.save()
        //liitetään blogin lisänneelle käyttäjälle bkyseinen blogi tämän blogs listaan
        user.blogs = user.blogs.concat(savedBlog)
        //ja tallennetaan käyttäjä, jos tätä ei tehdä, on user restin blogs taulukko tyhjä
        user.save()
        res.status(201).json(savedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

blogRouter.delete("/:id", async (req, res, next) => {

    try {
        const decodedToken = jwt.decode(req.token, process.env.SECRET)

        const user = await User.findById(decodedToken.id)
        const blog = await Blog.findById(req.params.id)

        if (!decodedToken || !user || user._id.toString() !== blog.user.toString()) {
            res.status(401).json({ error: "token missing or invalid" })
        }
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

blogRouter.put("/:id", async (req, res, next) => {
    const body = req.body

    const update = {
        likes: body.likes
    }
    try {
        await Blog.findByIdAndUpdate(req.params.id, update, { new: true })
        res.status(204).json()
    } catch (exception) {
        next(exception)
    }
})
blogRouter.post("/:id/comments", async (req, res, next) => {
    try {
        //me halutaan muuttaa se JSON olio muuttaa modeliksi
        const body = req.body
        console.log("toimiikoooooooooooooooooooooo ", req.params.id)
        console.log("toimiikoooooooooooooooooooooo ", body.comment)


        const comment = new Comment({
            commentStr: body.comment,
            blog: req.params.id
        })

        const savedComment = await comment.save()

        const blog = await Blog.findById(req.params.id)
        console.log(blog)
        var commentsOfTheBlog = blog.comments

        const update = {
            comments: commentsOfTheBlog.concat(savedComment.id)
        }

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, update, { new: true })

        res.status(201).json(savedComment.toJSON())

    } catch (exception) {
        console.error(exception)
    }
})

module.exports = blogRouter