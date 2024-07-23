// Import libraries
import { styled, Popover, type PopoverProps } from '@mui/material';

export const StyledPopover = styled(Popover)<PopoverProps>(
  ({ theme }) => ({
    '& .MuiPaper-root': {
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: 'none',
      '& div': {
        padding: '8px 12px',
        borderBottom: `1px solid ${theme.palette.divider}`,
        fontSize: 12,
        cursor: 'pointer',
      },
    },
  })
);
