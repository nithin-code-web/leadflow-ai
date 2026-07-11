const { getImportData, deleteImportData } = require('../../storage/import.storage')
const { buildHeaderMappingPrompt } = require('../../prompts/headerMapping.prompt')
const { generateGeminiResponse } = require('../ai/gemini.service')
const { transformRows } = require('../transform.service')

const getCsvImportById = (importId) => {
    return getImportData(importId)
}

const parseGeminiJsonResponse = (responseText) => {
    const cleanedResponse = responseText
        .trim()
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```$/i, '')
        .trim()

    try {
        return JSON.parse(cleanedResponse)
    } catch (error) {
        const parseError = new Error('Gemini returned invalid JSON')
        parseError.statusCode = 502
        throw parseError
    }
}

const processImport = async (importId) => {
    const importData = getImportData(importId)

    if (!importData) {
        const error = new Error('Import not found')
        error.statusCode = 404
        throw error
    }

    const headers = importData.headers
    const rows = importData.rows

    if (!Array.isArray(headers) || headers.length === 0) {
        const error = new Error('headers not found for import')
        error.statusCode = 400
        throw error
    }

    if (!Array.isArray(rows)) {
        const error = new Error('rows not found for import')
        error.statusCode = 400
        throw error
    }

    const prompt = buildHeaderMappingPrompt(headers)
    const geminiResponse = await generateGeminiResponse(prompt)
    const mapping = parseGeminiJsonResponse(geminiResponse)

    if (!mapping.fieldMapping || typeof mapping.fieldMapping !== 'object') {
        const error = new Error('Gemini mapping is invalid')
        error.statusCode = 502
        throw error
    }

    const records = transformRows(rows, mapping.fieldMapping)

    deleteImportData(importId)

    return {
        headers,
        mapping,
        records
    }
}

module.exports = {
    getCsvImportById,
    processImport
}
