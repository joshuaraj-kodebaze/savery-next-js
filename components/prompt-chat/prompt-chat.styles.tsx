// Import libraries
import {
  styled,
  Typography,
  Box,
  type TypographyProps,
  type BoxProps,
} from "@mui/material";

// Import utils
import { COLORS } from "@/utils/colors";

export const PromptContainer = styled("div")(() => ({
  width: "fit-content",
  padding: "16px 12px",
  borderRadius: "0px 8px 8px 8px",
  gap: "10px",
}));

export const TextContainer = styled("div")(({ theme }) => ({
  fontSize: "12px",
  fontWeight: 400,
  color: theme.palette.text.primary,
  wordBreak: "break-word",
  width: "fit-content",
  marginBottom: 5,
}));

export const Username = styled(Typography)<TypographyProps>(() => ({
  fontSize: "10px",
  fontWeight: 400,
  alignItems: "center",
  display: "flex",
}));

export const PromptList = styled("ul")(() => ({
  marginLeft: "calc(0px - 1.5rem)",
  marginTop: 12,
}));

export const PromptListItem = styled("li")(({ theme }) => ({
  display: "block",
  position: "relative",
  paddingLeft: "calc(2 * 1rem - 18px)",
  marginBottom: 8,
  "&:last-child": {
    borderColor: "transparent",
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: "calc(54px / -2)",
    left: -2,
    width: "calc(1rem + 0px)",
    height: "calc(1rem + 30px)",
    border: `solid ${theme.palette.text.disabled}`,
    borderWidth: "0 0 1px 1px",
    zIndex: -1,
  },
}));

export const PromptListItemContainer = styled(Box)<BoxProps>(() => ({
  fontSize: 12,
  border: `1px solid ${COLORS.mildBlue}`,
  borderRadius: 8,
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 12px",
  backgroundColor: COLORS.white,
}));
