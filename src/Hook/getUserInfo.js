import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const useUserName = (accessToken) => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        setUserName(decodedToken.user.name); // Assuming 'name' is the property in your token containing the user's name
      } catch (error) {
        console.error("Error decoding accessToken:", error);
        setUserName(null);
      }
    } else {
      setUserName(null);
    }
  }, [accessToken]);

  return userName;
};

export default useUserName;
