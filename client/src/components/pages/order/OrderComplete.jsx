import React from "react";
import { Fragment } from "react";
import classes from "./OrderComplete.module.css";

const OrderComplete = () => {
  return (
    <Fragment>
      <div className={classes.orderComplete}>
        <h3>결제가 완료되었습니다.</h3>

        <div className={classes.orderProduct}>
          asdads
          <div className={classes["orderProduct-label"]}>asdasd</div>
        </div>

        <div className={classes.destination}>
          <p>변경하기</p>
          <div>받는 사람</div>
          <div>받는 주소</div>
          <div>배송 요청사항</div>
        </div>

        <div className={classes.control}>
          <button className={classes["control-btn-detail"]}>
            주문상세보기
          </button>
          <button className={classes["control-btn-continue"]}>
            쇼핑계속하기
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderComplete;
