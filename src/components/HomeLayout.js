import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const HomeLayout = () => {
  const { accessToken } = useAuth();
  const outlet = useOutlet();

  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      {outlet}
    </div>
  );
};