import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTitle as usePageTitle } from "ahooks";
import { routeList } from "@/router";
import { searchRoute } from "@/utils/app";
import { appConfig } from "@/config";

export const useTitle = () => {
  const [title, setTitle] = useState("AMS");
  const { pathname } = useLocation();
  useEffect(() => {
    const route = searchRoute(pathname, routeList);
    setTitle(
      route
        ? `${appConfig.appName}-${route?.meta?.title as string}`
        : appConfig.appName
    );
  }, [pathname]);

  usePageTitle(title);
};
