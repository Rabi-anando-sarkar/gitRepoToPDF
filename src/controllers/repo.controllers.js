import { asyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const getPdf = asyncHandler(async (req,res) => {
    console.log('hello');
    return res.status(201).json(
        new ApiResponse(
            200,
            'Working'
        )
    )
})

export {
    getPdf
}