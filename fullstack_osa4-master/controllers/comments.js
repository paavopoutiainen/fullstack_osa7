const commentRouter = require("express").Router()
const Comment = require("../models/Comment")
const User = require("../models/user")
const Blog = require("../models/blog")

commentRouter.get("/", async (req, res, next) => {
    try {
        //me halutaan muuttaa se JSON olio muuttaa modeliksi
        const comments = await Comment.find({}).populate("blog", { title: 1, id: 1 })

        res.json(comments.map(c => c.toJSON()))
    } catch (exception) {
        console.error(exception)
    }
})

module.exports = commentRouter