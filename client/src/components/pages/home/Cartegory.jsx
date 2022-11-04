import React from "react";
import Card from "../../UI/Card";

import classes from "./Cartegory.module.css";
import CategoryItem from "./CategoryItem";

const Cartegory = () => {
  return (
    <Card className={classes.category}>
      <CategoryItem />
      <CategoryItem />
      <CategoryItem />
      <CategoryItem />
      <CategoryItem />
      <CategoryItem />
      <CategoryItem />
      <CategoryItem />
    </Card>
  );
};

export default Cartegory;
