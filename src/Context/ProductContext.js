import axios from "axios";
import React from "react";
import { useReducer } from "react";
import { useHistory } from "react-router-dom";
import { API } from "../helpers/constants";

export const productContext = React.createContext();

const INIT_STATE = {
  products: [],
  productToEdit: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCT":
      return { ...state, products: action.payload };
    case "EDIT_PRODUCT":
      return { ...state, productToEdit: action.payload };
    default:
      return state;
  }
};

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getProducts = async () => {
    let { data } = await axios(`${API}products`);
    dispatch({
      type: "GET_PRODUCT",
      payload: data,
    });
  };

  const addProducts = (newProduct) => {
    axios.post(`${API}products`, newProduct);
    getProducts();
  };

  const deleteProducts = (id) => {
    axios.delete(`${API}products/${id}`);
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

  return (
    <productContext.Provider
      value={{
        products: state.products,
        productToEdit: state.productToEdit,
        getProducts,
        addProducts,
        deleteProducts,
        editProduct,
        saveProduct
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default ProductContextProvider;
