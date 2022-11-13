import React, { Fragment } from "react";
import { noneBankOption } from "../../../../util/payment";
import Card from "../../../UI/Card";

import classes from "./OrderNoneBank.module.css";

const OrderNoneBank = () => {
  return (
    <Fragment>
      <Card className={classes.orderNoneBank}>
        <div className={classes["orderNoneBank-selectedCard"]}>
          <span>입금 은행</span>
          <select name="" id="">
            {noneBankOption.map((it, idx) => (
              <option key={idx} value={it}>
                {it}
              </option>
            ))}
          </select>
        </div>

        <div className={classes["orderNoneBank-selectedCard-timeLimit"]}>
          <span
            className={classes["orderNoneBank-selectedCard-timeLimit__title"]}
          >
            입금 기한
          </span>
          <span>입금기한 넣기</span>
        </div>

        <p className={classes["orderNoneBank-info"]}>
          현금으로 결제한 모든 금액은 우리은행과 채무지급보증계약을 체결하여
          고객님의 안전거래를 보장하고 있습니다.
        </p>
      </Card>

      <div className={classes["orderNoneBank-precautions"]}>
        <p className={classes["orderNoneBank-precautions-title"]}>
          무통장입금 시 유의 사항
        </p>
        <ul className={classes["orderNoneBank-precautions-list"]}>
          <li>
            입금완료 후 상품품절로 인해 자동취소된 상품은 환불 처리해 드립니다.
          </li>
          <li>
            무통장입금 결제 시 부분취소가 불가하며 전체취소 후 다시 주문하시기
            바랍니다.
          </li>
          <li>
            은행 이체 수수료가 발생될수 있습니다. 입금시 수수료를 확인해주세요.
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default OrderNoneBank;
