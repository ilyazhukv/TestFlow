import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { isAuth, user, isLoading } = useAuth();

  if (isLoading) return <h2>Loafing...</h2>

  if (!isAuth) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user!.role))
    return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
