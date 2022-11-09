import { useReducer } from "react";

// 초기값 설정
const initialInputState = {
  value: "",
  isTouched: false,
};

// reducer 함수 설정 (각 action에 대한 작업 설정)
const inputStateReducer = (state, action) => {
  // 사용자의 입력 발생 시
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }

  // 사용자의 input 요소 터치 시
  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }

  // 입력값 reset
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }

  return inputStateReducer;
};

// 커스텀 훅 설정 (인수로 유효성 검사 함수 전달받음)
const useUserInput = (validateValue) => {
  const [inputState, dispatchInput] = useReducer(
    inputStateReducer,
    initialInputState
  );

  // 입력값 유효성 검사 (인수로 전달 받은 함수에 state 넣어서 유효성 검사 - 유효하면 true)
  const valueIsValid = validateValue(inputState.value);

  // 유효하지 않은 입력에 대한 피드백 (hasError가 true이면 사용자에게 피드백)
  const hasError = !valueIsValid && inputState.isTouched;

  // 사용자 입력 dispatch
  const HandleValueChange = (event) => {
    dispatchInput({ type: "INPUT", value: event.target.value });
  };
  // input 요소 터치 dispatch
  const HandleInputBlur = () => {
    dispatchInput({ type: "BLUR" });
  };
  // reset dispatch
  const reset = () => {
    dispatchInput({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    HandleValueChange,
    HandleInputBlur,
    reset,
  };
};

export default useUserInput;
