import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../Hook/useAuth";

export const HomeLayout = () => {
  const { accessToken } = useAuth();
  const outlet = useOutlet();

  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      {outlet}
    </div>
  );
};
