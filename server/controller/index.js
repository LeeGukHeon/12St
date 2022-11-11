const db = require("../db/db2");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const login = (req, res, next) => {
  const { userID, userPW } = req.body;

  const userInfo = db.filter((item) => {
    return item.id === userID;
  })[0];

  if (!userInfo) {
    res.status(403).json("Not Authorized");
  } else {
    try {
      // access Token 발급
      const accessToken = jwt.sign(
        {
          id: userInfo.id,
          username: userInfo.username,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1m",
          issuer: "About Tech",
        }
      );

      // refresh Token 발급
      const refreshToken = jwt.sign(
        {
          id: userInfo.id,
          username: userInfo.username,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "24h",
          issuer: "About Tech",
        }
      );

      // token 전송
      res.cookie("accessToken", accessToken, {
        secure: false,
        httpOnly: true,
      });

      res.cookie("refreshToken", refreshToken, {
        secure: false,
        httpOnly: true,
      });

      res.status(200).json("login success");
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

const accessToken = (req, res) => {};

const refreshToken = (req, res) => {};

const loginSuccess = (req, res) => {};

const logout = (req, res) => {};

module.exports = {
  login,
  accessToken,
  refreshToken,
  loginSuccess,
  logout,
};
