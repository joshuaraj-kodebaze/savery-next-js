// Import libraries
import { styled, Typography, type TypographyProps } from "@mui/material";

export const ButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  padding: "7px 32px;",
  backgroundColor: theme.palette.common.white,
  borderRadius: 100,
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.text.disabled}`,
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

export const SectionHeader = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    fontSize: "14px",
    fontWeight: 600,
    marginBottom: "10px",
  })
);

export const SectionText = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: "12px",
  fontWeight: 400,
  marginBottom: "10px",
}));

export const RemainingCreditsContainer = styled("div")(({ theme }) => ({
  display: "inline-flex",
  padding: "24px",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "8px",
  borderRadius: "8px",
  border: "1px solid #EBEBEB",
  background: "#FFF",
  height: "fit-content",
}));
