import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/store";

export const Guard = ({ children }: { children: ReactNode }) => {
  const whiteList: string[] = ["/login"];
  const { pathname } = useLocation();
  const {
    userInfo: { id },
  } = useAppSelector((state) => state.user);

  if (!id) {
    if (whiteList.includes(pathname)) {
      return <Navigate to="/login" replace />;
    } else {
      return <Navigate to={`/login?redirect=${pathname}`} replace />;
    }
  }

  return children;
};
