// Import libraries
import { styled, Input, type InputProps } from '@mui/material';

export const TextFieldInput = styled(Input)<InputProps>(
  ({ theme }) => ({
    width: '100%',
    height: 32,
    padding: '5.5px 8px',
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.common.white,
    fontSize: 12,
    borderRadius: 4,
    '&:before': {
      display: 'none',
    },
    '&:after': {
      display: 'none',
    },
  })
);
