// Import libraries
import { type DialogProps } from '@mui/material';

// Import components
import { DialogBox } from './dialog.styles';

const Dialog = (props: DialogProps) => {
  return <DialogBox {...props}>{props.children}</DialogBox>;
};

export default Dialog;
