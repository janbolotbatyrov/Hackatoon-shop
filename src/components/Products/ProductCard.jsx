import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { productContext } from "../../Context/ProductContext";
import { UID } from "../../utils/consts";
import classes from "./Products.module.css";

const ProductCard = ({ product }) => {
  const history = useHistory();
  const {
    deleteProducts,
    editProduct,
    addProductInFovarite,
    checkProductInCart,
    getProducts
  } = useContext(productContext);
  const { auth } = useContext(authContext);
  const [user] = useAuthState(auth);

  const onClickFavorite = (e) => {
    e.stopPropagation();
    addProductInFovarite(product);
    checkProductInCart(product.id) 
    getProducts(history)
  };

  const onWarrning = (e) =>{
    e.stopPropagation()
    alert('Сначала авторизуйтесь!')
  }

  return (
    <li
      key={product.id}
      className={classes.productItem}
      onClick={(e) => {
        history.push(`detail/${product.id}`);
      }}
    >
      <div className={classes.productImage}>
        <img src={product.image} alt="" />
        <div className={classes.productFavorite} onClick={user ? onClickFavorite : onWarrning}>
          {checkProductInCart(product.id) ? (
            <i class="bx bxs-heart"></i>
          ) : (
            <i class="bx bx-heart"></i>
          )}
        </div>
      </div>
      <div className={classes.productTitle}>{product.title}</div>
      <div className={classes.productBuy}>
        <div className={classes.productPrice}>{product.price} &#x20bd;</div>
        {user ? (
          user.uid === UID ? (
            <div className={classes.productAdmin}>
              <div
                className={classes.productAddToCart}
                onClick={(e) => {
                  e.stopPropagation();
                  editProduct(product.id, history);
                }}
              >
                <i class="bx bxs-edit"></i>
              </div>
              <div
                className={classes.productAddToCart}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteProducts(product.id,history);
                }}
              >
                <i class="bx bx-trash-alt"></i>
              </div>
            </div>
          ) : null
        ) : null}

        <div className={classes.productAddToCart}>
          {/* <i class="bx bxs-cart-alt"></i> */}
          <i className="bx bx-cart-alt"></i>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
