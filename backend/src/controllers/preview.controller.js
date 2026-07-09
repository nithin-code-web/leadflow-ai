const previewFile = async (req,res) => {
    try{
        return res.status(200).json({
            success:true,
            message:"preview endpoint is working.."
        })
    } catch (error) {
        res.status(500).send({
            message:"server error",
            error : error.message
        })
    }
}

module.exports = {
    previewFile
}