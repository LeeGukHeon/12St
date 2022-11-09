import React from "react";

import classes from "./UserInfoInput.module.css";

const UserInfoInput = ({
  id,
  type,
  text,
  value,
  onChange,
  onBlur,
  children,
  className,
}) => {
  return (
    <React.Fragment>
      <div className={classes["userInfoInput-label"]}>
        <label htmlFor={id}>{text}</label>
      </div>

      <div className={className}>
        {children}
        <input
          className={classes["userInfoInput-input"]}
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </React.Fragment>
  );
};

export default UserInfoInput;
