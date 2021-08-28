const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

const jwt = require('jsonwebtoken');
const path = require('path');
const bodyParser = require('body-parser');

const {authRouter}  = require('./controllers/authController');
const {authMiddleware} = require('./middlewares/authMiddleware');
const {User} = require('./models/userModel');
const {Game} = require('./models/gameModel');

app.use(express.json());
app.use(morgan('tiny'));

const corsOptions = {
  origin: 'http://localhost:8000',
  credentials: true
}
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/api/auth', authRouter);

app.get('/api/games', async (req, res) => {
  try {
    const games = await Game.find({});
    res.status(200).json(games);
  } catch (err){
    res.status(500).json({message: err.message});
  }
})

app.use(authMiddleware);

app.get('/api/user/profile', async (req, res) => {
  try {
    req.user ?
      res.status(200).json(req.user) :
      res.status(404).json({message: 'User not found'});
  } catch (err){
    res.status(500).json({message: err.message});
  }
})

app.put('/api/updateUserProfile',  async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { _id } = jwt.decode(token);
    const { userName, age } = req.query;
    await User.updateOne({_id}, {$set: {userName, age}});
    res.status(200).json({message: 'User data has been updated successfully!'});
  }catch (err){
    res.status(500).json({message: err.message});
  }
})

app.get('/api/user/getFriends', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { _id } = jwt.decode(token);
    const { friends } = await User.findOne({_id});
    res.status(200).json(friends);
  }catch (err){
    res.status(500).json({message: err.message});
  }
});

app.get('/api/user/searchFriends', async (req, res) => {
  try {
    const searchedFriends = await User.find({}).select('userName');
    res.status(200).json(searchedFriends);
  }catch (err){
    res.status(500).json({message: err.message});
  }
});

app.get('/api/userGames', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { _id } = jwt.decode(token);
    const { games } = await User.findOne({_id});
    res.status(200).json(games);
  } catch (err){
    res.status(500).json({message: err.message});
  }
})


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const start = async () => {
  try{
    await mongoose.connect('mongodb+srv://root:root@cluster0.vxkm7.mongodb.net/test?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    app.listen(8080, () => {
      console.log('Listening on port 8080');
    });
  }catch (err){
    console.error(`Error on server startup: ${err.message}`);
  }
}

start();

