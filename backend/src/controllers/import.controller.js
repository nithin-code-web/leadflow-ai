const importCsvFile = async (req,res) => {
    try{
        res.status(200).json({
            success:true,
            message:"import api working.."
        })
    } catch(error) {
        res.status(500).json({
            success:false,
            message:"server error",
            error:error.message
        })
    }
}

module.exports = {
    importCsvFile
}