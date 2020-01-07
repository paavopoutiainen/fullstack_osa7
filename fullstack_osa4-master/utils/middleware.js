const logger = require("./logger")

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

const requestLogger = (request, response, next) => {
    logger.info("Method:", request.method)
    logger.info("Path:  ", request.path)
    logger.info("Body:  ", request.body)
    logger.info("---")

    next()
}

const errorHandler = (error, req, res, next) => {
    logger.error("errooor", error)

    if (error.name === "CastError" && error.kind === "ObjectId") {
        return res.status(400).send({ error: "malformatted id" })
    } else if(error.name === "ValidationError"){
       return res.status(400).json({ error: error.message })
    } else if(error.name = "JsonWebTokenError"){
        return res.status(401).json({ error: "invalid token" })
    }
    next(error)
}
const tokenExtractor = (req, res, next) => {
    const auth = req.header("Authorization")
    if(auth && auth.toLowerCase().startsWith("bearer ")){
        req.token = auth.substring(7)
    }
    next()
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    requestLogger,
    tokenExtractor
}