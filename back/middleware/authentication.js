const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if(!accessToken) return res.json({ message: "USER NOT LOGGED IN !!!"});
    
    try{
        req.auth = verify(accessToken, "blueseduction");
        next();
    } catch(err) {
        res.json({ message: error});
    }
}

module.exports = { validateToken };