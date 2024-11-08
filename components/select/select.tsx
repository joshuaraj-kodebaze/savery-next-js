// Import libraries
import { Box, Typography, type SelectProps } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/pro-regular-svg-icons";
// Import components
import { SelectInput } from "./select.styles";

type TSelectInput = {
  label: string;
  labelFontSize?: number;
  labelFontWeight?: number;
} & SelectProps;

const Select = (props: TSelectInput) => {
  const {
    label,
    placeholder = "Type here",
    labelFontSize = 12,
    labelFontWeight = 400,
  } = props;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Typography sx={{ fontSize: labelFontSize, fontWeight: labelFontWeight }}>
        {label}
      </Typography>
      <SelectInput
        placeholder={placeholder}
        {...props}
        IconComponent={() => (
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{ fontSize: 14, paddingRight: 8 }}
          />
        )}
      />
    </Box>
  );
};

export default Select;
