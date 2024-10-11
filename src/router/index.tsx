import { createBrowserRouter, Navigate } from "react-router-dom";
import { RouteModule, SelfRouteObject } from "./types";
import LoginRoute from "./auth/login";
import ExceptionRoute from "./auth/exception";

const allRoutes = import.meta.glob("./routes/*.tsx", {
  eager: true,
}) as Recordable<RouteModule>;

const routeList: SelfRouteObject[] = [];

Object.keys(allRoutes).forEach((key: string) => {
  const module = (allRoutes[key].default as SelfRouteObject) || {};
  const moduleList = Array.isArray(module) ? [...module] : [module];
  routeList.push(...moduleList);
});

const routers: SelfRouteObject[] = [
  {
    path: "/",
    name: "Main",
    element: <Navigate to="/home" replace />,
  },
  LoginRoute,
  ExceptionRoute,
  ...routeList,
  {
    path: "*",
    name: "Redirect",
    element: <Navigate to="/exception/404" />,
  },
];

const router = createBrowserRouter(routers);

export { routeList };
export default router;
