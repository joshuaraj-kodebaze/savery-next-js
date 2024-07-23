// Import libraries
import { Checkbox, type CheckboxProps } from '@mui/material';

// Import components
import { Icon } from './custom-radio-button.styles';
import { CheckedIcon } from './custom-radio-button.styles';

const CustomRadioButton = (
  props: Omit<CheckboxProps, 'disableRipple'>
) => {
  return (
    <Checkbox
      sx={{
        '&:hover': { bgcolor: 'transparent' },
      }}
      disableRipple
      color="default"
      checkedIcon={<CheckedIcon />}
      icon={<Icon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  );
};

export default CustomRadioButton;
