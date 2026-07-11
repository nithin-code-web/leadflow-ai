const { processImport } = require('../services/csv/importCsv.service')

const importCsvFile = async (req,res) => {
    try{
        const { importId } = req.body

        if (!importId) {
            return res.status(400).json({
                success:false,
                message:"importId is required"
            })
        }

        const result = await processImport(importId)

        return res.status(200).json({
            success:true,
            importId,
            headers: result.headers,
            mapping: result.mapping
        })
    } catch(error) {
        res.status(error.statusCode || 500).json({
            success:false,
            message:error.statusCode ? error.message : "server error",
            error:error.message
        })
    }
}

module.exports = {
    importCsvFile
}
