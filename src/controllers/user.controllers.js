import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { generateToken } from "../utils/generateToken.js";

const register = asyncHandler( async(req,res) => {
    const { username,email,password } = req.body;

    if(
        [username,email,password].some((field) => field?.trim() === '')
    ) {
        throw new ApiError(
            400,
            'All Fields are required'
        )
    }

    const existedUser = await User.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(existedUser) {
        throw new ApiError(
            409,
            "Username is already taken try with a different username"
        )
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
    })

    const createdUser = await User.findById(
        user._id
    ).select("-password")

    if(!createdUser) {
        throw new ApiError(
            500,
            'Something went wrong fetching the user'
        )
    }

    return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    {
                        user: createdUser,
                    },
                    "User registered Succesfully"
                )
            )
})

const login = asyncHandler( async(req,res) => {
    const { emailOrUsername, password} = req.body

    if(!emailOrUsername) {
        throw new ApiError(
            400,
            "Please Enter your email or username"
        )
    }

    const user = await User.findOne({
        $or: [
            { email: emailOrUsername },
            { username: emailOrUsername },
        ],
    });

    if(!user) {
        throw new ApiError(
            404,
            "User Does not exists"
        )
    }

    const passwordCheck = await user.isPasswordCorrect(password)

    if(!passwordCheck) {
        throw new ApiError(
            401,
            "Invalid Password"
        )
    }

    const loggedInUser = await User.findById(user._id).select("-password")
    
    const token = generateToken(user)

    if(!token) {
        throw new ApiError(
            400,
            "Error generating Token"
        )
    }

    return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: loggedInUser,
                        token
                    },
                    "User Logged in succesfully"
                )
            )
})

export {
    register,
    login
}