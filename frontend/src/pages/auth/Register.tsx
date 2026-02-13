import { Container, Box, Typography, TextField, Button, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/api";

const Register = () => {
  const [formData, setFormData] = useState({name: "", email: "", password: ""});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (errorMsg) setErrorMsg(null);

    setFormData(() => ({
      ...formData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await api.post("/user/register", formData);
      navigate("/login")
    } catch (error: any) {
      console.error("Error:", error);
      const message = error.response?.data?.messege || "Something went wrong";
      setErrorMsg(message);
    }
  }

  return (
    <Container maxWidth="xs">
      {errorMsg && (
        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
          {errorMsg}
        </Alert>
      )}
      <Box sx={{mt: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Typography variant="h5" component="h1">Sign-Up</Typography>
        <Typography component="p">Welcome</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField name="email" value={formData.email} onChange={handleChange} label="Email" fullWidth margin="normal" required />
          <TextField name="name" value={formData.name} onChange={handleChange} label="Name" fullWidth margin="normal" required />
          <TextField name="password" value={formData.password} onChange={handleChange} label="Password" fullWidth margin="normal" type="password" required />
          <Button type="submit" variant="contained" fullWidth sx={{mt: 3, mb: 2}}>Sign Up</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Register;