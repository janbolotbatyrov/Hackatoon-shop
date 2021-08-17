import React from "react";
import firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp({
  apiKey: "AIzaSyDA6GSC5GuRYeImM5rH0EYUHT6OiGC73Mw",
  authDomain: "shop-react-2ac59.firebaseapp.com",
  projectId: "shop-react-2ac59",
  storageBucket: "shop-react-2ac59.appspot.com",
  messagingSenderId: "1037793228947",
  appId: "1:1037793228947:web:22c3894c2f7e98f4a27566",
  measurementId: "G-JDSZVCP4S8"
});



export const authContext = React.createContext();

const INIT_STATE = {};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const auth = firebase.auth();
  const firestore = firebase.firestore();

  return (
    <authContext.Provider
      value={{
        firebase,
        auth,
        firestore,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
