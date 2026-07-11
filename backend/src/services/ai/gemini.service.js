const { GoogleGenAI } = require('@google/genai')

const DEFAULT_GEMINI_MODEL = 'gemini-3.5-flash'

const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
        throw new Error('GEMINI_API_KEY is required')
    }

    return new GoogleGenAI({ apiKey })
}

const generateGeminiResponse = async (prompt) => {
    if (!prompt || typeof prompt !== 'string') {
        throw new Error('Prompt is required')
    }

    const ai = getGeminiClient()

    const response = await ai.models.generateContent({
        model: process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL,
        contents: prompt
    })

    return response.text || ''
}

module.exports = {
    generateGeminiResponse
}
