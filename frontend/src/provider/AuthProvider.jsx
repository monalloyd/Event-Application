import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const storedRoles = localStorage.getItem("roles");

  const [token, setToken] = useState(storedToken);
  const [roles, setRoles] = useState(storedRoles);

  const setAuthData = (newToken, newRoles) => {
    setToken(newToken);
    setRoles(newRoles);

    localStorage.setItem("token", newToken);
    localStorage.setItem("roles", newRoles);
  };

  useEffect(() => {
    if (!token || !roles) {
      localStorage.removeItem("token");
      localStorage.removeItem("roles");
    }
  }, [token, roles]);

  const contextValue = useMemo(
    () => ({
      token,
      roles,
      setAuthData,
    }),
    [token, roles]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;