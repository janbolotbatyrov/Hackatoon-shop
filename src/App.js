import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import AdminRouter from "./components/AdminRouter";
import AppRouter from "./components/AppRouter";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Loader from "./components/Loader/Loader";
import AuthContextProvider, { authContext } from "./Context/AuthContext";

function App() {
  const { auth } = useContext(authContext);
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <Loader />;
  }
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
      <AdminRouter />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
