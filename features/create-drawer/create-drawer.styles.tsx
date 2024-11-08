import { styled, Typography, type TypographyProps } from "@mui/material";

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
