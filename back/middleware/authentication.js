const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if(!accessToken) return res.json({ message: "USER NOT LOGGED IN !!!"});
    
    try{
        req.auth = verify(accessToken, process.env.TOKEN_SECRET_KEY);
        next();
    } catch(err) {
        res.json({ message: err});
    }
}

module.exports = { validateToken };