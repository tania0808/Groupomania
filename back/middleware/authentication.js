const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if(!accessToken) return res.json({ message: "USER NOT LOGGED IN !!!"});

    const validToken = verify(accessToken, "blueseduction");
    //const userId = validToken.userId;
    const id = validToken.id;
    const userName = validToken.userName;

    req.auth = { id, userName };

    try{
        //if(req.body.userId && req.body.userId !== userId && !validToken) 
        if(req.body.id && req.body.id !== id && !validToken) 
        {
            res.status(400).json('User id is not valid !!!')
        } else {
            next();
        }
        
    } catch(err) {
        res.json({ message: error});
    }
}

module.exports = { validateToken };