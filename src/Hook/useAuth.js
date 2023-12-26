import { createContext, useCallback, useContext, useMemo } from "react";
import { useNavigate, Outlet} from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children, initialAccessToken }) => {
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", initialAccessToken || "");
  const navigate = useNavigate();
  console.log('Initial accessToken from AuthProvider:', initialAccessToken);
  console.log('Getting value from local storage:', accessToken, initialAccessToken );

  // call this function when you want to authenticate the user
  const login = useCallback(async (data) => {
    console.log('Setting accessToken:', data);
    setAccessToken(data);
    navigate("/", { replace: true });
  }, [setUser, navigate]);

  // call this function to sign out logged in user
  const logout = useCallback(() => {
    setAccessToken(null);
    navigate("/login", { replace: true });
  }, [setAccessToken, navigate]);



  const value = useMemo(
    () => ({
      accessToken,
      handleLogin,
      logout
    }),
    [accessToken, handleLogin, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  // Log the current context for debugging
  console.log('Current AuthContext:', context);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};