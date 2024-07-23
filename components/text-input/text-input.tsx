// Import libraries
import { Box, Typography, type InputProps } from '@mui/material';

// Import components
import { TextFieldInput } from './text-input.styles';

type TTextInput = {
  label: string;
} & InputProps;

const TextInput = (props: TTextInput) => {
  const { label, placeholder = 'Type here' } = props;

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
    >
      <Typography sx={{ fontSize: '12px' }}>{label}</Typography>
      <TextFieldInput placeholder={placeholder} {...props} />
    </Box>
  );
};

export default TextInput;
