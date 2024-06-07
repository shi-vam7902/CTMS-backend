const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const verifyJwt = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log("accessToken:",token);
    if (!token) {
      res.status(400).json({message:"Unauthorized access request"});
    }

    let decoded;
    try {
      decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        res.status(400).json({message:"Access token has expired"});
      } else {
        res.status(400).json({message:"Invalid access token"});
      }
    }

    const user = await User.findById(decoded._id).select("-password");
    console.log("verify user:", user);
    if (!user) {
      res.status(400).json({message:"Invalid access token"});
    }

    req.user = user;
    console.log("user",user);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyJwt };
