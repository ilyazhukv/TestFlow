export interface User {
  _id?: string;
  name: string;
  email: string;
  role: "user" | "admin";
  image: string;
  createdAt?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}