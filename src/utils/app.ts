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

interface Tree {
  id: number;
  disabled: boolean;
  [k: string]: unknown;
}
export const formatTreeData = (
  tree: Tree[] = [],
  childrenField: keyof Tree,
  id?: number | undefined | null
) => {
  if (id) {
    tree.forEach((item) => {
      item.disabled = false;
      if (item.id === id) {
        item.disabled = true;
        item[childrenField] = null;
      } else if ((item[childrenField] as Tree[])?.length) {
        formatTreeData(item[childrenField] as Tree[], childrenField, id);
      }
    });
  }
  return tree;
};
