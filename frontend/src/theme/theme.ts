import { createTheme, type PaletteMode } from "@mui/material";

export const theme = (mode: PaletteMode) => createTheme({
  ...(mode === "dark" ? {
    palette: {
      mode,
      primary: {
        main: '#FCD34D',
        light: '#FDE68A',
        dark: '#B45309',
        contrastText: '#1F2937'
      },
      secondary: {
        main: '#F472B6',
        light: '#F9A8D4',
        dark: '#EC4899',
        contrastText: '#fff'
      },
      error: {
        main: '#EF4444'
      },
      warning: {
        main: '#F59E0B'
      },
      success: {
        main: '#22C55E'
      },
      text: {
        primary: '#F1F5F9',
        secondary: '#94A3B8'
      },
      divider: '',
      background: {
        default: '#1E293B',
        paper: '#0F172A'
      }
    }
  } : {
    palette: {
      mode,
      primary: {
        main: '#FBBF24',
        light: '#FCD34D',
        dark: '#B45309',
        contrastText: '#1F2937'
      },
      secondary: {
        main: '#F472B6',
        light: '#F9A8D4',
        dark: '#EC4899',
        contrastText: '#FFF'
      },
      error: {
        main: '#EF4444'
      },
      warning: {
        main: '#F59E0B'
      },
      success: {
        main: '#22C55E'
      },
      text: {
        primary: '#1F2937',
        secondary: '#4B5563'
      },
      divider: '',
      background: {
        default: '#FFF7ED',
        paper: '#FFFFFF'
      }
    }
  })
})

export default theme;