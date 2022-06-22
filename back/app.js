const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());

app.use(cors());

app.use('/images', express.static('./images'));
  
const db = require('./models');

// ROUTERS
const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);

const userRouter = require('./routes/Users');
app.use('/auth', userRouter);

const likesRouter = require('./routes/Likes');
app.use('/like', likesRouter);

db.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
})
