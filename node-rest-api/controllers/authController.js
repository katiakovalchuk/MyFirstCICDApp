const express = require('express');
const router = express.Router();
const {signIn} = require('../services/authService');

router.post('/signin', async (req, res) => {
  try{
    const {email, password} = req.body;
    const token = await signIn({email, password});
    res.json({token, message: 'Logged in successfully!'})
  }catch (err){
    if (err){
      res.status(500).json({message: err.message});
    }
  }
})

module.exports = {
  authRouter: router
}
