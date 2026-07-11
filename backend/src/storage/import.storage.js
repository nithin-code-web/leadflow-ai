const imports = new Map();

const storeImportData = (importId, parsedData) => {
    imports.set(importId, parsedData)
}

const getImportData = (importId) => {
    return imports.get(importId)
}

const deleteImportData = (importId) => {
    imports.delete(importId)
}

module.exports = {
    storeImportData,
    getImportData,
    deleteImportData
}
