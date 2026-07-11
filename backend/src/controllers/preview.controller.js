const fs = require('fs/promises')
const { parseCsvFile } = require('../services/csv/parseCsv.service')
const { randomUUID } = require('crypto')
const { storeImportData } = require('../storage/import.storage')

const previewCsvFile = async (req,res) => {
    const uploadedFilePath = req.file.path
    let parsedCsv

    try {
        parsedCsv = await parseCsvFile(uploadedFilePath)
    } finally {
        await fs.unlink(uploadedFilePath).catch(() => {})
    }

    const importId = randomUUID()

    storeImportData(importId, parsedCsv)

    return res.status(200).json({
        success:true,
        importId,
        preview: parsedCsv.rows,
        headers: parsedCsv.headers,
        totalRows: parsedCsv.totalRows
    })
}

module.exports = {
 previewCsvFile

}
