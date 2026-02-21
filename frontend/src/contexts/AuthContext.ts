import { createContext } from "react";

export interface User {
  _id: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAuth: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);