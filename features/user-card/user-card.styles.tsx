// Import libraries
import {
  styled,
  Typography,
  type TypographyProps,
} from '@mui/material';

export const Username = styled(Typography)<TypographyProps>(() => ({
  fontSize: '12px',
  fontWeight: 400,
}));

export const Role = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    fontSize: '10px',
    fontWeight: 400,
    color: theme.palette.text.secondary,
  })
);
