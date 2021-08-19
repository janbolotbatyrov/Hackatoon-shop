import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { productContext } from "../../Context/ProductContext";
import classes from "./Edit.module.css";

const Edit = () => {
  const { productToEdit, saveProduct } = useContext(productContext);
  const [newProductItem, setNewProductItem] = useState(productToEdit);
  const history = useHistory();

  useEffect(() => {
    setNewProductItem(productToEdit);
  }, [productToEdit]);

  function handleEditTitle(e) {
    let newProduct = {
      ...newProductItem,
      title: e.target.value,
    };
    setNewProductItem(newProduct);
  }

  function handleEditImage(e) {
    let newProduct = {
      ...newProductItem,
      image: e.target.value,
    };
    setNewProductItem(newProduct);
  }
  function handleEditType(e) {
    let newProduct = {
      ...newProductItem,
      type: e.target.value,
    };
    setNewProductItem(newProduct);
  }
  function handleEditPrice(e) {
    let newProduct = {
      ...newProductItem,
      price: e.target.value,
    };
    setNewProductItem(newProduct);
  }
  return (
    <div className={classes.edit}>
      <div className="container">
        <div className={classes.editInner}>
          <h2>Изменить продукт</h2>
          <div className={classes.editImg}>
            <p>Ссылка на картинку</p>
            <input
              type="text"
              value={newProductItem.image}
              onChange={handleEditImage}
            />
          </div>
          <div className={classes.editTitle}>
            <p>Имя продукта</p>
            <input
              type="text"
              value={newProductItem.title}
              onChange={handleEditTitle}
            />
          </div>
          <div className={classes.editPrice}>
            <p>Цена продукта</p>
            <input
              type="text"
              value={newProductItem.price}
              onChange={handleEditPrice}
            />
          </div>
          <div className={classes.editType}>
            <p>Тип продукта</p>
            <input
              type="text"
              value={newProductItem.type}
              onChange={handleEditType}
            />
          </div>
          <div
            className={classes.editBtn}
            onClick={() => saveProduct(newProductItem, history)}
          >
            Сохранить
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
