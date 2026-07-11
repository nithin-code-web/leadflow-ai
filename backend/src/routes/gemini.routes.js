const express = require('express')
const router = express.Router()
const {
    testGeminiApi
} = require('../controllers/gemini.controller')

router.get('/gemini',testGeminiApi)
router.post('/gemini',testGeminiApi)

module.exports = router
