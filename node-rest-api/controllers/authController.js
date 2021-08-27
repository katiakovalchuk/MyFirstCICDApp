const express = require('express');
const router = express.Router();
const {signIn} = require('../services/authService');

router.post('/signin', async (req, res) => {
  try{
    const {email, password} = req.body;
    const token = await signIn({email, password});
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Max-Age", "1800");
    // res.setHeader("Access-Control-Allow-Headers", "content-type");
    // res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
    res.json({token, email, message: 'Logged in successfully!'})
  }catch (err){
    if (err){
      res.status(500).json({message: err.message});
    }
  }
})

module.exports = {
  authRouter: router
}
