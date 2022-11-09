import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import SectionUserInfoInput from "./SectionUserInfoInput";
import RegistSection from "./RegistSection";
import Clause from "./Clause";

import kakao from "../../../assets/icons/kakaoLogin.png";
import naver from "../../../assets/icons/naverLogin.png";
import google from "../../../assets/icons/googleLogin.png";
import apple from "../../../assets/icons/appleLogin.png";

import classes from "./Regist.module.css";

const Regist = () => {
  const [formIsValid, setFormIsValid] = useState();
  const [userInfo, setUserInfo] = useState();

  const navigate = useNavigate();

  const handleformIsValid = (isValid) => {
    setFormIsValid(isValid);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // formIsValid가 true이면 입력 유효성 중 최소 하나는 false
    if (formIsValid) {
      console.log("fail");
      return;
    }

    console.log("success");
  };

  return (
    <form className={classes.regist} onSubmit={handleSubmit}>
      <header className={classes["regist-header"]}>
        <h2>회원가입</h2>
      </header>

      <section className={classes["regist-simple"]}>
        <h3>간편하게 회원가입하기</h3>

        <div className={classes["regist-simple-items"]}>
          <div>
            <img src={kakao} alt="kakao 간편가입" />
          </div>
          <div>
            <img src={naver} alt="naver 간편가입" />
          </div>
          <div>
            <img src={google} alt="google 간편가입" />
          </div>
          <div>
            <img src={apple} alt="apple 간편가입" />
          </div>
        </div>
      </section>

      <RegistSection title={"1 정보입력"}>
        <SectionUserInfoInput onFormIsValid={handleformIsValid} />
      </RegistSection>
      <RegistSection title="2 약관동의">
        <Clause />
      </RegistSection>
      <div className={classes["regist-control"]}>
        <button
          className={classes["regist-control-cencel"]}
          onClick={() => navigate("/")}
        >
          취소
        </button>
        <button type="submit" className={classes["regist-control-regist"]}>
          회원가입
        </button>
      </div>
    </form>
  );
};

export default Regist;
