import React, { useState, useRef, useEffect } from "react";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import iconGoogle from "../../../assets/icons/googleLogin.png";
import iconNaver from "../../../assets/icons/naverLogin.png";
import iconKakao from "../../../assets/icons/kakaoLogin.png";
import iconApple from "../../../assets/icons/appleLogin.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const Login = () => {
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");
  const [showPW, setShowPW] = useState(false);
  const pwTab = useRef();

  const onClickShowPW = () => {
    setShowPW(!showPW);
  };
  const onSubmitLogin = (e) => {
    e.preventDefault();
    /*
        axios.post로 로그인 요청 보내기
        백단에서 받아서 회원DB에서 해당 아이디 조회
        있으면 메시지 로그인성공 보내면서 redirect main
        없으면 alert redirect login
        */
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
              onChange={(e) => setUserID(e.target.value)}
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
