import { createContext, useContext, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("accessToken", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = useCallback(async (data) => {
    setUser(data);
    navigate("/", { replace: true });
  }, [setUser, navigate]);

  // call this function to sign out logged in user
  const logout = useCallback(() => {
    setUser(null);
    navigate("/login", { replace: true });
  }, [setUser, navigate]);


  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user, login, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};