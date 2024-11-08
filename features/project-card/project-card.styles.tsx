// Import libraries
import {
  styled,
  Typography,
  type BoxProps,
  type TypographyProps,
} from "@mui/material";

// Import utils
import { COLORS } from "@/utils/colors";

export const Card = styled("div")<BoxProps>(({ theme }) => ({
  width: 182,
  height: 208,
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.common.white,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: 24,
  // cursor: 'pointer',
  // '&:hover': {
  //   borderColor: COLORS.mildGrey,
  // },
  [theme.breakpoints.down("sm")]: {
    width: "calc(50% - 8px)",
  },
}));

export const Title = styled(Typography)<TypographyProps>(() => ({
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
  // textTransform: "capitalize",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export const MembersCount = styled(Typography)<TypographyProps>(() => ({
  fontSize: "12px",
  color: COLORS.mildGrey,
}));
