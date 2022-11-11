import React, { useState, useRef, useEffect } from "react";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import iconGoogle from "../../../assets/icons/googleLogin.png";
import iconNaver from "../../../assets/icons/naverLogin.png";
import iconKakao from "../../../assets/icons/kakaoLogin.png";
import iconApple from "../../../assets/icons/appleLogin.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const Login = () => {
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");
  const [showPW, setShowPW] = useState(false);
  const pwTab = useRef();

  const onClickShowPW = () => {
    setShowPW(!showPW);
  };
  // const onSubmitLogin = async (e) => {
  //   e.preventDefault();
  //   await axios
  //     .post("http://localhost:5000/login", { userID, userPW })
  //     .then((response) => {
  //       if (response.data.status === 200) {
  //         window.alert(response.data.message);

  //         // localStorage.setItem("id", response.data.id);
  //         // localStorage.setItem("pw", response.data.pw);
  //         // localStorage.setItem("name", response.data.name);
  //         // localStorage.setItem("email", response.data.email);
  //         // localStorage.setItem("phone", response.data.phone);
  //         // window.location = "/";
  //       } else if (response.data.status === 400) {
  //         window.alert(response.data.message);
  //         window.location = "/login";
  //       } else if (response.data.status === 404) {
  //         window.alert(response.data.message);
  //         window.location = "/regist";
  //       } else {
  //         window.alert("관리자에게 문의하세요.");
  //         window.location = "/";
  //       }
  //     });
  // };
  const onSubmitLogin = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:5000/login",
        { userID, userPW },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200) {
          navigate("/");
        } else if (response.status === 403) {
          console.log("err");
        }
      });
  };
  //useEffect로 비밀번호 보기 숨기기 결정
  useEffect(() => {
    const pwText = () => {
      if (!showPW) {
        pwTab.current.type = "password";
      } else {
        pwTab.current.type = "text";
      }
    };
    pwText();
  }, [showPW]);

  return (
    <React.Fragment>
      <header className={classes["regist-haader"]}>
        <h2>로그인</h2>
      </header>
      <form
        method="post"
        className={classes["form-login"]}
        onSubmit={onSubmitLogin}
      >
        <div className={classes["form-login-wrapper"]}>
          <div className={classes["form-login-input"]}>
            <input
              type={"text"}
              onChange={(e) => setUserID(e.target.value)}
              placeholder={"아이디를 입력해주세요"}
            />
          </div>
          <div className={classes["form-login-pw"]}>
            <input
              type={"password"}
              onChange={(e) => setUserPW(e.target.value)}
              placeholder={"비밀번호를 입력해주세요"}
              ref={pwTab}
            />
            {!showPW ? (
              <FaEyeSlash
                className={classes["form-login-pw-i"]}
                onClick={onClickShowPW}
              />
            ) : (
              <FaEye
                className={classes["form-login-pw-i"]}
                onClick={onClickShowPW}
              />
            )}
          </div>
          <div className={classes["form-login-handler"]}>
            <input
              type={"submit"}
              value={"로그인"}
              className={classes["form-login-submit"]}
            ></input>
          </div>
          <div className={classes["form-login-links"]}>
            <Link>아이디찾기</Link>
            <Link>비밀번호찾기</Link>
            <Link to={"/regist"}>회원가입</Link>
          </div>
          <Link className={classes["form-login-non"]}>
            <div>비회원 주문조회</div>
          </Link>
          <div className={classes["form-login-easy"]}>
            <img src={iconGoogle} alt="구글로그인이미지" />
            <img src={iconKakao} alt="카카오로그인이미지" />
            <img src={iconNaver} alt="네이버로그인이미지" />
            <img src={iconApple} alt="애플로그인이미지" />
          </div>
          <div className={classes["form-login-banner"]}>배너탭</div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Login;
