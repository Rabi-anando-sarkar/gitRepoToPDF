import jwt from 'jsonwebtoken'

const generateToken = (error) => {
    return jwt.sign(
        {
            username: user.username,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY
        }
    )
}

export { generateToken }