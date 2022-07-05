const { verify } = require('jsonwebtoken');
require('dotenv').config();

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if(!accessToken) return res.json({ message: "USER NOT LOGGED IN !!!"});
    
    try{
        req.auth = verify(accessToken, process.env.TOKEN_SECRET_KEY);
        next();
    } catch(err) {
        res.json({ message: error});
    }
}

module.exports = { validateToken };