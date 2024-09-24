import { SelfRouteObject } from "../types";
import { SettingList, SettingSystem } from "@/page/setting";
import { GuardLayout } from "../guard";

const SettingRoute: SelfRouteObject = {
  path: "/setting",
  name: "Setting",
  element: <GuardLayout />,
  meta: {
    title: "设置",
    orderNo: 3,
  },
  children: [
    {
      path: "system",
      name: "SettingSystem",
      Component: SettingSystem,
      meta: {
        title: "系统设置",
        key: "setting-system",
      },
    },
    {
      path: "list",
      name: "SettingList",
      Component: SettingList,
      meta: {
        title: "设置列表",
        key: "setting-list",
      },
    },
  ],
};

export default SettingRoute;
