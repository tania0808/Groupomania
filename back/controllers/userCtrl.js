const { Users, Posts } = require('../models')
const bcrypt = require('bcrypt');
const multer = require('../middleware/multer');
const fs = require('fs');

const { sign } = require('jsonwebtoken');
const { signInValidation, passwordValidation } = require('../middleware/validation');

/**
 * Creating user account, log into it
 * @returns {Object} message, status, token, user data
 */
exports.userSignUp = async (req, res) => {
    if(req.body === undefined) return res.status(400).json('Empty data !!!')
    
    const { error  } = signInValidation(req.body);
    const isValidPassword = passwordValidation(req.body.password);
    
    if(!isValidPassword) {
        //return res.json({ message: "The password should have a minimum length of 6 characters, a minimum of 1 uppercase letter, a minimum of 2 digits, should not have spaces"});
        return res.status(400).json(isValidPassword);
    }

    if(error){
        res.json({ message: error.details[0].message });
        return;
    }

    const emailExists = await Users.findOne({ where: { email: req.body.email } });
    
    if(emailExists){ 
        res.json({ message : "Wrong username and password combination !", status: false }).status(400);
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

/**
 * Log into user account
 * @returns {Object} status, token, user data
 */
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
        res.status(200).json({ 
            status: true, 
            token: accessToken, 
            user: JSON.stringify({ 
                id: user.id, 
                userName: user.userName, 
                isAdmin: user.isAdmin, 
                userImageUrl: user.userImageUrl,
                userPosition: user.userPosition
            }) 
        })
    }
};

/**
 * Gets user information from database
 * @returns {Object} user
 */
exports.getUser = async (req, res) => {
    const id = req.auth.id;
    const user = await Users.findOne({ where: { id: id }, attributes: ['userName', 'userImageUrl', 'id', 'email', 'userPosition']});
    res.status(200).json(user);
};

/**
 * Updates user information
 * @returns {Object} user , user image url
 */
exports.modifyUser = async (req, res) => {
    const id = req.auth.id;
    
    let user = await Users.findOne(
        { where: { id: id },
        attributes: {exclude: ['password']} }, 
        { include: [{ model: Posts }]}
    );

    if(id !== user.id) {
        res.status(401).json('Unauthorized request !');
    }
    
    multer.saveProfileImage( req, res, async () => {
        const { userName, email, userPosition } = req.body;
        
        if(!req.file) {
            user.set(
                { userName: userName, email: email, userPosition: userPosition }
            );
            await user.save();
            res.status(201).send({user: user});
            return;
        } else {

            const userImageUrl = `${req.protocol}://${req.get('host')}/images/profile/${req.file.filename}`;
            
            if(user.userImageUrl !== 'http://localhost:3000/images/profile/profile.jpeg') {
                
                const filename = user.userImageUrl.split('/images/profile/')[1];
                    
                fs.unlink(`images/profile/${filename}`, (err) => {
                    if(userName) user.userName = userName;
                    if(email) user.email = email;
                    if(userPosition) user.userPosition = userPosition;
                    if(userImageUrl) user.userImageUrl = userImageUrl;
                    user.save();
                    res.status(201).json({user: user, image: userImageUrl}); 
                });
                return;
            }

            if(userName) user.userName = userName;
            if(email) user.email = email;
            if(userPosition) user.userPosition = userPosition;
            user.userImageUrl = userImageUrl;
            user.save();
            res.status(201).json({user: user, image: userImageUrl
            }); 
        }
    })
};

/**
 * Updates user password
 * @returns {String} result of password updating
 */
exports.updatePassword = async (req, res) => {
    const id = req.auth.id;
    const user = await Users.findOne({ where: { id: id }, attributes: ['id', 'password']});

    if(id != user.id) {
        res.status(401).json('Unauthorized request !');
        return;
    }

    const { password, confirmPassword } = req.body;
    const isValidPassword = passwordValidation(req.body.password);
    
    if(!isValidPassword) {
        return res.status(400).json(isValidPassword);
    }

    if(password !== confirmPassword) {
        return res.status(400).json("Those passwords didn't match. Please try again");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(201).json('Password updated !'); 
}


/**
 * Deletes user acount
 * @returns {String} result of deletion
 */
exports.deleteUserAccount = async (req, res) => {
    const id = req.auth.id;
    const user = await Users.findOne({ where: { id: id }});

    if(id != user.id) {
        return res.status(401).json('Unauthorized request !');
    }

    if(user.userImageUrl !== null && user.userImageUrl !== 'http://localhost:3000/images/profile/profile.jpeg') {
        const filename = user.userImageUrl.split('/images/profile/')[1];
        fs.unlink(`images/profile/${filename}`, () => {
        });
    }

    await Users.destroy({ where: { id: id }});
    res.status(200).json({ message:'Account is deleted !' });
}
