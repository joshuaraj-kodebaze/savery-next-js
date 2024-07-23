// Import libraries
import { styled } from '@mui/material';

export const Icon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 24,
  height: 24,
  border: `1px solid ${theme.palette.text.primary}`,
  boxShadow: 'none',
  'input:disabled ~ &': {
    border: `1px solid ${theme.palette.text.disabled}`,
  },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const CheckedIcon = styled(Icon)(({ theme }) => ({
  '&::before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    content: '""',
    'input:disabled ~ &': {
      backgroundColor: theme.palette.text.disabled,
    },
  },
}));
