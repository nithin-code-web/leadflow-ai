const express = require('express')
const router = express.Router();
const { 
    previewCsv,
 } = require('../controllers/preview.controller');

 const { 
    uploadCsv
 } = require('../middlewares/upload.middleware')
 
 router.post('/preview',uploadCsv,previewCsv)

 module.exports = router;
