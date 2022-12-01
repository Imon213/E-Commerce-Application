import React from "react";
import FeatureProduct from "./component/FeatureProduct";
import HeroSection from "./component/HeroSection";

const Home = () => {
  const data = {
    name: "thapa store",
  };

  return (
    <>
    <HeroSection myData={data} />
    <FeatureProduct />
    </>
  );
};

export default Home;
