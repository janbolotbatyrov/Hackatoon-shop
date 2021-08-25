import React, { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { productContext } from "../../Context/ProductContext";
import { UID } from "../../utils/consts";
import classes from "./../Products/Products.module.css";

const FavoriteCard = ({ product }) => {
  const history = useHistory();
  const { auth } = useContext(authContext);
  const {
    favorites,
    products,
    getFavorite,
    checkProductInCart,
    addProductInFovarite,
    deleteProductInFavorite,
    deleteProducts,
    editProduct,
    getProducts,
  } = useContext(productContext);
  const onClickFavorite = (e) => {
    e.stopPropagation();
    deleteProductInFavorite(product.item)
    checkProductInCart(product.id);
    getProducts(history)
  };
  return (
    <li
      key={product.item.id}
      className={classes.productItem}
      onClick={(e) => {
        history.push(`detail/${product.item.id}`);
      }}
    >
      <div className={classes.productImage}>
        <img src={product.item.image} alt="" />
        <div className={classes.productFavorite} onClick={onClickFavorite}>
          {favorites ? (
            <i class="bx bxs-heart"></i>
          ) : (
            <i class="bx bx-heart"></i>
          )}
        </div>
      </div>
      <div className={classes.productTitle}>{product.item.title}</div>
      <div className={classes.productBuy}>
        <div className={classes.productPrice}>
          {product.item.price} &#x20bd;
        </div>
        <div className={classes.productAddToCart}>
          {/* <i class="bx bxs-cart-alt"></i> */}
          <i className="bx bx-cart-alt"></i>
        </div>
      </div>
    </li>
  );
};

export default FavoriteCard;
