import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import api from "../../api/api";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (errorMsg) setErrorMsg(null);

    setFormData(() => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resp = await api.post("/user/register", formData);
      const { token } = resp.data;
      login(token);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error:", error);
        const message = error.response?.data?.message || "Something went wrong";
        setErrorMsg(message);
      }
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {errorMsg && (
        <Alert severity="error" sx={{ width: "45%", mb: 2 }}>
          {errorMsg}
        </Alert>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="h1">
          Sign-Up
        </Typography>
        <Typography component="p">
          Enter your email, name and password
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="email"
            value={formData.email}
            onChange={handleChange}
            label="Email"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="name"
            value={formData.name}
            onChange={handleChange}
            label="Name"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="password"
            value={formData.password}
            onChange={handleChange}
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Typography component="p">
            Have an account?{" "}
            <Box component="span">
              <Link to="/login">Login</Link>
            </Box>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
