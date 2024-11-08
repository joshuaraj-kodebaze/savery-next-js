// Import libraries
import { styled, Select, type SelectProps } from "@mui/material";

export const SelectInput = styled(Select)<SelectProps>(({ theme }) => ({
  width: "50%",
  height: 32,
  padding: "5.5px 0px",
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.common.white,
  fontSize: 14,
  borderRadius: 4,
  "& fieldset": { border: "none" },
}));
