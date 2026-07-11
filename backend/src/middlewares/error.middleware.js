const errorMiddleware = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error)
    }

    const statusCode = error.statusCode || 500

    return res.status(statusCode).json({
        success:false,
        message:error.statusCode ? error.message : 'Internal server error'
    })
}

module.exports = {
    errorMiddleware
}
