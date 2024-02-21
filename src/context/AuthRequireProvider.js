import { useAuth } from "../context/AuthProvider";
import { Navigate,useLocation } from "react-router-dom";
const RequireProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation()
  if (!currentUser) {
    return <Navigate to="/sign-in" state={{path: location.pathname}}/>;
  }
  return children;
};

export default RequireProvider;
