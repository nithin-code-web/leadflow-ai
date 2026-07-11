require('dotenv').config({ quiet: true })
const express = require('express')
const app = express()
const previewRouter = require('./routes/preview.routes')
const importRouter = require('./routes/import.routes')
const geminiRouter = require('./routes/gemini.routes')
app.use(express.json())

//
app.use('/api/v1',previewRouter,importRouter,geminiRouter)

app.get('/health',(req,res) => {
    res.status(200).json({
        message:"LeadFlow AI Backend is running.."
    })
})

module.exports = app
