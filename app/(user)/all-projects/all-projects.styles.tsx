// Import libraries
import { styled, type BoxProps } from "@mui/material";

// Import utils
import { COLORS } from "@/utils/colors";

export const AddProjectButton = styled("div")<BoxProps>(({ theme }) => ({
  width: 182,
  height: 208,
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  "&:hover": {
    borderColor: COLORS.mildGrey,
  },
  [theme.breakpoints.down("sm")]: {
    width: "calc(50% - 8px)",
  },
}));

export const SectionToolBar = styled("div")<BoxProps>(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 32,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: 12,
  },
}));
