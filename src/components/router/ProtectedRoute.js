import { useAuthContext } from "../../hooks/useAuthContext";
import { useLocation, Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, authIsReady } = useAuthContext();
  let location = useLocation();

  if(authIsReady){
    if(authIsReady){
      if (!user) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
      }
    } else {
      return <Navigate to="/404" state={{ from: location }} replace />;
    }
  }

  return (
    authIsReady && (children)
  );
}
