const usersRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const { body } = require('express-validator/check')
const { validationResult } = require('express-validator/check')
const Blog = require("../models/blog")
const logger = require("../utils/logger")

const validate = (method) => {
    switch (method) {
        case "passwordValidation": {
            return [
                body("password", "password should consist of at least 1 number, 1 capitalized alphabet, 1 lowercase alphabet, 1 special character and be minimum of 8 characters in length").exists().isLength({ min: 8 }).matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
            ]
        }
    }
}

usersRouter.get("/", async (req, res, next) => {
    try {
        const users = await User.find({}).populate("blogs", { url: 1, title: 1 })
        res.json(users.map(u => u.toJSON()))
    } catch (exception) {
        next(exception)
    }

})

usersRouter.post("/", validate("passwordValidation"), async (req, res, next) => {

    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() })
            return
        }

        const body = req.body

        const rounds = 10
        const passwordHash = await bcrypt.hash(body.password, rounds)
        logger.info("passu", passwordHash)
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash: passwordHash
        })

        const savedUser = await user.save()

        res.status(201).json(savedUser)
    } catch (exception) {
        next(exception)
    }


})

module.exports = usersRouter
