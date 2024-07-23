// Import libraries
import { styled, Button, type ButtonProps } from '@mui/material';

export const StyledButton = styled(Button)<ButtonProps>(
  ({ theme }) => ({
    minWidth: 89,
    height: 32,
    borderRadius: 24,
    textTransform: 'capitalize',
    fontSize: 12,
    fontWeight: 600,
    boxShadow: 'none !important',
    lineHeight: 'inherit !important',
    [theme.breakpoints.down('sm')]: {
      minWidth: 110,
    },
  })
);
