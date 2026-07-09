const imports = new Map();

const storeImportData = (importId, parsedData) => {
    imports.set(importId, parsedData)
}

const getImportData = (importId) => {
    return imports.get(importId)
}

module.exports = {
    storeImportData,
    getImportData
}
