import { Navigate, useLocation } from "react-router-dom";
import { useEnsureAuthLoaded } from "../app/hooks";
import { ROUTES } from "../utils/constants";

export default function ProtectedRoute({ children, roles }) {
  const location = useLocation();
  const { user, initialized } = useEnsureAuthLoaded();

  if (!initialized) {
    return <div className="p-6">Loading...</div>;
  }
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  if (roles && !roles.includes(user.role)) {

    if (user.role === "admin") return <Navigate to={ROUTES.ADMIN_DASH} replace />;
    if (user.role === "owner") return <Navigate to={ROUTES.OWNER_DASH} replace />;
    return <Navigate to={ROUTES.STORES} replace />;
  }
  return children;
}
