const { getImportData } = require('../../storage/import.storage')

const getCsvImportById = (importId) => {
    return getImportData(importId)
}

module.exports = {
    getCsvImportById
}
