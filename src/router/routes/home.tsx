import { SelfRouteObject } from "../types";
import HomePage from "@/page/home";
import { GuardLayout } from "../guard";

const HomeRoute: SelfRouteObject = {
  path: "/home",
  name: "Home",
  element: <GuardLayout />,
  meta: {
    title: "首页",
    orderNo: 1,
    hideChildMenu: true,
    icon: "BankOutlined",
    hideMenu: true,
  },
  children: [
    {
      path: "",
      name: "homePage",
      Component: HomePage,
      meta: {
        title: "首页",
        key: "home",
      },
    },
  ],
};

export default HomeRoute;
