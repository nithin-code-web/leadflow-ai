const express = require('express')
const router = express.Router();
const { 
    previewCsvFile,
 } = require('../controllers/preview.controller');

 const { 
    uploadCsvFile
 } = require('../middlewares/upload.middleware')
 
 router.post('/preview',uploadCsvFile,previewCsvFile)

 module.exports = router;
