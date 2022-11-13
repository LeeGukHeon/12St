import React from "react";
import { cardOption, monthlyInstallment } from "../../../../util/payment";
import Card from "../../../UI/Card";

import classes from "./OrderCard.module.css";

const OrderCard = () => {
  return (
    <Card className={classes.orderCard}>
      <div className={classes["orderCard-selectedCard"]}>
        <span>카드 선택</span>
        <select name="" id="">
          {cardOption.map((it, idx) => (
            <option key={idx} value={it}>
              {it}
            </option>
          ))}
        </select>
      </div>

      <div>
        <span>할부 기간</span>
        <select name="" id="">
          {monthlyInstallment.map((it, idx) => (
            <option key={idx} value={it}>
              {it}
            </option>
          ))}
        </select>
      </div>
    </Card>
  );
};

export default OrderCard;
