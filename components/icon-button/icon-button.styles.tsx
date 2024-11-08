// Import libraries
import { styled } from "@mui/material";
import { Button, type ButtonProps } from "@mui/material";

export const StyledIconButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.text.primary,
  minWidth: "fit-content",
  height: "fit-content",
  borderRadius: 24,
  padding: 0,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "transparent",
    "& svg": {
      color: theme.palette.primary.main,
    },
  },
}));
