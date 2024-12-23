const asyncHandler = (requestHandlerFuction) => async(req,res,next) => {
    try {
        await requestHandlerFuction(req,res,next)
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

export { asyncHandler }