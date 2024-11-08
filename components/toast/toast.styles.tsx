// Import libraries
import { styled, Snackbar, type SnackbarProps } from "@mui/material";

export const ToastBar = styled(Snackbar)<SnackbarProps>(({ theme }) => ({
  ".MuiPaper-root": {
    borderRadius: "6px",
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    textAlign: "center",
  },
  ".MuiSnackbarContent-message": {
    margin: "0 auto",
  },
}));
