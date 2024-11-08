// Import libraries
import { COLORS } from "@/utils/colors";
import { styled, type BoxProps, type TypographyProps } from "@mui/material";

export const Card = styled("div")<BoxProps>(({ theme }) => ({
  width: "100%",
  height: 75,
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.common.white,
  display: "flex",
  justifyContent: "space-between",
  padding: 16,
  [theme.breakpoints.down("sm")]: {
    width: "calc(50% - 8px)",
  },
}));

export const Label = styled("span")<TypographyProps>(({ theme }) => ({
  fontSize: 12,
  color: COLORS.mildGrey,
}));
