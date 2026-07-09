const fs = require('fs/promises')
const Papa = require('papaparse')

const parseCsvFile = async (filePath) => {
    const csvContent = await fs.readFile(filePath, 'utf8')

    const result = Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
        transform: (value) => value.trim()
    })

    if (result.errors.length > 0) {
        const firstError = result.errors[0]
        throw new Error(`CSV parsing failed: ${firstError.message}`)
    }

    return {
        rows: result.data,
        headers: result.meta.fields || [],
        totalRows: result.data.length
    }
}

module.exports = {
    parseCsvFile
}
