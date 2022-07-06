const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());

app.use('/images/post', express.static('./images/post'));
app.use('/images/profile', express.static('./images/profile'));

app.use(express.json());

const db = require('./models');

// ROUTERS
const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);

const userRouter = require('./routes/Users');
app.use('/auth', userRouter);

const likesRouter = require('./routes/Likes');
app.use('/like', likesRouter);

//{ alter: true } pour actualiser la base de donnée si le modèle change

db.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
})
