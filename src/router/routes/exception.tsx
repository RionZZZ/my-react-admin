import { SelfRouteObject } from "../types";
import { GuardLayout } from "../guard";
import ExceptionPage from "@/page/exception";
import { ExceptionEnum } from "@/types/enums/exception";

const ExceptionRoute: SelfRouteObject = {
  path: "/exception",
  name: "Exception",
  element: <GuardLayout />,
  meta: {
    title: "异常",
    hideMenu: true,
  },
  children: [
    {
      path: "403",
      name: "403",
      Component: ExceptionPage,
      meta: {
        title: "403",
        key: "exception-403",
      },
      loader: () => ({ status: ExceptionEnum.PAGE_NOT_ACCESS }),
    },
    {
      path: "404",
      name: "404",
      Component: ExceptionPage,
      meta: {
        title: "404",
        key: "exception-404",
      },
      loader: () => ({ status: ExceptionEnum.PAGE_NOT_FOUND }),
    },
    {
      path: "500",
      name: "500",
      Component: ExceptionPage,
      meta: {
        title: "500",
        key: "exception-500",
      },
      loader: () => ({ status: ExceptionEnum.SERVER_ERROR }),
    },
  ],
};

export default ExceptionRoute;
