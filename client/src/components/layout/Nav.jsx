import React, { useEffect } from "react";
import axios from "axios";
import classes from "./Nav.module.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { getUserName, handleLogout } from "../../util/authCheck";
import { getUser } from "../../util/getUser";
const Nav = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const isLogin = async () => {
      await axios
        .get("http://localhost:5000/login/api/login/success", {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data === "timeout") {
            handleLogout();
          } else if (response.data === "noInfo") {
            setIsLogin(false);
          } else if (response.data === "login") {
            setIsLogin(true);
          }
        });
    };

    getUser(setUser);
    isLogin();
  }, []);
  if (location.pathname === "/admin") {
    return null;
  }
  return (
    <React.Fragment>
      <nav className={classes.nav}>
        <div className={classes["nav-category"]}>
          <Link to={"/productsBest"}>베스트</Link>
          <span> | </span>
          <a href={"/categories?type=life"}>생활/건강</a>
          <a href={"/categories?type=digital"}>디지털/가전</a>
          <a href={"/categories?type=fashionaccessories"}>패션잡화</a>
          <a href={"/categories?type=furniture"}>가구/인테리어</a>
          <a href={"/categories?type=maternity"}>출산/육아</a>
          <a href={"/categories?type=fashionclothes"}>패션의류</a>
          <a href={"/categories?type=foods"}>식품</a>
          <a href={"/categories?type=sportsleisure"}>스포츠/레저</a>
        </div>

        <div>
          {isLogin === false ? (
            <div className={classes["nav-nonLogin"]}>
              <Link to={"/login"}>로그인</Link>
              <Link to={"/regist"}>회원가입</Link>
            </div>
          ) : (
            <div className={classes["nav-Login"]}>
              {user.uAuth === 2 && (
                <span>
                  <Link to="/admin" state={{ user: user }}>
                    관리자페이지
                  </Link>
                </span>
              )}
              <span>
                🐣 <Link to="/mypage">{user.uName}</Link> 님
              </span>
              <span> | </span>
              <span>🌱 {user.uMile}</span>
              <span> | </span>
              <button className={classes["nav-onOff"]}>
                <button onClick={handleLogout}>로그아웃</button>
              </button>
            </div>
          )}
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Nav;
