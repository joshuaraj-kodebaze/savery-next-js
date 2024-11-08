// Import libraries
import { Box, CircularProgress, type ButtonProps } from "@mui/material";

// Import components
import { StyledButton } from "./button.styles";
import { COLORS } from "@/utils/colors";

type TButtonProps = {
  loading?: boolean;
} & ButtonProps;

const Button = (props: TButtonProps) => {
  return (
    <Box sx={{ position: "relative" }}>
      <StyledButton disableTouchRipple {...props}>
        {props.children}
      </StyledButton>
      {props.loading && (
        <CircularProgress
          size={24}
          sx={{
            color: COLORS.purple,
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
};

export default Button;
