// Import libraries
import { styled, Dialog, type DialogProps } from '@mui/material';

export const DialogBox = styled(Dialog)<DialogProps>(({ theme }) => ({
  '& .MuiModal-backdrop': {
    display: 'none',
  },
  '& .MuiPaper-root': {
    minWidth: 328,
    minHeight: 250,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 12,
    boxShadow: '0px 16px 32px 0px rgba(0, 0, 0, 0.08);',
    padding: 24,
  },
}));
