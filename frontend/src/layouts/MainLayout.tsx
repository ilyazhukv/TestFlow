import { AppBar, Toolbar, Typography, Container, Box, Button, Avatar } from "@mui/material";
import { useAuth, useAppTheme } from "../hooks";
import { Link, Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import stringAvatar from "../components/DefaultAvatar";
import MaterialUISwitch from "../components/ThemeSwitch";

const API_URL = import.meta.env.VITE_API_URL

const MainLayout = () => {
  const { user, isAuth, logout } = useAuth();
  const { toggleTheme } = useAppTheme();
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
            <Typography variant="h6" component={Link} to="/" sx={{color: "inherit", textDecoration: "none"}}>TestFlow</Typography>
            <MaterialUISwitch checked={theme.palette.mode === 'dark'} onClick={toggleTheme}></MaterialUISwitch>
          </Box>
          <Box sx={{ display: "flex", gap: 4, mx: "auto" }}>
            <Button component={Link} to="/" color="inherit">Home</Button>
            <Button component={Link} to="/tests" color="inherit">Tests</Button>
            <Button component={Link} to="/create" color="inherit">Create</Button>
          </Box>
          {isAuth ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'flex-end' }}>
              <Typography variant="h6">{user?.name}</Typography>
              {/* <Avatar src={user?.image ? `${API_URL}${user.image}` : undefined} {...stringAvatar(user?.name || "User")} /> */}
              <Avatar src={`${API_URL}/${user?.name}`} {...stringAvatar(`${user?.name}`)} alt="User Avatar" />
              <Button onClick={logout} color="inherit">Log Out</Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'flex-end' }}>
            <Button component={Link} to="/login" color="inherit">Log In</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ flex: 1, p: 4 }}>
        <Outlet/>
      </Container>
    </Box>
  );
};

export default MainLayout;