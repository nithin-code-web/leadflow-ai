const { getImportData } = require('../../storage/import.storage')
const { buildHeaderMappingPrompt } = require('../../prompts/headerMapping.prompt')
const { generateGeminiResponse } = require('../ai/gemini.service')

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
        const error = new Error('import data not found')
        error.statusCode = 404
        throw error
    }

    const headers = importData.headers

    if (!Array.isArray(headers) || headers.length === 0) {
        const error = new Error('headers not found for import')
        error.statusCode = 400
        throw error
    }

    const prompt = buildHeaderMappingPrompt(headers)
    const geminiResponse = await generateGeminiResponse(prompt)
    const mapping = parseGeminiJsonResponse(geminiResponse)

    return {
        headers,
        mapping
    }
}

module.exports = {
    getCsvImportById,
    processImport
}
