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

  const addProducts = (newProduct) => {
    axios.post(`${API}products`, newProduct);
    getProducts();
  };

  const deleteProducts = async (id) => {
    await axios.delete(`${API}products/${id}`);
    getProducts();
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

  

  return (
    <productContext.Provider
      value={{
        products: state.products,
        productToEdit: state.productToEdit,
        detail: state.detail,
        search: state.search,
        getProducts,
        addProducts,
        deleteProducts,
        editProduct,
        saveProduct,
        getDetail,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default ProductContextProvider;
