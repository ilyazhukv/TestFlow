import { AppBar, Toolbar, Typography, Container, Box, Button } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { Link, Outlet } from "react-router-dom";

const MainLayout = () => {
  const { user, isAuth, logout } = useAuth();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static" sx={{height: "65px", display: "flex", justifyContent: "space-between"}}>
        <Toolbar sx={{mx: "1%", justifyContent: "space-around"}}>
          <Typography variant="h6">TestFlow</Typography>
          {isAuth ? (
            <>
            <Typography variant="h6">Hi {user?.name}</Typography>
            <Button color="inherit" onClick={logout}>Log Out</Button>
            </>
          ) : (
            <Button component={Link} to={"/"} color="inherit">Log In</Button>
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