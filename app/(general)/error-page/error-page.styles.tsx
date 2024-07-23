// Import libraries
import { styled, type BoxProps } from '@mui/material';

export const ErrorPageContainer = styled('div')<BoxProps>(() => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: -100,
}));
