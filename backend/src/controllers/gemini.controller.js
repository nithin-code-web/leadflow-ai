const { generateGeminiResponse } = require('../services/ai/gemini.service')

const testGeminiApi = async (req,res) => {
    try {
        const prompt = req.body?.prompt || req.query.prompt

        if (!prompt) {
            return res.status(400).json({
                success:false,
                message:'Prompt is required'
            })
        }

        const response = await generateGeminiResponse(prompt)

        return res.status(200).json({
            success:true,
            response
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {
    testGeminiApi
}
