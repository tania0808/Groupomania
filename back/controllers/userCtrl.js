const { Users, Posts } = require('../models')
const bcrypt = require('bcrypt');
const multer = require('../middleware/multer');
const fs = require('fs');

const { sign } = require('jsonwebtoken');

exports.userSignUp = async (req, res) => {
    if(req.body === undefined) return res.json('Empty data !!!')
    const emailExists = await Users.findOne({ where: { email: req.body.email } });
    
    if(emailExists){ 
        res.json({ message : "Wrong username and password combination !", status: false });
    } 
    else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        const user = {
            email: req.body.email,
            userName: req.body.userName,
            password: hashedPassword
        };

        await Users.create(user);
        const userCreated = await Users.findOne({ where: { email: user.email } });
        const accessToken = sign({ id: userCreated.id, isAdmin: userCreated.isAdmin }, process.env.TOKEN_SECRET_KEY);
        
        res.status(200).json({
            message : "User is created !!!", 
            status: true, 
            token: accessToken, 
            user: JSON.stringify({ 
                id: userCreated.id, 
                userName: userCreated.userName, 
                isAdmin: userCreated.isAdmin,
                userImageUrl: userCreated.userImageUrl
            })
        });
    }
};

exports.userLogIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email: email } });

    if(!user) {
        res.json({message : "Wrong username and password combination !", status: false});
    }
    else {
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.json({message: 'Wrong username and password combination !', status: false});
        const accessToken = sign({ id: user.id, isAdmin: user.isAdmin }, process.env.TOKEN_SECRET_KEY);
        res.json({ 
            status: true, 
            token: accessToken, 
            user: JSON.stringify({ 
                id: user.id, 
                userName: user.userName, 
                isAdmin: user.isAdmin, 
                userImageUrl: user.userImageUrl 
            }) 
        })
    }
};

exports.getUser = async (req, res) => {
    const id = req.auth.id;
    const user = await Users.findOne({ where: { id: id }, attributes: ['userName', 'userImageUrl', 'id', 'email'] });
    res.json(user);
};

exports.modifyUser = async (req, res) => {
    const id = req.auth.id;
    
    if(req.auth.id !== id) {
        res.json('Unauthorized request !');
    }
    
    multer.saveProfileImage( req, res, async () => {
        const { userName, email } = req.body;
        
        let user = await Users.findOne(
            { where: { id: id } }, 
            { include: [{ model: Posts }]}
        );

        if(!req.file) {
            user.set(
                { userName: userName, email: email }
            );
            await user.save();
            res.send({user: user});
            return;
        } else {

            const userImageUrl = `${req.protocol}://${req.get('host')}/images/profile/${req.file.filename}`;
            
            if(user.userImageUrl !== 'http://localhost:3000/images/profile/profile.jpeg') {
                
                const filename = user.userImageUrl.split('/images/profile/')[1];
                    
                fs.unlink(`images/profile/${filename}`, (err) => {
                    if(userName) user.userName = userName;
                    if( email ) user.email = email;
                    if( userImageUrl ) user.userImageUrl = userImageUrl;
                    user.save();
                    res.json({user: user, image: userImageUrl}); 
                });
                return;
            }

            if(userName) user.userName = userName;
            if( email ) user.email = email;
            user.userImageUrl = userImageUrl;
            user.save();
            res.json({user: user, image: userImageUrl
            }); 
        }

    })
    



};
