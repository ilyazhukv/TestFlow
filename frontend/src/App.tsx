import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import ThemeModeProvider from "./contexts/ThemeProvider";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CreateTest from "./pages/Test/CreateTest";

function App() {
  return (
    <ThemeModeProvider>
      <CssBaseline />
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
            <Route path="/create" element={<CreateTest />}/>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}></Route>

          <Route path="/" element={<Dashboard />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </ThemeModeProvider>
  );
}

export default App;
