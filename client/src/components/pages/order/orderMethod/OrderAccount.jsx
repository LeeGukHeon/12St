import React from "react";
import { bankOption } from "../../../../util/payment";

import Card from "../../../UI/Card";

import classes from "./OrderAccount.module.css";

const OrderAccount = () => {
  return (
    <Card className={classes.orderAccount}>
      <span>은행선택</span>
      <select name="" id="">
        {bankOption.map((it) => (
          <option value={it}>{it}</option>
        ))}
      </select>
    </Card>
  );
};

export default OrderAccount;
