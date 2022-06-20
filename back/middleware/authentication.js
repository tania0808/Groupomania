const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");
    
    console.log(accessToken);

    if(!accessToken) return res.json({ message: "USER NOT LOGGED IN !!!"});

    const validToken = verify(accessToken, "blueseduction");
    const userId = validToken.userId;

    req.auth = { userId };

    console.log(req.auth);

    try{
        if(validToken) {
            next();
        }
        // if(req.body.userId && req.body.userId !== userId) {
        //     throw 'User id is not valid !!!'
        // } else {
        //     next();
        // }
    } catch(err) {
        res.json({ message: error});
    }
}

module.exports = { validateToken };