const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

const path = require('path');
const bodyParser = require('body-parser');
// const mongoDb = require('./database/db')
// const createError = require('http-errors');

const {authRouter}  = require('./controllers/authController');
const {authMiddleware} = require('./middlewares/authMiddleware');

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))

// app.use(function(req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// })

app.use('/api/auth', authRouter);
app.use(authMiddleware);

app.get('/api/user/profile', (req, res) => {
  const user = req.user;
  if (user){
    res.status(200).json(user)
  } else {
    res.status(500).json({message: 'Server error'})
  }
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// app.use((req, res, next) => {
//   next(createError(404));
// });

// app.get('/', (req, res) => {
//   res.send('invaild endpoint');
// });
//
//
// // error handler
// app.use(function (err, req, res, next) {
//   console.error(err.message);
//   if (!err.statusCode) err.statusCode = 500;
//   res.status(err.statusCode).send(err.message);
// });

const start = async () => {
  try{
    await mongoose.connect('mongodb+srv://root:root@cluster0.vxkm7.mongodb.net/test?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    app.listen(8080, () => {
      console.log('Listening on port 8000');
    });
  }catch (err){
    console.error(`Error on server startup: ${err.message}`);
  }
}
// await mongoose.connection.close();

start();

