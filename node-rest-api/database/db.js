module.exports = {
  db: 'mongodb://localhost:27017/db'
};
// import mongoose from 'mongoose';
// const mongoose = require('mongoose');
// const express = require('express');
// const app = express();
//
// const start = async () => {
//   try{
//     await mongoose.connect('mongodb+srv://root:root@cluster0.vxkm7.mongodb.net/test', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//
//     app.listen(8080);
//   }catch (err){
//     console.error(`Error on server startup: ${err.message}`);
//   }
//   console.log('connected!!!!!!!!!!!!!!!!!!!!')
// }
// // await mongoose.connection.close();
//
// start();
