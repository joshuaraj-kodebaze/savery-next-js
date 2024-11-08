// Import libraries
import {
  styled,
  Avatar,
  FormControlLabel,
  Typography,
  type AvatarProps,
  type FormControlLabelProps,
  type TypographyProps,
} from "@mui/material";

export const UserAvatar = styled(Avatar)<AvatarProps>(({ theme }) => ({
  backgroundColor: theme.palette.divider,
  color: "#000",
  width: 32,
  height: 32,
  fontSize: 14,
  fontWeight: 700,
}));

export const UploadButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  padding: "5px 15px",
  backgroundColor: theme.palette.text.primary,
  borderRadius: 100,
  color: theme.palette.common.white,
  cursor: "pointer",
}));

export const Title = styled(Typography)<TypographyProps>(() => ({
  fontSize: "14px",
  fontWeight: 600,
  marginLeft: "10px",
  marginTop: "-2.5px",
}));

export const InputLabel = styled(Typography)<TypographyProps>(() => ({
  fontSize: "12px",
  fontWeight: 400,
  marginBottom: "10px",
}));

export const CustomFormControlLabel = styled(
  FormControlLabel
)<FormControlLabelProps>(({ theme }) => ({
  "& .MuiFormControlLabel-label": {
    fontSize: "14px",
    color: theme.palette.text.secondary,
    fontWeight: 400,
  },
}));

export const SectionHeader = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    fontSize: "14px",
    fontWeight: 600,
    marginBottom: "10px",
  })
);

export const TableHeader = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const TableCell = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.text.secondary,
}));
