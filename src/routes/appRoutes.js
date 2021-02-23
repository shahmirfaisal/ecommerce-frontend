import { Client } from "../App/Client";
import { Admin } from "../App/Admin";

export const appRoutes = [
  {
    path: "/admin",
    key: "/admin",
    component: Admin,
  },
  {
    path: "/",
    key: "/",
    component: Client,
  },
];
