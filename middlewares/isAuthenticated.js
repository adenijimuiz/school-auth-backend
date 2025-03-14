const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const isAuthenticated = asyncHandler(async (req, res, next) => {
    // let token;

    // // const authHeader = req.headers.authorization;
    // // if(authHeader && authHeader.startsWith('Bearer')){
    // //     token = authHeader.split(' ')[1];
    // // }

    // if (decoded.role !== 'admin') {
    //     res.status(403);
    //     throw new Error('Access denied, admin only');
    // }

    // if(!token){
    //     res.status(401);
    //     throw new Error('Not authorized, no token');
    // }

    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     if (decoded.role !== 'admin') {
    //         res.status(403);
    //         throw new Error('Access denied, admin only');
    //     }
    //     req.user = decoded;
    //     next();
    //     } catch (error) {
    //     res.status(401);
    //     throw new Error('Not authorized, token failed');
    //     }
    if (req.cookies.token) {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') {
            res.status(403);
            throw new Error('Access denied, admin only');
        }
        req.user = decoded;
        return next();
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = isAuthenticated;
