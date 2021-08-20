import Cart from "./components/Cart/Cart";
import Home from "./components/Home/Home";
import Add from "./components/Add/Add";
import Login from "./components/Login/Login";
import { CART_ROUTE, LOGIN_ROUTE } from "./utils/consts";
import Edit from "./components/Edit/Edit";
import ProductDetail from "./components/ProductDetail/ProductDetail";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
  {
    path: "/",
    Component: Home,
  },
  {
    path: '/detail/:id',
    Component: ProductDetail
  }
];

export const privateRoutes = [
  {
    path: CART_ROUTE,
    Component: Cart,
  },
  {
    path: "/",
    Component: Home,
  },
  {
    path: '/detail/:id',
    Component: ProductDetail
  }
];

export const adminRoutes = [
  {
    path: "/add",
    Component: Add,
  },
  {
    path: "/edit",
    Component: Edit,
  },
  {
    path: '/detail:id',
    Component: ProductDetail
  }
];
