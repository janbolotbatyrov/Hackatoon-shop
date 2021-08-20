import React, { useEffect } from "react";
import firestore from "firebase";
import Loader from "../Loader/Loader";
import classes from "./Home.module.css";
import Products from "../Products/Products";
import Search from "../Search/Search";

const Home = () => {
  return (
    <div className={classes.home}>
      <div className="container">
        <div className={classes.homeInner}>
          <div className={classes.homeProducts}>
            <Products />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
