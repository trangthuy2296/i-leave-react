import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = useCallback(async (data) => {
    setAccessToken(data);
    navigate("/", { replace: true });
  }, [setAccessToken, navigate]);

  // call this function to sign out logged in user
  const logout = useCallback(() => {
    setAccessToken(null);
    navigate("/Login", { replace: true });
  }, [setAccessToken, navigate]);


  const value = useMemo(
    () => ({
      user: accessToken,
      login,
      logout
    }),
    [accessToken, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
