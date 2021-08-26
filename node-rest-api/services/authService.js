const {User} = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config;
const key = process.env.secret_key + '';

const signIn = async ({email, password}) => {
  const user = await User.findOne({email});

  if (!user){
    throw new Error('No user found');
  }

  // if (!(await bcrypt.compare(password, user.password))){
  //   throw new Error('Invalid password');
  // }

  if (password !== user.password){
    throw new Error('Invalid password');
  }

  const token = jwt.sign({
    _id: user._id,
    email: user.email
  }, key)

  return token;
}

module.exports = {
  signIn
}
