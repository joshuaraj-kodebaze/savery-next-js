// Import libraries
import { Checkbox, type CheckboxProps, useTheme } from "@mui/material";
import { faCheck } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import components
import { Icon } from "./checkbox.styles";

const CheckBox = (props: Omit<CheckboxProps, "disableRipple">) => {
  const theme = useTheme();

  return (
    <Checkbox
      sx={{
        padding: "0px",
        "&:hover": { bgcolor: "transparent" },
      }}
      disableRipple
      color="default"
      checkedIcon={
        <Icon>
          <FontAwesomeIcon
            icon={faCheck}
            style={{
              fontSize: 14,
              color: props.disabled
                ? theme.palette.text.disabled
                : theme.palette.primary.main,
            }}
          />
        </Icon>
      }
      icon={<Icon />}
      inputProps={{ "aria-label": "Checkbox demo" }}
      {...props}
    />
  );
};

export default CheckBox;
