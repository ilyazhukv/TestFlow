import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { selectSession } from "./session.model";

import { pathKeys } from "@/shared/router";

export function PortectedRoute() {
  const isAuth = useSelector(selectSession);

  return isAuth ? <Outlet /> : <Navigate replace to={pathKeys.login} />;
}

export function GuestRoute() {
  const isAuth = useSelector(selectSession);

  return !isAuth ? <Outlet /> : <Navigate replace to={pathKeys.home} />;
}
