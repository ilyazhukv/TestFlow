export interface User {
  _id?: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}