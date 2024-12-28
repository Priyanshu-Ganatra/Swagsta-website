import jwt from 'jsonwebtoken'; 

export const generateTokenAndSetCookie = (uid, res) => {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

    res.cookie('jwt', token, {
        httpOnly: true,
        // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        sameSite: 'none',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production'
    })  

    return token;
}