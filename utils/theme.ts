"use client";
import { Titillium_Web } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { COLORS } from "./colors";

const titilliumWeb = Titillium_Web({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: titilliumWeb.style.fontFamily,
    allVariants: {
      color: COLORS.darkBlue,
    },
  },
  palette: {
    common: {
      white: COLORS.white,
      black: COLORS.black,
    },
    primary: {
      main: COLORS.purple,
      dark: COLORS.darkPurple,
    },
    text: {
      primary: COLORS.darkBlue,
      secondary: COLORS.lightGray,
      disabled: COLORS.mediumGray,
    },
    divider: COLORS.slightDarkGray,
    background: {
      paper: COLORS.white,
      default: COLORS.midGray,
    },
    action: {
      active: COLORS.darkPurple,
      hover: COLORS.darkPurple,
      selected: COLORS.darkPurple,
      disabled: COLORS.mediumGray,
      disabledBackground: COLORS.mediumGray,
      focus: COLORS.darkPurple,
    },
  },
});

export default theme;
