import React, { useContext, useEffect } from "react";
import { productContext } from "../../Context/ProductContext";
import classes from "./Products.module.css";

const Products = () => {
  const { products, getProducts } = useContext(productContext);
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ul className={classes.products}>
      {products.map((product) => (
        <li className={classes.productItem}>
          <div className={classes.productImage}>
            <img src={product.image} alt="" />
          </div>
          <div className={classes.productTitle}>{product.title}</div>
          <div className={classes.productBuy}>
            <div className={classes.productPrice}>{product.price} &#x20bd;</div>
            <div className={classes.productAddToCart}><i className="bx bx-cart-alt"></i></div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Products;
