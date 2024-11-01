import { SelfRouteObject } from "../types";
import { GuardLayout } from "../guard";
import {
  AssetList,
  AssetHandle,
  AssetReceive,
  AssetReceiveHandle,
} from "@/page/asset";

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
        title: "资产列表",
        key: "asset-list",
      },
    },
    {
      path: "handle/:handle",
      name: "AssetHandle",
      Component: AssetHandle,
      meta: {
        title: "资产录入",
        key: "asset-handle",
        hideMenu: true,
      },
    },
    {
      path: "receive",
      name: "AssetReceive",
      Component: AssetReceive,
      meta: {
        title: "领用&退还",
        key: "asset-receive",
      },
    },
    {
      path: "receive-handle",
      name: "AssetReceiveHandle",
      Component: AssetReceiveHandle,
      meta: {
        title: "新增资产领用",
        key: "receive-handle",
        hideMenu: true,
      },
    },
  ],
};

export default AssetRoute;
