const jwt = require('jsonwebtoken');

const validateJwt = (req, res, next) => {

    // Read the token

    const token = req.header('x-token');

    // console.log(token);

    if (!token) {
        return res.status(401).json({
            ok:false,
            msg: 'There is no toke in the request'
        })
    }
   
    // Verify the Json Web Token 
    try {
        const {uid } = jwt.verify(token, process.env.JWT_SECRET );

        req.uid = uid;
        next();
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'The token is no valid'
        });
    }
}

module.exports = {
    validateJwt 
}

