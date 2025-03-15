import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { CONSTANTS } from "../config/constants";

interface AuthContextType {
  accessToken: string | null;
  userId: string | null;
  userName: string | null;
  login: (token: string, id: string, name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {


  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const login = (token: string, id: string, name: string) => {
    setAccessToken(token);
    setUserId(id);
    setUserName(name);

    localStorage.setItem(CONSTANTS.storageKeys.accessToken, token);
    localStorage.setItem(CONSTANTS.storageKeys.userId, id);
    localStorage.setItem(CONSTANTS.storageKeys.userName, name);
  };

  const logout = () => {
    console.log('logout')
    setAccessToken(null);
    setUserId(null);
    setUserName(null);

    localStorage.removeItem(CONSTANTS.storageKeys.accessToken);
    localStorage.removeItem(CONSTANTS.storageKeys.userId);
    localStorage.removeItem(CONSTANTS.storageKeys.userName);
    window.location.href = '/';
  };

  useEffect(() => {
    const storedToken = localStorage.getItem(CONSTANTS.storageKeys.accessToken);
    const storedUserId = localStorage.getItem(CONSTANTS.storageKeys.userId);
    const storedUserName = localStorage.getItem(CONSTANTS.storageKeys.userName);

    if (storedToken && storedUserId && storedUserName) {
      setAccessToken(storedToken);
      setUserId(storedUserId);
      setUserName(storedUserName);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, userId, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
