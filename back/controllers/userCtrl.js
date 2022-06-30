const { Users } = require('../models')
const bcrypt = require('bcrypt');

const { sign } = require('jsonwebtoken');

exports.userSignUp = async (req, res) => {
    
    if(req.body === undefined) return res.json('Empty data !!!')
    
    const emailExists = await Users.findOne({ where: { email: req.body.email }});
    
    if(emailExists){
        res.json({message : "User already exists !!!", status: false});
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
        const user = {
            email: req.body.email,
            userName: req.body.userName,
            password: hashedPassword
        };
        await Users.create(user);
        const accessToken = sign({userId: user.userId}, "blueseduction");
        res.status(200).json({message : "User is created !!!", status: true, token: accessToken})
    }
};

exports.userLogIn = async (req, res) => {
    const { email, password} = req.body;

    const user = await Users.findOne({ where: { email: email }});
    if(!user) res.json({message : "User doesn't exist !!!", status: false});

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.json({message: 'Wrong username and password combination !', status: false});

    const accessToken = sign({userId: user.userId, id: user.id, userName: user.userName }, "blueseduction");

    res.json({ message: 'YOU LOGGED IN !!!', status: true, token: accessToken})
};