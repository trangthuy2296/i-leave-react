import React, { useEffect, createContext, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", null);
  const navigate = useNavigate();
  console.log('Getting value from local storage:', accessToken);

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

  useEffect(() => {
    
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        console.log("Decoded Token:", decodedToken);

        const isTokenExpired = decodedToken.exp && Date.now() >= decodedToken.exp * 1000;

        if (isTokenExpired) {
          console.log("Token expired. Clearing from local storage.");
          setAccessToken(null);
        } else {
          console.log("Token is still valid.");
        }

      } catch (error) {
        // Handle decoding errors, e.g., invalid token
        console.error("Error decoding accessToken:", error);
        setAccessToken(null);
      }
    }
  }, [accessToken, setAccessToken]);

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
  console.log('Current AuthContext:', context);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
