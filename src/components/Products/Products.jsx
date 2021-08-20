import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { productContext } from "../../Context/ProductContext";
import { UID } from "../../utils/consts";
import classes from "./Products.module.css";

const Products = () => {
  const { products, getProducts, deleteProducts, editProduct } =
    useContext(productContext);
  // const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { auth } = useContext(authContext);
  const [user] = useAuthState(auth);

  useEffect(() => {
    getProducts();
  }, []);

  function handleClickToCart(e) {
    history.push('/cart')
    e.stopPropagation();
  }
  const history = useHistory();
  return (
    <>
      <div>dsa</div>
      <ul className={classes.products}>
        {products.map((product) => (
          <li
            key={product.id}
            className={classes.productItem}
            onClick={(e) => {
              history.push(`detail/${product.id}`);
            }}
          >
            <div className={classes.productImage}>
              <img src={product.image} alt="" />
            </div>
            <div className={classes.productTitle}>{product.title}</div>
            <div className={classes.productBuy}>
              <div className={classes.productPrice}>
                {product.price} &#x20bd;
              </div>
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
                        deleteProducts(product.id);
                      }}
                    >
                      <i class="bx bx-trash-alt"></i>
                    </div>
                  </div>
                ) : null
              ) : null}

              <div
                className={classes.productAddToCart}
                onClick={(e) => handleClickToCart(e)}
              >
                  {/* <i class="bx bxs-cart-alt"></i> */}
                  <i className="bx bx-cart-alt"></i>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Products;
