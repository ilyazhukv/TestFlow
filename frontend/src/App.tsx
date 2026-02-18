import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme/index";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            element={<ProtectedRoute allowedRoles={["user", "admin"]} />}
          ></Route>
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}></Route>

          <Route path="/" element={<Dashboard />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
