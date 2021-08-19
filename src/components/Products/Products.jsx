import React, { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { productContext } from "../../Context/ProductContext";
import { UID } from "../../utils/consts";
import classes from "./Products.module.css";

const Products = () => {
  const { products, getProducts, deleteProducts, editProduct} = useContext(productContext);
  const { auth } = useContext(authContext);
  const [user] = useAuthState(auth);

  useEffect(() => {
    getProducts();
  }, []);

  const history = useHistory();
  return (
    <ul className={classes.products}>
      {products.map((product) => (
        <li key={product.item} className={classes.productItem}>
          <div className={classes.productImage}>
            <img src={product.image} alt="" />
          </div>
          <div className={classes.productTitle}>{product.title}</div>
          <div className={classes.productBuy}>
            <div className={classes.productPrice}>{product.price} &#x20bd;</div>
            {user ?
            user.uid === UID ? (
              <div className={classes.productAdmin}>
                <div className={classes.productAddToCart}>
                <i class='bx bxs-edit'  onClick={() => editProduct(product.id, history)} ></i>
                </div>
                <div className={classes.productAddToCart}>
                  <i class="bx bx-trash-alt" onClick={() => deleteProducts(product.id)}></i>
                </div>
              </div>
            ) : null : null}

            <div className={classes.productAddToCart}>
              <i
                className="bx bx-cart-alt"
                onClick={() => history.push("/cart")}
              ></i>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Products;
