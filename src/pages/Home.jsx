import React from "react";
import BestSellers from "../component/BestSellers";
import Footer from "../component/Footer";
import Herosection from "../component/Herosection";
import Navbar from "../component/Navbar";
import NewItem from "../component/NewItem";

const Home = () => {
  return (
    <>
      <Navbar />
      <Herosection />
      <NewItem />

      <BestSellers />
      <Footer />
    </>
  );
};

export default Home;
