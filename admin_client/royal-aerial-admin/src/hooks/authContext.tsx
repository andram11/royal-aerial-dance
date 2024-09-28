// AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { LoginResponse } from "../types/types"; // Assuming you have a type for login response

interface AuthContextType {
  user: LoginResponse | null;
  login: (user: LoginResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);

  const login = (userData: LoginResponse) => {
    setUser(userData);
    // // Optionally, store the user data in localStorage for persistence
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
