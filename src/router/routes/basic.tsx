import { SelfRouteObject } from "../types";
import { BasicArea, BasicCategory, BasicLabel } from "@/page/basic";
import { GuardLayout } from "../guard";

const BasicRoute: SelfRouteObject = {
  path: "/basic",
  name: "Basic",
  element: <GuardLayout />,
  meta: {
    title: "基础设置",
    orderNo: 2,
    icon: "MergeOutlined",
  },
  children: [
    {
      path: "category",
      name: "basicCategory",
      Component: BasicCategory,
      meta: {
        title: "资产分类",
        key: "basic-category",
      },
    },
    {
      path: "area",
      name: "basicArea",
      Component: BasicArea,
      meta: {
        title: "区域管理",
        key: "basic-area",
      },
    },
    {
      path: "label",
      name: "basicLabel",
      Component: BasicLabel,
      meta: {
        title: "资产标签模板",
        key: "basic-label",
      },
    },
  ],
};

export default BasicRoute;
