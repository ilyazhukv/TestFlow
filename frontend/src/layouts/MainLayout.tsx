import { AppBar, Toolbar, Typography, Container, Box, Button } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { Link, Outlet } from "react-router-dom";

const MainLayout = () => {
  const { user, isAuth, logout } = useAuth();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Test Flow</Typography>
          {isAuth ? (
            <>
            <Typography variant="h6">Hi {user?.name}</Typography>
            <Button color="inherit" onClick={logout}>Log Out</Button>
            </>
          ) : (
            <Link to={"/"} color="inherit">Log In</Link>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        <Outlet/>
      </Container>
    </Box>
  );
};

export default MainLayout;