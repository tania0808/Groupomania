const { Users, Posts } = require('../models')
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

        const userCreated = await Users.findOne({ where: { email: user.email }});
        const accessToken = sign({ id: userCreated.id, isAdmin: userCreated.isAdmin }, process.env.TOKEN_SECRET_KEY);
        res.status(200).json({
            message : "User is created !!!", 
            status: true, 
            token: accessToken, 
            user: JSON.stringify({ 
                id: userCreated.id, 
                userName: userCreated.userName, 
                isAdmin: userCreated.isAdmin 
            })
        })
    }
};

exports.userLogIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email: email }});

    if(!user) {
        res.json({message : "User doesn't exist !!!", status: false});
    }
    else {
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.json({message: 'Wrong username and password combination !', status: false});
        const accessToken = sign({ id: user.id, isAdmin: user.isAdmin }, process.env.TOKEN_SECRET_KEY);
        res.json({ message: 'YOU LOGGED IN !!!', status: true, token: accessToken, user: JSON.stringify({ id: user.id, userName: user.userName, isAdmin: user.isAdmin }) })
    } 

};

exports.getUser = async (req, res) => {
    const id = req.auth.id;
    const user = await Users.findOne({ where: { id: id }});
    res.json(user);
};

exports.modifyUser = async (req, res) => {
    const id = req.auth.id;
    const userName = req.body.userName;
    const email = req.body.email;

    let user = await Users.findOne({ where: { id: id }}, {include: [
        { model: Posts}
    ]});
    
    user.set({
        userName: userName,
        email: email
    }, {include: [
        { model: Posts.userName}
    ]})

    await user.save();

   res.send(user);
};
