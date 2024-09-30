import { SelfRouteObject } from "../types";
import { UserAuth, UserList } from "@/page/user";
import { GuardLayout } from "../guard";

const UserRoute: SelfRouteObject = {
  path: "/user",
  name: "User",
  element: <GuardLayout />,
  meta: {
    title: "用户",
    orderNo: 2,
    icon: "BankOutlined",
  },
  children: [
    {
      path: "list",
      name: "UserList",
      Component: UserList,
      meta: {
        title: "用户列表",
        key: "user-list",
      },
    },
    {
      path: "auth",
      name: "UserAuth",
      Component: UserAuth,
      meta: {
        title: "用户权限",
        key: "user-auth",
      },
    },
  ],
};

export default UserRoute;
