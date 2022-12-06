const express = require("express");
require("dotenv").config();
const db = require("../db/db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(
  cors({
    origin: true,
    credentials: true,
  })
);

router.post("/api/login", (req, res) => {
  let isUser = false;
  const { userID, userPW } = req.body;
  let sql = "SELECT * from users where uId = ?;";

  db.query(sql, [userID], (err, result) => {
    if (result.length === 0) {
      res.send("invalid");
    } else {
      db.query(sql, [userID], (err, rows) => {
        const userData = rows[0];
        if (err) {
          console.log(err);
        } else {
          bcrypt.compare(userPW, userData.uPasswd, (err, result) => {
            if (err) {
              throw err;
            } else if (result) {
              isUser = true;
              if (isUser) {
                if (userData.uAuth === 0) {
                  res.send("secession");
                } else {
                  const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY;
                  const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
                  //accessToken 발급
                  const accessToken = jwt.sign(
                    {
                      id: userData.uId,
                    },
                    ACCESS_SECRET_KEY,
                    {
                      expiresIn: "1m",
                      issuer: "12St",
                    }
                  );
                  //refreshToken 발급
                  const refreshToken = jwt.sign(
                    {
                      id: userData.uId,
                    },
                    REFRESH_SECRET_KEY,
                    {
                      expiresIn: "14d",
                      issuer: "12St",
                    }
                  );
                  res.cookie("accessToken", accessToken, { httpOnly: true });
                  res.cookie("refreshToken", refreshToken, { httpOnly: true });
                  res.status(201).json({
                    result: "ok",
                    accessToken,
                  });
                }
              } else {
                res.status(400).json({ error: "invalid user" });
              }
            } else {
              res.send("invalid");
            }
          });
        }
      });
    }
  });
});

//로그인 검증
router.get("/api/login/success", (req, res) => {
  const token = req.cookies.accessToken;
  const reftoken = req.cookies.refreshToken;

  //리프레시토큰 유효성검사, expired 되면 강제로그아웃
  if (reftoken !== undefined) {
    jwt.verify(reftoken, process.env.REFRESH_SECRET_KEY, (err) => {
      if (err) {
        res.send("timeout");
        // console.log("리프레시토큰만료");
      } else {
        return;
      }
    });
  }
  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err) => {
    // 토큰이 있을때 에러핸들링
    if (err) {
      // err = expired, 만료되었을때 리프레쉬
      const token = req.cookies.refreshToken;
      const data = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

      let sql = "SELECT * from users WHERE uId = ?;";
      db.query(sql, [data.id], (err, rows) => {
        if (err) {
          throw err;
        }
        //비밀번호 빼고 전달
        const { uPasswd, ...others } = rows[0];

        //accessToken 새로 발급
        const accessToken = jwt.sign(
          {
            id: others.uId,
          },
          process.env.ACCESS_SECRET_KEY,
          {
            expiresIn: "1m",
            issuer: "12St",
          }
        );

        res.cookie("accessToken", accessToken, { httpOnly: true });
        res.status(201).json({
          result: "ok",
        });
        // console.log("액세스토큰만료 재발급");
      });
    } else {
      res.send("login");
    }
  });
});
//로그아웃

router.get("/api/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json("Logout Success");
});
// 유저이름 가져오기
router.get("/api/login/getusername", (req, res) => {
  const token = req.cookies.accessToken;
  if (token !== undefined) {
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err) => {
      const token = req.cookies.refreshToken;
      const data = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

      let sql = "SELECT uName, uMile from users WHERE uId = ?;";
      db.query(sql, data.id, (err, user) => {
        if (err) {
          throw err;
        }

        res.send(user[0]);
      });
    });
  } else {
    return;
  }
});
// 쿠키 여부 체크
router.get("/api/login/cookiecheck", (req, res) => {
  const token = req.cookies.accessToken;
  if (token === undefined) {
    res.send("checkFail");
  } else {
    res.send("checkSuccess");
  }
});

module.exports = router;
