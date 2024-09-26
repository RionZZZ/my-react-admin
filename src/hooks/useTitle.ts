import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTitle as usePageTitle } from "ahooks";
import { routeList } from "@/router";
import { searchRoute } from "@/utils/app";

export const useTitle = () => {
  const [title, setTitle] = useState("AMS");
  const { pathname } = useLocation();
  useEffect(() => {
  const route = searchRoute(pathname, routeList);
    setTitle(`AMS-${route?.meta?.title as string}`);
  }, [pathname]);

  usePageTitle(title);
};
