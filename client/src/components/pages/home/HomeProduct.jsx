import React from "react";

import Card from "../../UI/Card";

import classes from "./HomeProduct.module.css";

const DUMMY_URL =
  "https://cdn.011st.com/11dims/resize/x300/11src/pd/v2/8/4/4/3/3/0/Xbjtt/5090844330_L300.jpg";

const Product = () => {
  return (
    <Card className={classes.product}>
      <div className={classes["product-tag"]}>12st 추천 상품</div>
      <Card className={classes["product-img"]}>
        <img src={DUMMY_URL} alt="" />
      </Card>
      <div className={classes["product-content"]}>
        <h3 className={classes["product-content-title"]}>
          나랑들 사이다 제로 245ml (뚱캔)
        </h3>
        <p>
          <span className={classes["product-content-discount"]}>28%</span>
          <span className={classes["product-content-price"]}>10,710원</span>
          <span className={classes["product-content-costPrice"]}>15000</span>
        </p>
      </div>
    </Card>
  );
};

export default Product;
