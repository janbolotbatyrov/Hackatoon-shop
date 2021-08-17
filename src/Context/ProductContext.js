import React from 'react'
import { useReducer } from "react";

export const productContext = React.createContext();

const INIT_STATE = {
  products: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  return (
    <productContext.Provider value={{ products: state.products }}>
      {children}
    </productContext.Provider>
  );
};

export default ProductContextProvider