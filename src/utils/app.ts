import { SelfRouteObject } from "@/router/types";

export const searchRoute = (
  path: string,
  routes: SelfRouteObject[] = []
): SelfRouteObject | null => {
  for (const route of routes) {
    if (route.path === path) return route;
    if (route.children?.length) {
      const result = searchRoute(path, route.children);
      if (result) return result;
    }
  }
  return null;
};
