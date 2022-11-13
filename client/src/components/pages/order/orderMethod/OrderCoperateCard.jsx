import React from "react";
import { corporateCardOption } from "../../../../util/payment";
import Card from "../../../UI/Card";

import classes from "./OrderCoperateCard.module.css";

const OrderCoperateCard = () => {
  return (
    <Card className={classes.orderCoperateCard}>
      <div className={classes["orderCoperateCard-selectedCard"]}>
        <span>카드 선택</span>
        <select name="" id="">
          {corporateCardOption.map((it, idx) => (
            <option key={idx} value={it}>
              {it}
            </option>
          ))}
        </select>
      </div>

      <div>
        <span>할부 기간</span>
        <select name="" id="">
          <option value="일시불">일시불</option>
        </select>
        <span>법인카드는 일시불 결제만 가능합니다</span>
      </div>
    </Card>
  );
};

export default OrderCoperateCard;
