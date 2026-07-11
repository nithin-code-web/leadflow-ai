const fs = require('fs')
const path = require('path')
const multer = require('multer')

const uploadDir = path.join(__dirname, '../../uploads')
const maxFileSize = 5 * 1024 * 1024

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
        cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase()
    const allowedMimeTypes = [
        'text/csv',
        'application/csv',
        'application/vnd.ms-excel'
    ]

    if (extension === '.csv' && allowedMimeTypes.includes(file.mimetype)) {
        return cb(null, true)
    }

    cb(new Error('Only CSV files are allowed'))
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: maxFileSize
    }
}).single('file')

const uploadCsvFile = (req, res, next) => {
    upload(req, res, (error) => {
        if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'CSV file must be under 5 MB'
            })
        }

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'CSV file is required'
            })
        }

        if (req.file.size === 0) {
            fs.unlink(req.file.path, () => {})

            return res.status(400).json({
                success: false,
                message: 'CSV file is empty'
            })
        }

        next()
    })
}

module.exports = { uploadCsvFile }
