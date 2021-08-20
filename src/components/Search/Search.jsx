import React, { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { productContext } from "../../Context/ProductContext";
import { UID } from "../../utils/consts";
import Products from "../Products/Products";
import classes from "./Search.module.css";

const Search = () => {
  const [searchVal, setSearchVal] = useState("");
  const changeSearchInput = (e) => {
    setSearchVal(e.target.value);
  };
  const {
    products,
    getProducts,
    deleteProducts,
    editProduct,
    openSearch,
    search,
  } = useContext(productContext);
  const history = useHistory();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { auth } = useContext(authContext);
  const [user] = useAuthState(auth);

  function handleClickToCart() {
    setIsAddedToCart(true);
  }

  return search ? (
    <div className={classes.searchModal}>
      <div className={classes.searchModalInner}>
        <div className={classes.searchModalClose}>
          <i class="bx bx-x" onClick={openSearch}></i>
        </div>
        <div className={classes.searchHeader}>
          <div className={classes.searchInput}>
            <input
              type="text"
              placeholder="Поиск..."
              onChange={changeSearchInput}
              value={searchVal}
            />
            {searchVal ? (
              <i class="bx bx-x" onClick={() => setSearchVal("")}></i>
            ) : null}
          </div>
        </div>

        <div className={classes.searchContent}>
          <h3>Поиск по запросу: "{searchVal}"</h3>
          {searchVal ? (
            <ul className={classes.products}>
              {products
                .filter((item) =>
                  item.title.toLowerCase().includes(searchVal.toLowerCase())
                )
                .map((product) => (
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
                        onClick={handleClickToCart}
                      >
                        {isAddedToCart ? (
                          <i class="bx bxs-cart-alt"></i>
                        ) : (
                          <i className="bx bx-cart-alt"></i>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <div className={classes.searchEmpty}>
              <p>Что ищите?</p>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default Search;
