import React, { useEffect, createContext, useCallback, useContext, useMemo } from "react";
import { useNavigate} from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", null);
  const navigate = useNavigate();
  console.log('Getting value from local storage:', accessToken );

    // Function to verify the validity of the access token
    const isTokenValid = useCallback((token) => {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
        return decodedToken.exp > currentTime;
      } catch (error) {
        return false;
      }
    }, []);

  // call this function when you want to authenticate the user
  const handleLogin = useCallback(async (data) => {
    console.log('Setting accessToken:', data);
    const token = data.accessToken;
    setAccessToken(token);
    navigate("/", { replace: true });
  }, [setAccessToken, navigate]);

  // call this function to sign out logged in user
  const logout = useCallback(() => {
    setAccessToken(null);
    navigate("/login", { replace: true });
  }, [setAccessToken, navigate]);

    // Check if the stored token is valid during initialization
    useEffect(() => {
      if (accessToken && !isTokenValid(accessToken)) {
        // If the token is not valid, log the user out
        setAccessToken(null);
        navigate("/login", { replace: true });
      }
    }, [accessToken, isTokenValid, setAccessToken, navigate]);

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
