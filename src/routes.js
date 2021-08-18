import Cart from "./components/Cart/Cart";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { CART_ROUTE, LOGIN_ROUTE } from "./utils/consts";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login
  },
  {
    path: "/",
    Component: Home
  }
]

export const privateRoutes = [
  {
    path: CART_ROUTE,
    Component: Cart
  },
  {
    path: "/",
    Component: Home
  }
]