import React from "react";
import MainHome from "../component/MainHome";
import NewProducts from "../component/NewProducts";
import PopularProducts from "../component/PopularProducts";
import SecondMain from "../component/SecondMain";

const Home = () => {
  return (
    <div className=" overflow-x-hidden">
      <MainHome />
      <PopularProducts />
      <SecondMain />
      <NewProducts />
    </div>
  );
};

export default Home;
