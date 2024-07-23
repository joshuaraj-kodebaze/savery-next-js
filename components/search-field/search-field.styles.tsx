// Import libraries
import { styled, TextField, type TextFieldProps } from "@mui/material";

// Import utils
import { COLORS } from "@/utils/colors";

export const SearchFieldInput = styled(TextField)<TextFieldProps>(
  ({ theme, value }) => ({
    width: 298,
    height: 32,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 24,
    "& .MuiOutlinedInput-root": {
      "& .MuiInputAdornment-root": {
        marginRight: 4,
      },
      "& fieldset": {
        borderColor: theme.palette.divider,
        borderRadius: 24,
        "&:hover": {
          borderColor: COLORS.mildGrey,
        },
      },
      "& input": {
        padding: value ? "7px 7px 7px 0" : "7px 16px 7px 0",
        fontSize: 12,
        "&::placeholder": {
          color: theme.palette.text.secondary,
        },
      },
      "&.Mui-focused fieldset": {
        border: `1px solid ${COLORS.mildGrey}`,
      },
      "&:hover fieldset": {
        borderColor: COLORS.mildGrey,
      },
    },
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 120px)",
    },
  })
);
