const { generateGeminiResponse } = require('../services/ai/gemini.service')

const testGeminiApi = async (req,res) => {
    const prompt = req.body?.prompt || req.query.prompt

    if (!prompt) {
        const error = new Error('Prompt is required')
        error.statusCode = 400
        throw error
    }

    const response = await generateGeminiResponse(prompt)

    return res.status(200).json({
        success:true,
        response
    })
}

module.exports = {
    testGeminiApi
}
