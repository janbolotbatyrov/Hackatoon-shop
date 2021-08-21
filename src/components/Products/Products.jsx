import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, Pagination } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { productContext } from "../../Context/ProductContext";
import { API } from "../../helpers/constants";
import { UID } from "../../utils/consts";
import ProductCard from "./ProductCard";
import classes from "./Products.module.css";

const Products = () => {
  const { products, getProducts, deleteProducts, editProduct, paginatedPages } =
    useContext(productContext);
  const { auth } = useContext(authContext);
  const [user] = useAuthState(auth);
  const [searchVal, setSearchVal] = useState("");
  const [activePage, setActivePage] = useState(0);

  const history = useHistory();

  useEffect(() => {
    getProducts(history);
  }, []);

  function handleClickToCart(e) {
    history.push("/cart");
    e.stopPropagation();
  }
  function sortData(field) {
    if (field === "all") {
      history.push(`${history.location.pathname.replace("type")}`);
      getProducts(history);
      return;
    }
    const copyData = products.concat();
    const sortData = copyData.filter((item) => item.type.includes(field));
    const search = new URLSearchParams(history.location.search);
    search.set("type", field);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getProducts(history);
    console.log(sortData);
  }

  const handleSearchValue = (e) => {
    const search = new URLSearchParams(history.location.search);
    search.set("q", e.target.value);
    history.push(`${history.location.pathname}?${search.toString()}`);
    setSearchVal(e.target.value);
    console.log(searchVal);
    getProducts(history);
  };

  const clearSearch = () => {
    history.push("");
    setSearchVal("");
    getProducts(history);
  };

  const PAGE_LIMIT = 10;

  const { pagItems, pagStart, pagEnd } = useMemo(() => {
    const pageLimit = Math.ceil(products.length / PAGE_LIMIT);
    let pagItems = [];
    for (let i = 0; i < pageLimit; i++) {
      pagItems.push(
        <li key={i} active={i === activePage} onClick={() => setActivePage(i)}>
          {i + 1}
        </li>
      );
    }
    const pagStart = activePage * PAGE_LIMIT;
    const pagEnd = pagStart + PAGE_LIMIT;
    return {
      pagItems,
      pagStart,
      pagEnd,
    };
  }, [activePage, products.length]);

  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchInner}>
          <input
            type="text"
            placeholder="Поиск..."
            value={searchVal}
            onChange={handleSearchValue}
          />
          <i class="bx bx-x" onClick={clearSearch}></i>
        </div>
        <div className={classes.filter}>
          <span onClick={() => sortData("all")}>Все</span>
          <span onClick={() => sortData("male")}>Мужчинам</span>
          <span onClick={() => sortData("female")}>Женщинам</span>
        </div>
      </div>
      <ul className={classes.products}>
        {products.slice(pagStart, pagEnd).map((product) => (
          <ProductCard product={product} />
        ))}
      </ul>
      <div className={classes.pagination}>{pagItems}</div>
    </>
  );
};

export default Products;
