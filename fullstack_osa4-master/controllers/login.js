const loginRouter = require("express").Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

loginRouter.post("/", async (req, res, next) => {
    const body = req.body

    //eli me saadaan bodyssa username ja password. Ne täytyy tarkistaa, että löytyvätkö ne 
    //tietokannasta
    const user = await User.findOne({ username: body.username})
    
    const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)
    
    if(!(user && passwordCorrect)){
       return  res.status(401).json({ error: "wrong username or password" })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200).json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter 