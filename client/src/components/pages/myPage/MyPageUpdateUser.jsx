import React from "react";
import { useState } from "react";
import MyPageCheckPw from "./MyPageCheckPw";
import MyPagePassPw from "./MyPagePassPw";

const MyPageUpdateUser = () => {
  const [userPw, setUserPw] = useState(false);
  return (
    <React.Fragment>
      <div>
        {!userPw ? <MyPageCheckPw setUserPw={setUserPw} /> : <MyPagePassPw />}
      </div>
    </React.Fragment>
  );
};

export default MyPageUpdateUser;
