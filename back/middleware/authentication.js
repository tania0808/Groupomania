const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");
    
    console.log(accessToken);

    if(!accessToken) return res.json({ message: "USER NOT LOGGED IN !!!"});

    const validToken = verify(accessToken, "blueseduction");
    const userId = validToken.userId;
    const id = validToken.id;
    
    console.log(validToken);
    req.auth = { userId, id };

    console.log(req.auth);

    try{
        if(req.body.userId && req.body.userId !== userId && !validToken) {
            throw 'User id is not valid !!!'
        } else {
            next();
        }
        
    } catch(err) {
        res.json({ message: error});
    }
}

module.exports = { validateToken };