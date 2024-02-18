const jwt = require('jsonwebtoken');

const generateJwt = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };
    
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h' // Set expiration time to 12 hours
        }, (err, token) => {
            if (err) {
                console.error(err);
                reject('Unable to generate the token');
            } else {
               resolve(token); 
            }
        });
    });
}

module.exports = {
    generateJwt
};
