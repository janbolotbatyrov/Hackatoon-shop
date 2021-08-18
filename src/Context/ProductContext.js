import axios from "axios";
import React from "react";
import { useReducer } from "react";
import { API } from "../helpers/constants";

export const productContext = React.createContext();

const INIT_STATE = {
  products: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCT":
      return { ...state, products: action.payload };
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
  // getProducts()
  return (
    <productContext.Provider value={{ products: state.products, getProducts }}>
      {children}
    </productContext.Provider>
  );
};

export default ProductContextProvider;
