const express = require('express')
const router = express.Router()
const {
    importCsvFile
} = require('../controllers/import.controller')

router.post('/import',importCsvFile)

module.exports = router