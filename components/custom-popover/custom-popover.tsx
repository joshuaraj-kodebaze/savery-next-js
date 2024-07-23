// Import libraries
import { type PopoverProps } from '@mui/material';

// Import components
import { StyledPopover } from './custom-popover.styles';

const CustomPopover = (props: PopoverProps) => {
  return <StyledPopover {...props}>{props.children}</StyledPopover>;
};

export default CustomPopover;
