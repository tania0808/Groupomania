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
        const accessToken = sign({ id: userCreated.id, userName: user.userName }, "blueseduction");
        res.status(200).json({message : "User is created !!!", status: true, token: accessToken, user: userCreated})
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
     
         const accessToken = sign({ id: user.id, userName: user.userName }, "blueseduction");
     
         res.json({ message: 'YOU LOGGED IN !!!', status: true, token: accessToken})
    } 

};


exports.getUser = async (req, res) => {
    const id = req.auth.id;
    const user = await Users.findOne({ where: { id: id }});
    res.json(user);
}


exports.modifyUser = async (req, res) => {
    const id = req.auth.id;
    const userName = req.body.userName;
    const email = req.body.email;

    
    // await Users.upsert(({
    //     id: id,
    //     userName: userName,
    //     email: email
    // },
    // {include: [
    //     { model: Posts}
    // ]}))
    
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
}

// const result = await Users.update({
//     userName: userName,
//     email: email
//     }, 
//     {
//     where: { userId: user }
// });

// res.json(result)

// const user = await Users.findOne({ where: { userId: userId }});
//     if(req.auth.userId !== user.userId) {
//         res.json('Unauthorized request !');
//     } else {
//         const { userName, email} = req.body;
//         await Users.findOne({ where: { userId: userId }})
//         .then(user => {
//             const values = {
//                 userName: userName, 
//                 email: email
//             }
//             user.update(values).then(updatedUser => {
//                 console.log(updatedUser);
//                 res.json(updatedUser)
//             })
//         })
//         .catch(err => res.json(err))
//     }