const express = require('express')
const app = express()
const previewRouter = require('./routes/preview.routes')

app.use(express.json())

//
app.use('/api/v1',previewRouter)

app.get('/health',(req,res) => {
    res.status(200).json({
        message:"LeadFlow AI Backend is running.."
    })
})

module.exports = app
