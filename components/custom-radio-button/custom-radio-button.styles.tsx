// Import libraries
import { styled } from '@mui/material';

export const Icon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 18,
  height: 18,
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
    width: 11,
    height: 11,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    content: '""',
    'input:disabled ~ &': {
      backgroundColor: theme.palette.text.disabled,
    },
  },
}));
