import { Navigate } from "react-router-dom";
import { AuthProvider } from './AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user } = AuthProvider();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/Login" />;
  }
  return children;
};
