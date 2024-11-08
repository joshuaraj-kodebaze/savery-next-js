// Import libraries
import {
  styled,
  Typography,
  type TypographyProps,
  type BoxProps,
} from "@mui/material";

// Import utils
import { COLORS } from "@/utils/colors";

export const IconCard = styled("div")<BoxProps>(({ theme }) => ({
  width: "40px",
  height: "40px",
  backgroundColor: COLORS.purple,
  borderRadius: "6px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& span": {
    color: COLORS.white,
    fontSize: "18px",
    textTransform: "capitalize",
  },
}));

export const MembersCount = styled(Typography)<TypographyProps>(() => ({
  fontSize: "12px",
  color: COLORS.darkBlue,
}));

export const Status = styled(Typography)<TypographyProps>(() => ({
  fontSize: "12px",
  color: COLORS.mildGrey,
}));

export const IconCardSmall = styled("div")<BoxProps>(({ theme }) => ({
  width: "16px",
  height: "16px",
  backgroundColor: COLORS.purple,
  borderRadius: "3px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& span": {
    color: COLORS.white,
    fontSize: "12px",
  },
}));

export const DropdownOption = styled(Typography)<TypographyProps>(() => ({
  fontSize: "12px",
  "&:hover": {
    color: COLORS.purple,
  },
}));
