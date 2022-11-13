import React from "react";
import { phoneOption } from "../../../../util/payment";
import Card from "../../../UI/Card";

import classes from "./OrderPhone.module.css";

const OrderPhone = () => {
  return (
    <Card className={classes.orderPhone}>
      <span>통신사 선택</span>
      <select name="" id="">
        {phoneOption.map((it) => (
          <option value={it}>{it}</option>
        ))}
      </select>
    </Card>
  );
};

export default OrderPhone;
