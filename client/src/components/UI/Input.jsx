import React from "react";

const Input = ({
  type,
  id,
  value,
  onChange,
  onBlur,
  isValid,
  className,
  placeholder,
}) => {
  return (
    <input
      className={className}
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  );
};

Input.defalutProps = {
  type: "text",
  isValid: "true",
  placeholder: "",
};

export default Input;
