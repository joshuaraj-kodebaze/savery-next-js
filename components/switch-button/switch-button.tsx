// Import libraries
import { type SwitchProps } from '@mui/material';

// Import components
import { StyledSwitch } from './switch-button.styles';

const SwitchButton = (props: SwitchProps) => {
  return (
    <StyledSwitch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  );
};

export default SwitchButton;
