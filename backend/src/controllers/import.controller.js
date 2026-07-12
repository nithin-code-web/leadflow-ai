const { processImport } = require('../services/csv/importCsv.service')

const importCsvFile = async (req, res) => {
    const { importId } = req.body

    if (!importId) {
        const error = new Error('importId is required')
        error.statusCode = 400
        throw error
    }

    const result = await processImport(importId)

    return res.status(200).json({
        success: true,
        mapping: result.mapping,
        importId,
        records: result.records
    })
}

module.exports = {
    importCsvFile
}
