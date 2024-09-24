import type { RouteObject } from "react-router-dom";
export interface MetaProps {
  title: string;
  key?: string;
  icon?: string;
  keepAlive?: boolean;
  orderNo?: number;
  hideMenu?: boolean;
  hideChildMenu?: boolean;
}

export type SelfRouteObject = RouteObject & {
  name: string;
  meta?: MetaProps;
  children?: SelfRouteObject[];
};

export interface RouteModule {
  default: SelfRouteObject;
}
