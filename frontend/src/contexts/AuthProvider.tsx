import { useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

import { AuthContext, type User } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: User = jwtDecode(token);
        return decoded;
      } catch {
        localStorage.removeItem("token");
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    try {
      setUser(jwtDecode(token));
    } catch {
      localStorage.removeItem("token");
    }
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuth: !!user, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
