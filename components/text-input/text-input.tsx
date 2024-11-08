// Import libraries
import { Box, Typography, type InputProps } from "@mui/material";

// Import components
import { TextFieldInput } from "./text-input.styles";

type TTextInput = {
  label?: string;
  labelFontSize?: number;
  labelFontWeight?: number;
} & InputProps;

const TextInput = (props: TTextInput) => {
  const {
    label,
    placeholder = "Type here",
    labelFontSize = 12,
    labelFontWeight = 400,
    error,
  } = props;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {label ? (
        <Typography
          sx={{ fontSize: labelFontSize, fontWeight: labelFontWeight }}
        >
          {label}
        </Typography>
      ) : (
        <></>
      )}
      <TextFieldInput placeholder={placeholder} {...props} />
      {error ? (
        <Typography
          sx={{
            fontSize: labelFontSize,
            fontWeight: labelFontWeight,
            color: "red",
          }}
        >
          Please enter a value
        </Typography>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default TextInput;
