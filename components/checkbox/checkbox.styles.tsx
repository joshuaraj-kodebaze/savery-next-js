// Import libraries
import { styled } from '@mui/material';

export const Icon = styled('span')(({ theme }) => ({
  borderRadius: 2,
  width: 24,
  height: 24,
  boxShadow: 'none',
  border: `1px solid ${theme.palette.text.primary}`,
  'input:disabled ~ &': {
    border: `1px solid ${theme.palette.text.disabled}`,
  },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
