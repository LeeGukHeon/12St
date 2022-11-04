import React from "react";

import Input from "../UI/Input";

import classes from "./Regist.module.css";

const Regist = () => {
  return (
    <form className={classes.regist}>
      <div className={classes["regist-input"]}>
        {/* <div className={classes["regist-input-label"]}> */}
        <label htmlFor="id">아이디</label>
        {/* </div> */}
        <Input id="id" />
      </div>
      <div className={classes["regist-input"]}>
        <label htmlFor="passwd">비밀번호</label>

        <Input id="passwd" />
      </div>
      <div className={classes["regist-input"]}>
        <label htmlFor="rePasswd">비빌번호 확인</label>

        <Input id="rePasswd" />
      </div>
      <div className={classes["regist-input"]}>
        <label htmlFor="name">이름</label>

        <Input id="name" />
      </div>
      <div className={classes["regist-input"]}>
        <label htmlFor="birth">생년월일</label>

        <Input id="birth" />
      </div>

      <div className={classes["regist-input"]}>
        <label htmlFor="gender">성별</label>

        <div className={`${classes["regist-input-gender"]}`}>
          <Input type="radio" value="남자" />
          <span> 남자</span>
          <Input type="radio" value="여자" />
          <span> 여자</span>
        </div>
      </div>

      <div className={classes["regist-input"]}>
        <label htmlFor="phone">휴대전화</label>

        <div className={`${classes["regist-input-phone"]}`}>
          <select>
            <option>010</option>
            <option>011</option>
            <option>012</option>
          </select>
          <Input id="phone" />
        </div>
      </div>

      <div></div>
    </form>
  );
};

export default Regist;
