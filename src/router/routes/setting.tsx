import { SelfRouteObject } from "../types";
import { SettingDept, SettingUser } from "@/page/setting";
import { GuardLayout } from "../guard";

const SettingRoute: SelfRouteObject = {
  path: "/setting",
  name: "Setting",
  element: <GuardLayout />,
  meta: {
    title: "系统设置",
    orderNo: 4,
    icon: "SettingOutlined",
  },
  children: [
    {
      path: "dept",
      name: "SettingDept",
      Component: SettingDept,
      meta: {
        title: "部门管理",
        key: "setting-dept",
      },
    },
    {
      path: "user",
      name: "SettingUser",
      Component: SettingUser,
      meta: {
        title: "用户管理",
        key: "setting-user",
      },
    },
  ],
};

export default SettingRoute;
