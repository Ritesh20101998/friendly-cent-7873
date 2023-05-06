const jwt = require('jsonwebtoken');
require("dotenv").config()
const {User} = require("../models/user.model")
const {blacklist} = require("../blacklist")

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    
    if(blacklist.includes(token)){
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken)
    const {userId} = decodedToken
    const user = await User.findOne({_id:userId})

    next();
  } catch (err) {
    return res.status(401).json({ msg :err.message});
  }
};

module.exports = {auth};
