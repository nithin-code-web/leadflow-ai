const express = require('express')
const router = express.Router();
const { 
    previewFile,
 } = require('../controllers/preview.controller');

 router.post('/preview',previewFile)

 module.exports = router;
