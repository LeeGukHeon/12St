import React from "react";
import Banner from "./home/Banner";
import Cartegory from "./home/Cartegory";
import Products from "./home/HomeProducts";

const Home = () => {
  return (
    <div>
      <Banner />

      <Cartegory />

      <Products title="12st 베스트 상품" />

      <Products title="12st 추천 상품" />

      <Products title="12st 할인 상품" />

      <Products title="12st MD 추천 상품" />

      <Products title="인기 상품" />
    </div>
  );
};

export default Home;
