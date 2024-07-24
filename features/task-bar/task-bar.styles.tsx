// Import libraries
import {
  styled,
  Drawer,
  Typography,
  type DrawerProps,
  type TypographyProps,
} from "@mui/material";

export const TaskbarContainer = styled(Drawer)<DrawerProps>(({ theme }) => ({
  "& .MuiPaper-root": {
    width: 295,
    height: "100vh",
    borderLeft: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
    paddingTop: 50,
    paddingBottom: 24,
    overflow: "hidden",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
}));

export const Title = styled(Typography)<TypographyProps>(() => ({
  fontSize: "14px",
  fontWeight: 600,
}));

export const MainTaskName = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    fontSize: "12px",
    fontWeight: 600,
    color: theme.palette.common.black,
    lineHeight: "24px",
  })
);

export const TaskName = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: "10px",
  fontWeight: 400,
  color: theme.palette.common.black,
  lineHeight: "24px",
}));

export const TaskStatus = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: "10px",
  fontWeight: 400,
  color: theme.palette.text.secondary,
}));
