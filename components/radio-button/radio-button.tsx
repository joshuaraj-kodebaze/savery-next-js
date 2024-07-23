// Import libraries
import { Radio, type RadioProps } from '@mui/material';

// Import components
import { Icon, CheckedIcon } from './radio-button.styles';

const RadioButton = (props: RadioProps) => {
  return (
    <Radio
      disableRipple
      checkedIcon={<CheckedIcon />}
      icon={<Icon />}
      {...props}
      {...props}
    />
  );
};

export default RadioButton;
