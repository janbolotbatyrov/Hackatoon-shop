import React, { useState } from "react";
import classes from "./../Products/Products.module.css";
import { useEffect } from "react";
import { useContext } from "react";
import { productContext } from "../../Context/ProductContext";
import { useHistory } from "react-router-dom";
import FavoriteCard from "./FavoriteCard";

const Favorite = () => {
  const { favorites, getFavorite, checkProductInCart, addProductInFovarite } =
    useContext(productContext);

  useEffect(() => {
    getFavorite();
  }, []);
  return (
    <ul>
      <div className="container">
        <h2>Избранное</h2>
        <div className={classes.products}>
          {favorites.products ? (
            favorites.products.map((product) => (
              <FavoriteCard product={product} />
            ))
          ) : (
            <div>Список избранного пуст</div>
          )}
        </div>
      </div>
    </ul>
  );
};

export default Favorite;
