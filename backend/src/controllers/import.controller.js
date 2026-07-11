const { getCsvImportById } = require('../services/csv/importCsv.service')

const importCsvFile = async (req,res) => {
    try{
        const { importId } = req.body

        if (!importId) {
            return res.status(400).json({
                success:false,
                message:"importId is required"
            })
        }

        const importedCsv = getCsvImportById(importId)

        if (!importedCsv) {
            return res.status(404).json({
                success:false,
                message:"import data not found"
            })
        }

        return res.status(200).json({
            success:true,
            importId,
            data: importedCsv
        })
    } catch(error) {
        res.status(500).json({
            success:false,
            message:"server error",
            error:error.message
        })
    }
}

module.exports = {
    importCsvFile
}
