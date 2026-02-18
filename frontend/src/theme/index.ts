import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3'
    },
    background: {
      default: '#f4f6f8'
    }
  },
  shape: {
    borderRadius: 12
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem'
    },
    button: {
      textTransform: 'none'
    }
  }
});

export default theme;