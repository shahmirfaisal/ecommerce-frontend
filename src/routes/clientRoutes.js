import { Login } from "../pages/clientPages/Login/";
import { Signup } from "../pages/clientPages/Signup/";
import { Profile } from "../pages/clientPages/Profile/";
import { EditProfile } from "../pages/clientPages/EditProfile/";
import { SearchPage } from "../pages/clientPages/SearchPage";
import { Cart } from "../pages/clientPages/Cart/";
import { Shop } from "../pages/clientPages/Shop";
import { Home } from "../pages/clientPages/Home";
import { CategoryProducts } from "../pages/clientPages/CategoryProducts";
import { ProductPage } from "../pages/clientPages/ProductPage";
import { Checkout } from "../pages/clientPages/Checkout/";
import { Orders } from "../pages/pages/Orders/";
import { Order } from "../pages/pages/Order/";

export const clientRoutes = [
  {
    path: "/",
    key: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/category/:id",
    key: "/category/:id",
    component: CategoryProducts,
  },
  {
    path: "/shop",
    key: "/shop",
    component: Shop,
  },
  {
    path: "/product/:id",
    key: "/product/:id",
    component: ProductPage,
  },
  {
    path: "/login",
    key: "/login",
    component: Login,
  },
  {
    path: "/signup",
    key: "/signup",
    component: Signup,
  },
  {
    path: "/profile",
    key: "/profile",
    component: Profile,
  },
  {
    path: "/edit-profile",
    key: "/edit-profile",
    component: EditProfile,
  },
  {
    path: "/search",
    key: "/search",
    component: SearchPage,
  },
  {
    path: "/cart",
    key: "/cart",
    component: Cart,
  },
  {
    path: "/checkout",
    key: "/checkout",
    component: Checkout,
  },
  {
    path: "/orders",
    key: "/orders",
    component: Orders,
  },
  {
    path: "/order/:id",
    key: "/order/:id",
    component: Order,
  },
];
