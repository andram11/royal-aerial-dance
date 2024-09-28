// AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { LoginResponse } from "../types/types"; 
import { logoutUser } from "../api/api";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: LoginResponse | null;
  loggedIn: boolean;
  login: (user: LoginResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const navigate= useNavigate()

  const login = (userData: LoginResponse) => {
    setUser(userData);
    setLoggedIn(true)
    // // Optionally, store the user data in localStorage for persistence
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async() => {
    try {
        await logoutUser()
        setLoggedIn(false)
        setUser(null);
        localStorage.removeItem("user");
        navigate("/")

    } catch (err){
        throw err
    }
    
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
