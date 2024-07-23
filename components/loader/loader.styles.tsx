// Import libraries
import { styled } from '@mui/material';

export const CircularLoader = styled('div')(({ theme }) => ({
  fontSize: '12px',
  animation: 'spin 2s linear infinite',
  borderRadius: '50%',
  width: 'fit-content',
  color: theme.palette.primary.main,

  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}));
