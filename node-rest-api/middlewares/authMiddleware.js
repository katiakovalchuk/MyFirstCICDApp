const jwt = require('jsonwebtoken');
const key = process.env.secret_key + '';

const authMiddleware = (req, res, next) => {
  const {
    authorization
  } = req.headers;

  if (!authorization){
    return res.status(401).json({message: 'Please provide "authorization" header'})
  }

  const [, token] = authorization.split(' ');

  if (!token){
    return res.status(401).json({message: 'Please include token to request'});
  }

  try{
    const tokenPayload = jwt.verify(token, key);
    req.user = {
      userId: tokenPayload._id,
      email: tokenPayload.email
    }
    next();
  }catch (err){
    res.status(401).json({message: 'Invalid token'})
  }
}

module.exports = {
  authMiddleware
}
