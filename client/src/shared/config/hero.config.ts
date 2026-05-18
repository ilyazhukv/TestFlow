import { heroui } from "@heroui/theme";

export default heroui({
  themes: {
    light: {
      colors: {
        background: "#F5F5F5",
        foreground: "#1A1A2E",
        primary: {
          DEFAULT: "#5932EA",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#00C8B0",
          foreground: "#FFFFFF",
        },
        danger: {
          DEFAULT: "#FF3366",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#FF8800",
          foreground: "#1A1A2E",
        },
        success: {
          DEFAULT: "#2ECC71",
          foreground: "#FFFFFF",
        },
        focus: "#5932EA",
      },
    },
    dark: {
      colors: {
        background: "#0F0F23",
        foreground: "#EAEAEA",
        primary: {
          DEFAULT: "#7B5CFA",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#00D4BD",
          foreground: "#FFFFFF",
        },
        danger: {
          DEFAULT: "#FF4777",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#FF9922",
          foreground: "#1A1A2E",
        },
        success: {
          DEFAULT: "#3DDC84",
          foreground: "#FFFFFF",
        },
        focus: "#7B5CFA",
      },
    },
  },
});