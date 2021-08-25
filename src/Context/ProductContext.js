import axios from "axios";
import React from "react";
import { useReducer } from "react";
import { useHistory } from "react-router-dom";
import { API } from "../helpers/constants";

export const productContext = React.createContext();

const INIT_STATE = {
  products: [],
  productToEdit: [],
  detail: {},
  favorites: {},
  comments: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCT":
      return {
        ...state,
        products: action.payload.data,
      };
    case "EDIT_PRODUCT":
      return { ...state, productToEdit: action.payload };
    case "GET_DETAIL":
      return { ...state, detail: action.payload };
    case "GET_FAVORITE":
      return { ...state, favorites: action.payload };
    case "GET_COMMENT":
      return { ...state, comments: action.payload };
    default:
      return state;
  }
};
const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getProducts = async (history) => {
    const search = new URLSearchParams(history.location.search);
    history.push(`${history.location.pathname}?${search.toString()}`);
    let data = await axios(`${API}products${window.location.search}`);

    dispatch({
      type: "GET_PRODUCT",
      payload: data,
    });
  };

  const addProducts = (newProduct, history) => {
    axios.post(`${API}products`, newProduct);
    getProducts(history);
  };

  const deleteProducts = async (id, history) => {
    await axios.delete(`${API}products/${id}`);
    getProducts(history);
  };

  const editProduct = async (id, history) => {
    let { data } = await axios(`${API}products/${id}`);
    dispatch({
      type: "EDIT_PRODUCT",
      payload: data,
    });
    history.push("/edit");
  };

  const saveProduct = async (newProduct, history) => {
    await axios.patch(`${API}products/${newProduct.id}`, newProduct);
    history.push("/");
  };

  const getDetail = async (id) => {
    let { data } = await axios(`${API}products/${id}`);
    dispatch({
      type: "GET_DETAIL",
      payload: data,
    });
  };

  const addProductInFovarite = (product) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        products: [],
      };
    }

    let newProduct = {
      item: product,
      count: 1,
    };
    let filteredFavorite = favorite.products.filter(
      (elem) => elem.item.id === product.id
    );
    if (filteredFavorite.length > 0) {
      favorite.products = favorite.products.filter(
        (elem) => elem.item.id !== product.id
      );
    } else {
      favorite.products.push(newProduct);
    }
    localStorage.setItem("favorite", JSON.stringify(favorite));
  };

  const deleteProductInFavorite = (product) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    const filtered = favorite.products.filter(
      (elem) => elem.item.id !== product.id
    );
    if (!favorite) {
      favorite = {
        products: [],
      };
    }

    let newProduct = {
      products: filtered,
      count: 1,
    };
    localStorage.setItem("favorite", JSON.stringify(newProduct));
    getFavorite();
  };

  const getFavorite = () => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        products: [],
        totalPrice: 0,
      };
    }
    dispatch({
      type: "GET_FAVORITE",
      payload: favorite,
    });
  };

  const checkProductInCart = (id) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        products: [],
        totalPrice: 0,
      };
    }
    let newFavorite = favorite.products.filter((elem) => elem.item.id === id);
    return newFavorite.length > 0 ? true : false;
  };

  const getComment = async (id) => {
    let { data } = await axios(`${API}products`);
    let comment = data[id - 1].comments.map((comment) => comment);
    dispatch({
      type: "GET_COMMENT",
      payload: comment,
    });
  };

  const addComments = async (newComment, id) => {
    let comment = {
      comments: [...state.comments, newComment],
    };
    await axios.patch(`${API}products/${(newComment, id)}`, comment);
    getComment(id);
  };

  const deleteComment = async (productId, id) => {};

  return (
    <productContext.Provider
      value={{
        products: state.products,
        productToEdit: state.productToEdit,
        detail: state.detail,
        search: state.search,
        favorites: state.favorites,
        comments: state.comments,
        getProducts,
        addProducts,
        deleteProducts,
        editProduct,
        saveProduct,
        getDetail,
        addProductInFovarite,
        getFavorite,
        checkProductInCart,
        deleteProductInFavorite,
        getComment,
        addComments,
        deleteComment,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default ProductContextProvider;
