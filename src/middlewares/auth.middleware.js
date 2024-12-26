import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js';

const authenticateToken = (req,res,next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        throw new ApiError(
            401,
            "Access Token Required"
        )
    }

    jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
        if(err) {
            throw new ApiError(
                403,
                'Invalid Token'
            )
        }

        req.user = user
        next()
    })
}

export default authenticateToken