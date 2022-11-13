import { useReducer } from "react";

// 유효성 검사 로직
const checkId = (value) =>
  value.trim().length >= 5 && value.trim().length <= 20;

const checkName = (value) => value.trim().length >= 2;

const checkPasswd = (value) => value.trim().length >= 8;

const checkEmail = (value) => value.trim().length >= 2;

const checkAdditionalEmail = (value) => value.trim().length >= 1;

const checkPhone = (value) => value.trim().length >= 11;

const checkAdditionalAddress = (value) => value.trim().length >= 1;

const checkBirth = (value) => value.trim().length === 6;

// 초기값 설정
const initialInputState = {
  value: {
    enteredId: "",
    enteredName: "",
    enteredPasswd: "",
    enteredRePasswd: "",
    enteredEmail: "",
    enteredAdditionalEmail: "",
    enteredPhone: "",
    enteredZipcode: "",
    enteredAddress: "",
    enteredAdditionalAddress: "",
    enteredBirth: "",
  },

  isTouched: {
    isTouchedId: false,
    isTouchedName: false,
    isTouchedPasswd: false,
    isTouchedRepasswd: false,
    isTouchedEmail: false,
    isTouchedAdditionalEmail: false,
    isTouchedPhone: false,
    isTouchedAdditionalAddress: false,
    isTouchedBirth: false,
  },
};

// reducer 함수 설정 (각 action에 대한 작업 설정)
const inputStateReducer = (state, action) => {
  switch (action.type) {
    // 사용자의 입력 발생 시
    case "INPUT_ID":
      return { ...state, value: { ...state.value, enteredId: action.value } };
    case "INPUT_NAME":
      return { ...state, value: { ...state.value, enteredName: action.value } };
    case "INPUT_PASSWD":
      return {
        ...state,
        value: { ...state.value, enteredPasswd: action.value },
      };
    case "INPUT_REPASSWD":
      return {
        ...state,
        value: { ...state.value, enteredRePasswd: action.value },
      };
    case "INPUT_EMAIL":
      return {
        ...state,
        value: { ...state.value, enteredEmail: action.value },
      };
    case "INPUT_ADDITIONAL_EMAIL":
      return {
        ...state,
        value: { ...state.value, enteredAdditionalEmail: action.value },
      };
    case "INPUT_PHONE":
      return {
        ...state,
        value: { ...state.value, enteredPhone: action.value },
      };
    case "INPUT_ZIPCODE":
      return {
        ...state,
        value: { ...state.value, enteredZipcode: action.value },
      };
    case "INPUT_ADDRESS":
      return {
        ...state,
        value: { ...state.value, enteredAddress: action.value },
      };
    case "INPUT_ADDITIONAL_ADDRESS":
      return {
        ...state,
        value: { ...state.value, enteredAdditionalAddress: action.value },
      };
    case "INPUT_BIRTH":
      return {
        ...state,
        value: { ...state.value, enteredBirth: action.value },
      };

    // 사용자의 input 요소 터치 시
    case "BLUR_ID":
      return { ...state, isTouched: { ...state.isTouched, isTouchedId: true } };
    case "BLUR_NAME":
      return {
        ...state,
        isTouched: { ...state.isTouched, isTouchedName: true },
      };
    case "BLUR_PASSWD":
      return {
        ...state,
        isTouched: { ...state.isTouched, isTouchedPasswd: true },
      };
    case "BLUR_REPASSWD":
      return {
        ...state,
        isTouched: { ...state.isTouched, isTouchedRepasswd: true },
      };
    case "BLUR_EMAIL":
      return {
        ...state,
        isTouched: { ...state.isTouched, isTouchedEmail: true },
      };
    case "BLUR_ADDITIONAL_EMAIL":
      return {
        ...state,
        isTouched: { ...state.isTouched, isTouchedAdditionalEmail: true },
      };
    case "BLUR_PHONE":
      return {
        ...state,
        isTouched: { ...state.isTouched, isTouchedPhone: true },
      };
    case "BLUR_ADDITIONAL_ADDRESS":
      return {
        ...state,
        isTouched: { ...state.isTouched, isTouchedAdditionalAddress: true },
      };
    case "BLUR_BIRTH":
      return {
        ...state,
        isTouched: { ...state.isTouched, isTouchedBirth: true },
      };

    // 입력값 reset
    case "RESET":
      return initialInputState;

    default:
      return inputStateReducer;
  }
};

// 커스텀 훅 설정 (인수로 유효성 검사 함수 전달받음)
const useUserInput = () => {
  const [inputState, dispatchInput] = useReducer(
    inputStateReducer,
    initialInputState
  );

  // 입력값 유효성 검사 (인수로 전달 받은 함수에 state 넣어서 유효성 검사 - 유효하면 true)
  // const idIsValid = checkId(inputState.value.enteredId);
  const idIsValid = checkId(inputState.value.enteredId);

  const nameIsValid = checkName(inputState.value.enteredName);

  const passwdIsValid = checkPasswd(inputState.value.enteredPasswd);

  const rePasswdIsValid =
    inputState.value.enteredRePasswd.trim() === inputState.value.enteredPasswd;

  const emailIsValid = checkEmail(inputState.value.enteredEmail);

  const additionalEmailIsValid = checkAdditionalEmail(
    inputState.value.enteredAdditionalEmail
  );

  const phoneIsValid = checkPhone(inputState.value.enteredPhone);

  const additionalAddressIsValid = checkAdditionalAddress(
    inputState.value.enteredAdditionalAddress
  );

  const birthIsValid = checkBirth(inputState.value.enteredBirth);

  // 유효하지 않은 입력에 대한 피드백 (hasError가 true이면 사용자에게 피드백)
  const idHasError = !idIsValid && inputState.isTouched.isTouchedId;

  const nameHasError = !nameIsValid && inputState.isTouched.isTouchedName;

  const passwdHasError = !passwdIsValid && inputState.isTouched.isTouchedPasswd;

  const rePasswdHasError =
    !rePasswdIsValid && inputState.isTouched.isTouchedRepasswd;

  const emailHasError = !emailIsValid && inputState.isTouched.isTouchedEmail;

  const additionalEmailHasError =
    !additionalEmailIsValid && inputState.isTouched.isTouchedAdditionalEmail;

  const phoneHasError = !phoneIsValid && inputState.isTouched.isTouchedPhone;

  const additionalAddressHasError =
    !additionalAddressIsValid &&
    inputState.isTouched.isTouchedAdditionalAddress;

  const birthHasError = !birthIsValid && inputState.isTouched.isTouchedBirth;

  // 사용자 입력 dispatch
  const handleIdChange = (event) => {
    dispatchInput({ type: "INPUT_ID", value: event.target.value });
  };
  const handleNameChange = (event) => {
    dispatchInput({ type: "INPUT_NAME", value: event.target.value });
  };
  const handlePasswdChange = (event) => {
    dispatchInput({ type: "INPUT_PASSWD", value: event.target.value });
  };
  const handleRePasswdChange = (event) => {
    dispatchInput({ type: "INPUT_REPASSWD", value: event.target.value });
  };
  const handleEmailChange = (event) => {
    dispatchInput({ type: "INPUT_EMAIL", value: event.target.value });
  };
  const handleAdditionalEmailChange = (value) => {
    dispatchInput({ type: "INPUT_ADDITIONAL_EMAIL", value: value });
  };
  const handlePhoneChange = (event) => {
    dispatchInput({ type: "INPUT_PHONE", value: event.target.value });
  };
  const handleZipcodeChange = (value) => {
    dispatchInput({ type: "INPUT_ZIPCODE", value: value });
  };
  const handleAddressChange = (value) => {
    dispatchInput({ type: "INPUT_ADDRESS", value: value });
  };
  const handleAdditionalAddrChange = (event) => {
    dispatchInput({
      type: "INPUT_ADDITIONAL_ADDRESS",
      value: event.target.value,
    });
  };
  const handleBirthChange = (event) => {
    dispatchInput({ type: "INPUT_BIRTH", value: event.target.value });
  };

  // input 요소 터치 dispatch
  const handleIdBlur = () => {
    dispatchInput({ type: "BLUR_ID" });
  };
  const handleNameBlur = () => {
    dispatchInput({ type: "BLUR_NAME" });
  };
  const handlePasswdBlur = () => {
    dispatchInput({ type: "BLUR_PASSWD" });
  };
  const handleRePasswdBlur = () => {
    dispatchInput({ type: "BLUR_REPASSWD" });
  };
  const handleEmailBlur = () => {
    dispatchInput({ type: "BLUR_EMAIL" });
  };
  const handleAdditionalEmailBlur = () => {
    dispatchInput({ type: "BLUR_ADDITIONAL_EMAIL" });
  };
  const handlePhoneBlur = () => {
    dispatchInput({ type: "BLUR_PHONE" });
  };
  const handleAdditionalAddressBlur = () => {
    dispatchInput({ type: "BLUR_ADDITIONAL_ADDRESS" });
  };
  const handleBirthBlur = () => {
    dispatchInput({ type: "BLUR_BIRTH" });
  };

  // reset dispatch
  const reset = () => {
    dispatchInput({ type: "RESET" });
  };

  return {
    value: inputState.value,

    isValid: {
      idIsValid,
      nameIsValid,
      passwdIsValid,
      rePasswdIsValid,
      emailIsValid,
      additionalEmailIsValid,
      phoneIsValid,
      additionalAddressIsValid,
      birthIsValid,
    },

    hasError: {
      idHasError,
      nameHasError,
      passwdHasError,
      rePasswdHasError,
      emailHasError,
      additionalEmailHasError,
      phoneHasError,
      additionalAddressHasError,
      birthHasError,
    },

    handleValueChange: {
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
    },

    handleInputBlur: {
      handleIdBlur,
      handleNameBlur,
      handlePasswdBlur,
      handleRePasswdBlur,
      handleEmailBlur,
      handleAdditionalEmailBlur,
      handlePhoneBlur,
      handleAdditionalAddressBlur,
      handleBirthBlur,
    },

    reset,
  };
};

export default useUserInput;
