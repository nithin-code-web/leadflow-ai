const { parseCsvFile } = require('../services/csv/parseCsv.service')
const { randomUUID } = require('crypto')
const { storeImportData } = require('../storage/import.storage')

const previewCsvFile = async (req,res) => {
    try{
        const parsedCsv = await parseCsvFile(req.file.path)
        const importId = randomUUID()

        storeImportData(importId, parsedCsv)

        return res.status(200).json({
            success:true,
            importId,
            preview: parsedCsv.rows,
            headers: parsedCsv.headers,
            totalRows: parsedCsv.totalRows
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"server error",
            error : error.message
        })
    }
}

module.exports = {
 previewCsvFile

}
