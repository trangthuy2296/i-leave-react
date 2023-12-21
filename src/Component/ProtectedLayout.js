import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../Hook/useAuth";

export const ProtectedLayout = () => {
    const { user } = useAuth();
    const outlet = useOutlet();
  
    if (!user) {
      return <Navigate to="/" />;
    }
  
  };