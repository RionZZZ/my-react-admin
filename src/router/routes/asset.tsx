import { SelfRouteObject } from "../types";
import { GuardLayout } from "../guard";
import { AssetList } from "@/page/asset";

const AssetRoute: SelfRouteObject = {
  path: "/asset",
  name: "Asset",
  element: <GuardLayout />,
  meta: {
    title: "资产管理",
    orderNo: 1,
    icon: "BankOutlined",
  },
  children: [
    {
      path: "list",
      name: "AssetList",
      Component: AssetList,
      meta: {
        title: "资源列表",
        key: "asset-list",
      },
    },
  ],
};

export default AssetRoute;
