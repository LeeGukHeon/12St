import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import UserInfoInput from "./UserInfoInput";
import ModalConfirmation from "./ModalConfirmation";
import useUserInput from "../../../hooks/use-userInput";
import RegistSection from "./RegistSection";
import AddressModal from "../../layout/AddressModal";

import RegistClause from "./RegistClause";

import classes from "./RegistUserInfoInput.module.css";

// 이메일 배열
const email = [
  "naver.com",
  "hanmail.net",
  "daum.net",
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
];

const RegistUserInfoInput = () => {
  // 본인 인증 모달 State
  const [isShown, setIsShow] = useState(false);

  // 주소 검색 모달 State
  const [showAddr, setShowAddr] = useState(false);

  // 아이디 중복체크 State
  const [isDuplication, setIsDuplication] = useState(false);

  // 이메일 State
  const [isNoneSelectEmail, setIsNoneSelectEmail] = useState(false);
  const [isShownEmail, setIsShownEmail] = useState(false);

  // 약관 체크 State
  const [checkedItems, setCheckedItems] = useState([]);

  const navigate = useNavigate();

  // 커스텀 훅
  const {
    value,
    isValid,
    hasError,
    handleValueChange,
    handleInputBlur,
    reset,
  } = useUserInput();

  // 사용자 입력값 State
  const {
    enteredId,
    enteredName,
    enteredPasswd,
    enteredRePasswd,
    enteredEmail,
    enteredAdditionalEmail,
    enteredPhone,
    enteredZipcode,
    enteredAddress,
    enteredAdditionalAddress,
    enteredBirth,
  } = value;

  // 사용자 입력값 유효성 State (true : 유효)
  const {
    idIsValid,
    nameIsValid,
    passwdIsValid,
    rePasswdIsValid,
    emailIsValid,
    additionalEmailIsValid,
    phoneIsValid,
    additionalAddressIsValid,
    birthIsValid,
  } = isValid;

  // 사용자에게 피드백 전달 여부 (true : 피드백 전달 - 사용자 입력 유효하지 않고 input 태그 터치)
  const {
    idHasError,
    nameHasError,
    passwdHasError,
    rePasswdHasError,
    emailHasError,
    phoneHasError,
    additionalAddressHasError,
    birthHasError,
  } = hasError;

  // 사용자 입력값 State 변경 (setState - 내부에 e.target.value 포함되어있어서 함수명만 사용하면됨)
  const {
    handleIdChange,
    handleNameChange,
    handlePasswdChange,
    handleRePasswdChange,
    handleEmailChange,
    handleAdditionalEmailChange,
    handlePhoneChange,
    handleZipcodeChange,
    handleAddressChange,
    handleAdditionalAddrChange,
    handleBirthChange,
  } = handleValueChange;

  // onBlur prop에 전달할 함수
  const {
    handleIdBlur,
    handleNameBlur,
    handlePasswdBlur,
    handleRePasswdBlur,
    handleEmailBlur,
    handleAdditionalEmailBlur,
    handlePhoneBlur,
    handleAdditionalAddressBlur,
    handleBirthBlur,
  } = handleInputBlur;

  // hasError에 따른 className 변경
  const idInputClasses = idHasError
    ? `${classes["sectionUserInfoInput-id"]} ${classes.hasError}`
    : classes["sectionUserInfoInput-id"];

  const nameInputClasses = nameHasError ? classes.hasError : "";

  const passwdInputClasses = passwdHasError ? classes.hasError : "";

  const rePasswdInputClasses = rePasswdHasError ? classes.hasError : "";

  const birthInputClasses = birthHasError ? classes.hasError : "";

  const phoneInputClasses = phoneHasError
    ? `${classes["sectionUserInfoInput-phone"]} ${classes.hasError}`
    : classes["sectionUserInfoInput-phone"];

  const additionalAddressClasses = additionalAddressHasError
    ? classes["additionalAddr-hasError"]
    : "";

  const emailInputClasses = emailHasError
    ? `${classes["sectionUserInfoInput-email"]} ${classes.hasError}`
    : classes["sectionUserInfoInput-email"];

  // registIsValid가 false이면 입력 유효성 중 하나는 false
  let registIsValid =
    isDuplication &&
    idIsValid &&
    nameIsValid &&
    passwdIsValid &&
    rePasswdIsValid &&
    emailIsValid &&
    additionalEmailIsValid &&
    phoneIsValid &&
    additionalAddressIsValid &&
    birthIsValid &&
    checkedItems.length === 2;

  const handleRegist = async () => {
    console.log(`uId: ${enteredId},
      uName: ${enteredName},
      uPasswd: ${enteredPasswd},
      uEamil: ${enteredEmail}@${enteredAdditionalEmail},
      uPhone: ${enteredPhone},
      uZipcode: ${enteredZipcode},
      uAddress: ${enteredAddress} ${enteredAdditionalAddress},
      uBirth: ${enteredBirth}`);

    // 나중에 본인인증도 추가하기
    if (!isDuplication) {
      window.alert("아이디 중복 검사를 해주세요.");
      return;
    }

    if (!registIsValid) {
      return console.log("fail");
    }

    // 서버 전송
    await axios
      .post("http://localhost:5000/regist", {
        uId: enteredId,
        uName: enteredName,
        uPasswd: enteredPasswd,
        uEamil: `${enteredEmail}@${enteredAdditionalEmail}`,
        uPhone: enteredPhone,
        uZipcode: enteredZipcode,
        uAddress: `${enteredAddress} ${enteredAdditionalAddress}`,
        uBirth: enteredBirth,
      })
      .then((response) => {
        if (response.data.status === "200") {
          window.alert("회원가입을 축하드립니다.");

          reset();

          navigate("/");
        } else if (response.data.status === "400") {
          window.alert("관리자에게 문의 부탁드립니다.");
        }
      });
  };

  const handleAdditionalEmail = (selected) => {
    setIsNoneSelectEmail(false);
    handleAdditionalEmailChange(selected);
    setIsShownEmail(false);
  };

  const handleDuplication = async () => {
    // 사용자 입력값의 유효성이 true일 때 중복검사 가능
    if (idIsValid) {
      await axios
        .post("http://localhost:5000/duplication", { uId: enteredId })
        .then((response) => {
          if (response.data.status === 409) {
            window.alert(response.data.message);
          } else if (response.data.status === 200) {
            setIsDuplication(true);
            window.alert(response.data.message);
          }
        });
    } else {
      window.alert("유효한 아이디를 입력해주세요");
    }
  };

  const handleAddressClose = () => {
    setShowAddr(false);
  };

  return (
    <Fragment>
      <RegistSection title={"1 정보입력"}>
        <div className={classes["sectionUserInfoInput"]}>
          {isShown && <ModalConfirmation onClose={() => setIsShow(!isShown)} />}

          <div className={classes["sectionUserInfoInput-input"]}>
            <UserInfoInput
              id="id"
              type="text"
              text="아이디"
              value={enteredId}
              className={idInputClasses}
              onChange={handleIdChange}
              onBlur={handleIdBlur}
            >
              <button
                className={classes["sectionUserInfoInput-duplication"]}
                onClick={handleDuplication}
              >
                중복검사
              </button>
            </UserInfoInput>
          </div>
          <div className={classes["sectionUserInfoInput-feedback"]}>
            {idHasError && (
              <p className={classes["sectionUserInfoInput-error"]}>
                5~20자의 영문 소문자, 숫자와 특수기호(_), (-)만 사용 가능합니다.
              </p>
            )}
          </div>

          <UserInfoInput
            id="name"
            type="text"
            text="이름"
            className={nameInputClasses}
            value={enteredName}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
          />
          <div className={classes["sectionUserInfoInput-feedback"]}>
            {nameHasError && (
              <p className={classes["sectionUserInfoInput-error"]}>
                유효한 형식이 아닙니다.
              </p>
            )}
          </div>

          <UserInfoInput
            id="passwd"
            type="password"
            text="비밀번호"
            className={passwdInputClasses}
            value={enteredPasswd}
            onChange={handlePasswdChange}
            onBlur={handlePasswdBlur}
          />
          <div className={classes["sectionUserInfoInput-feedback"]}>
            {passwdHasError && (
              <p className={classes["sectionUserInfoInput-error"]}>
                영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를
                입력해주세요.
              </p>
            )}
          </div>

          <UserInfoInput
            id="RePasswd"
            type="password"
            className={rePasswdInputClasses}
            text="비밀번호 재입력"
            value={enteredRePasswd}
            onChange={handleRePasswdChange}
            onBlur={handleRePasswdBlur}
          />
          <div className={classes["sectionUserInfoInput-feedback"]}>
            {rePasswdHasError && (
              <p className={classes["sectionUserInfoInput-error"]}>
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>

          <UserInfoInput
            id="birth"
            type="text"
            text="생년월일"
            className={birthInputClasses}
            value={enteredBirth}
            onChange={handleBirthChange}
            onBlur={handleBirthBlur}
          />
          <div className={classes["sectionUserInfoInput-feedback"]}>
            {birthHasError && (
              <p className={classes["sectionUserInfoInput-error"]}>
                6자리의 생년월일을 입력해주세요.
              </p>
            )}
          </div>

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
              <button
                className={classes["sectionUserInfoInput-confirmation"]}
                onClick={() => setIsShow(!isShown)}
              >
                인증확인
              </button>
            </UserInfoInput>
          </div>
          <div className={classes["sectionUserInfoInput-feedback"]}>
            {phoneHasError && (
              <p className={classes["sectionUserInfoInput-error"]}>
                유효하지 않은 전화번호 입력입니다.
              </p>
            )}
          </div>
          <div>
            <div className={classes["sectionUserInfoInput-zipcode-wrap"]}>
              <UserInfoInput
                className={classes["sectionUserInfoInput-zipcode"]}
                type="text"
                text="주소"
                id="zipcode"
                value={enteredZipcode}
                readOnly={true}
              >
                <button
                  className={classes["regist-btn-searchAdress"]}
                  onClick={() => setShowAddr(true)}
                >
                  주소 찾기
                </button>
              </UserInfoInput>
            </div>
            {showAddr && (
              <AddressModal
                onClose={handleAddressClose}
                setInputZipCode={handleZipcodeChange}
                setInputAddr={handleAddressChange}
              />
            )}

            <div className={classes["sectionUserInfoInput-address"]}>
              <input
                type="text"
                readOnly
                value={enteredAddress}
                style={{ cursor: "default" }}
              />

              <input
                type="text"
                className={additionalAddressClasses}
                onChange={handleAdditionalAddrChange}
                value={enteredAdditionalAddress}
                onBlur={handleAdditionalAddressBlur}
              />
            </div>
          </div>
          <div className={classes["sectionUserInfoInput-feedback"]}>
            {additionalAddressHasError && (
              <p className={classes["sectionUserInfoInput-error"]}>
                정확한 배송을 위해 추가 정보를 입력해주세요.
              </p>
            )}
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
                <div className={classes["sectionUserInfoInput-control"]}>
                  {isNoneSelectEmail && (
                    <div
                      className={
                        classes["sectionUserInfoInput-control-noneSelected"]
                      }
                    >
                      <input
                        onChange={(event) =>
                          handleAdditionalEmailChange(event.target.value)
                        }
                        className={
                          classes[
                            "sectionUserInfoInput-control-noneSelected__input"
                          ]
                        }
                        onBlur={handleAdditionalEmailBlur}
                      />
                      <button
                        onClick={() => setIsNoneSelectEmail((prev) => !prev)}
                      >
                        X
                      </button>
                    </div>
                  )}

                  {!isNoneSelectEmail && (
                    <Fragment>
                      <div
                        className={
                          classes["sectionUserInfoInput-control-selected"]
                        }
                        onClick={() => setIsShownEmail(true)}
                      >
                        {enteredAdditionalEmail
                          ? enteredAdditionalEmail
                          : "선택해주세요"}
                      </div>
                      {isShownEmail && (
                        <ul
                          className={
                            classes["sectionUserInfoInpu-control-items"]
                          }
                        >
                          <li>
                            <button
                              className={
                                classes[
                                  "sectionUserInfoInpu-control-items__none"
                                ]
                              }
                            >
                              선택해주세요
                            </button>
                          </li>

                          {email.map((it, idx) => (
                            <li key={idx}>
                              <button onClick={() => handleAdditionalEmail(it)}>
                                {it}
                              </button>
                            </li>
                          ))}

                          <li>
                            <button onClick={() => setIsNoneSelectEmail(true)}>
                              직접입력
                            </button>
                          </li>
                        </ul>
                      )}
                    </Fragment>
                  )}
                </div>
              </div>
            </UserInfoInput>
            <div className={classes["sectionUserInfoInput-feedback"]}>
              {emailHasError && (
                <p className={classes["sectionUserInfoInput-error"]}>
                  이메일을 입력해주세요.
                </p>
              )}

              {emailHasError && !additionalEmailIsValid && (
                <p className={classes["sectionUserInfoInput-error"]}>
                  이메일 주소를 선택하거나 직접 입력해주세요.
                </p>
              )}
            </div>
          </div>
        </div>
      </RegistSection>

      <RegistClause
        checkedItems={checkedItems}
        onCheckedItems={setCheckedItems}
      />

      <div className={classes["regist-control"]}>
        <button
          className={classes["regist-control-cencel"]}
          onClick={() => navigate("/")}
        >
          취소
        </button>
        <button
          className={classes["regist-control-regist"]}
          onClick={handleRegist}
        >
          회원가입
        </button>
      </div>
    </Fragment>
  );
};

export default RegistUserInfoInput;
