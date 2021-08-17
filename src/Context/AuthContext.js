import axios from "axios";
import React from "react";
import { useReducer } from "react";
import { API } from "../helpers/constants";

export const authContext = React.createContext();

const INIT_STATE = {};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const registerUser = async (e) => {
    e.preventDefault();
    const newUser = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    try{
        const res = await axios.post(`${API}users`, newUser)
        console.log(res.data);
    }catch{

    }
  };

  return (
    <authContext.Provider value={{ registerUser }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
