// Import libraries
import {
  styled,
  Typography,
  Drawer,
  Box,
  type DrawerProps,
  type TypographyProps,
  type BoxProps,
} from "@mui/material";
import Link from "next/link";

// Import types
import { TNavLink, TSectionTitle, TSideBarContainer } from "./side-bar.types";

export const SideBarContainer = styled(Drawer)<TSideBarContainer>(
  ({ theme, isWorkspaceActive }) => ({
    "& .MuiPaper-root": {
      width: 208,
      height: "100vh",
      borderRight: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.default,
      paddingTop: isWorkspaceActive ? 50 : 74,
      paddingBottom: 24,
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      zIndex: 8,
    },
  })
);

export const SideBarInnerContainer = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "calc(100vh - 74px)",
}));

export const SectionTitle = styled(Typography)<TSectionTitle>(
  ({ isFirst, isWorspaceActive }) => ({
    textTransform: "capitalize",
    padding: "0 12px",
    fontSize: 12,
    fontWeight: 700,
    margin: isFirst ? (isWorspaceActive ? "0px" : "0px 0 25px") : "16px 0 25px",
  })
);

export const NavLink = styled(Link)<TNavLink>(
  ({ theme, disabled, isactivelink }) => ({
    padding: isactivelink ? "0 21px" : "0px 24px",
    color: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
    fontSize: 14,
    fontWeight: isactivelink ? 700 : "normal",
    borderLeft: isactivelink
      ? `3px solid ${theme.palette.primary.main}`
      : "none",
    pointerEvents: disabled ? "none" : "auto",
    textDecoration: "none",
    "& p": {
      fontSize: 14,
    },
  })
);
