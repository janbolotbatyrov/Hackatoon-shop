import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { productContext } from "../../Context/ProductContext";
import classes from "./Add.module.css";

const Add = () => {
  const { addProducts } = useContext(productContext);
  const [productImg, setProductImg] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productType, setProductType] = useState("");
  const history = useHistory()

  function handleClick() {
    let newProduct = {
      image: productImg,
      title: productTitle,
      price: productPrice,
      type: productType
    };
    addProducts(newProduct, history);
    // history.push('/')
  }

  return (
    <div className={classes.add}>
      <div className="container">
        <div className={classes.addInner}>
          <h2>Добавить продукт</h2>
          <div className={classes.addImg}>
            <p>Ссылку на картинку</p>
            <input
              type="text"
              value={productImg}
              onChange={(e) => setProductImg(e.target.value)}
            />
          </div>
          <div className={classes.addTitle}>
            <p>Имя продукта</p>
            <input
              type="text"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
            />
          </div>
          <div className={classes.addPrice}>
            <p>Цена продукта</p>
            <input
              type="text"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>
          <div className={classes.addType}>
            <p>Тип продукта</p>
            <input
              type="text"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            />
          </div>
          <div className={classes.addBtn} onClick={handleClick}>
            Добавить
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
