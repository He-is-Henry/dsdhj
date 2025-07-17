import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/UserContext";
const RequireAuth = ({ allowedRoles }) => {
  const { user, checked, error } = useAuth();
  const location = useLocation();

  return !checked ? (
    <p>Checking user details...</p>
  ) : allowedRoles.find((ar) => user?.roles?.includes(ar)) ? (
    <Outlet />
  ) : user ? (
    <Navigate to={"/unauthorized"} />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
