import { createBrowserRouter, Navigate } from "react-router-dom";
import { RouteModule, SelfRouteObject } from "./types";

const allRoutes = import.meta.glob("./routes/*.tsx", {
  eager: true,
}) as Recordable<RouteModule>;

const routeList: SelfRouteObject[] = [];

Object.keys(allRoutes).forEach((key: string) => {
  const module = allRoutes[key].default || {};
  routeList.push(module);
});

const routers: SelfRouteObject[] = [
  {
    path: "/",
    name: "Main",
    element: <Navigate to="/home" replace />,
  },
  ...routeList,
  {
    path: "*",
    name: "Redirect",
    element: <Navigate to="/home" replace />,
  },
];

const router = createBrowserRouter(routers);

export { routeList };
export default router;
