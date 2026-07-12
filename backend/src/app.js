require('dotenv').config({ quiet: true })
const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors());

const previewRouter = require('./routes/preview.routes')
const importRouter = require('./routes/import.routes')
const geminiRouter = require('./routes/gemini.routes')
const { errorMiddleware } = require('./middlewares/error.middleware')

app.use(express.json())

//
app.use('/api/v1',previewRouter,importRouter,geminiRouter)

app.get('/',(req,res) => {
    res.status(200).json({
        success:true,
        message:"LeadFlow AI Backend is running.."
    })
})

app.use(errorMiddleware)

module.exports = app
