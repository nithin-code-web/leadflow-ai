const fs = require('fs/promises')
const Papa = require('papaparse')

const createBadRequestError = (message) => {
    const error = new Error(message)
    error.statusCode = 400
    return error
}

const parseCsvFile = async (filePath) => {
    const csvContent = await fs.readFile(filePath, 'utf8')

    if (!csvContent.trim()) {
        throw createBadRequestError('CSV file is empty')
    }

    const result = Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
        transform: (value) => value.trim()
    })

    if (result.errors.length > 0) {
        const firstError = result.errors[0]
        throw createBadRequestError(`CSV parsing failed: ${firstError.message}`)
    }

    const headers = result.meta.fields || []
    const rows = result.data.filter((row) => {
        return Object.values(row).some((value) => String(value).trim() !== '')
    })

    if (headers.length === 0 || headers.every((header) => !header)) {
        throw createBadRequestError('CSV file is empty')
    }

    if (rows.length === 0) {
        throw createBadRequestError('CSV file is empty')
    }

    return {
        rows,
        headers,
        totalRows: rows.length
    }
}

module.exports = {
    parseCsvFile
}
