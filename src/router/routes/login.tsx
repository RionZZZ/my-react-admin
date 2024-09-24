import { SelfRouteObject } from "../types";
import LoginPage from "@/page/login";

const LoginRoute: SelfRouteObject = {
  path: "/login",
  name: "Login",
  element: <LoginPage />,
  meta: {
    title: "登录",
    hideMenu: true,
  },
};

export default LoginRoute;
