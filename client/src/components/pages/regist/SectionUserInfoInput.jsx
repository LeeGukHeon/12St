import React, { useState } from "react";

import UserInfoInput from "./UserInfoInput";
import ModalConfirmation from "./ModalConfirmation";
import useUserInput from "../../../hooks/use-userInput";

import classes from "./SectionUserInfoInput.module.css";

// 유효성 검사 로직
const checkId = (value) =>
  value.trim().length >= 5 && value.trim().length <= 20;

const checkPasswd = (value) => value.trim().length >= 8;

const checkPhone = (value) => value.trim().length >= 8;

const checkEmail = (value) => value.trim().length > 0;

const SectionUserInfoInput = (props) => {
  const [isShown, setIsShow] = useState(false);

  // 커스텀 훅
  const {
    value: enteredId,
    isValid: enteredIdIsValid,
    hasError: idHasError,
    HandleValueChange: handleIdChange,
    HandleInputBlur: handleIdBlur,
    reset: resetIdInput,
  } = useUserInput(checkId);

  const {
    value: enteredPasswd,
    isValid: enteredPasswdIsValid,
    hasError: passwdHasError,
    HandleValueChange: handlePasswdChange,
    HandleInputBlur: handlePasswdBlur,
    reset: resetPasswd,
  } = useUserInput(checkPasswd);

  const {
    value: enteredRePasswd,
    isValid: enteredRePasswdIsValid,
    hasError: rePasswdHasError,
    HandleValueChange: handleRePasswdChange,
    HandleInputBlur: handleRePasswdBlur,
    reset: resetRePasswd,
  } = useUserInput((value) => value.trim() === enteredPasswd);

  const {
    value: enteredPhone,
    isValid: enteredPhoneIsValid,
    hasError: phoneHasError,
    HandleValueChange: handlePhoneChange,
    HandleInputBlur: handlePhoneBlur,
    reset: resetPhone,
  } = useUserInput(checkPhone);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    HandleValueChange: handleEmailChange,
    HandleInputBlur: handleEmailBlur,
    reset: resetEmail,
  } = useUserInput(checkEmail);

  // hasError에 따른 className 변경
  const nameInputClasses = idHasError ? classes.hasError : "";
  const passwdInputClasses = passwdHasError ? classes.hasError : "";
  const rePasswdInputClasses = rePasswdHasError ? classes.hasError : "";
  const phoneInputClasses = phoneHasError
    ? `${classes["sectionUserInfoInput-phone"]} ${classes.hasError}`
    : classes["sectionUserInfoInput-phone"];
  const emailInputClasses = emailHasError
    ? `${classes["sectionUserInfoInput-email"]} ${classes.hasError}`
    : "";

  // form에 전체 입력 유효성 전달
  props.onFormIsValid(
    !enteredIdIsValid ||
      !enteredPasswdIsValid ||
      !enteredRePasswdIsValid ||
      !enteredPhoneIsValid ||
      !enteredEmailIsValid
  );

  return (
    <div className={classes["sectionUserInfoInput"]}>
      {isShown && <ModalConfirmation onClose={() => setIsShow(!isShown)} />}

      <UserInfoInput
        id="id"
        type="text"
        text="아이디"
        className={nameInputClasses}
        value={enteredId}
        onChange={handleIdChange}
        onBlur={handleIdBlur}
      />
      {idHasError && (
        <p className={classes["sectionUserInfoInput-error-text"]}>
          5~20자의 영문 소문자, 숫자와 특수기호(_), (-)만 사용 가능합니다.
        </p>
      )}

      <UserInfoInput
        id="passwd"
        type="password"
        text="비밀번호"
        className={passwdInputClasses}
        value={enteredPasswd}
        onChange={handlePasswdChange}
        onBlur={handlePasswdBlur}
      />
      {passwdHasError && (
        <p className={classes["sectionUserInfoInput-error-text"]}>
          영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
        </p>
      )}

      <UserInfoInput
        id="RePasswd"
        type="password"
        className={rePasswdInputClasses}
        text="비밀번호 재입력"
        value={enteredRePasswd}
        onChange={handleRePasswdChange}
        onBlur={handleRePasswdBlur}
      />
      {rePasswdHasError && (
        <p className={classes["sectionUserInfoInput-error-text"]}>
          비밀번호가 일치하지 않습니다.
        </p>
      )}

      <div className={classes["sectionUserInfoInput-input"]}>
        <UserInfoInput
          className={phoneInputClasses}
          id="phone"
          type="text"
          text="전화번호"
          value={enteredPhone}
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
        >
          <div>010</div>
          <span>-</span>
          <button
            className={classes["sectionUserInfoInput-confirmation"]}
            onClick={() => setIsShow(!isShown)}
          >
            인증확인
          </button>
        </UserInfoInput>
      </div>
      {phoneHasError && (
        <p className={classes["sectionUserInfoInput-error-text"]}>
          유효하지 않은 전화번호 입력입니다.
        </p>
      )}

      <div>
        <div
          className={`${classes["sectionUserInfoInput-input"]} ${classes["sectionUserInfoInput-zipcode-wrap"]}`}
        >
          <UserInfoInput
            className={classes["sectionUserInfoInput-zipcode"]}
            type="text"
            text="주소"
            id="zipcode"
          >
            <button className={classes["regist-btn-searchAdress"]}>
              주소 찾기
            </button>
          </UserInfoInput>
        </div>

        <div className={classes["sectionUserInfoInput-address"]}>
          <input type="text" />
          <input type="text" />
        </div>
      </div>

      <div className={classes["sectionUserInfoInput-input"]}>
        <UserInfoInput
          className={emailInputClasses}
          type="text"
          text="이메일"
          value={enteredEmail}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
        >
          <div className={classes["sectionUserInfoInput-email-adress"]}>
            <span>@</span>
            <div className={classes["email-adress"]}>example.com</div>
          </div>
        </UserInfoInput>
        {emailHasError && (
          <p className={classes["sectionUserInfoInput-error-text"]}>
            이메일을 입력해주세요.
          </p>
        )}
      </div>
    </div>
  );
};

export default SectionUserInfoInput;
