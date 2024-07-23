// Import libraries
import {
  styled,
  Typography,
  type TypographyProps,
} from '@mui/material';

export const HtmlContainer = styled('div')(({ theme }) => ({
  whiteSpace: 'pre',
  padding: '15px',
  borderRadius: '0px 8px 8px 8px',
  fontSize: '12px',
  fontWeight: 400,
  color: theme.palette.common.white,
  wordBreak: 'break-word',
  width: 'fit-content',
}));

export const IconContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  padding: '0px 0px',
  borderRadius: '100px',
  height: '24px',
  width: '24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const CopyCodeContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  padding: '2px 10px',
  margin: '5px 0px',
  borderRadius: '20px',
  color: theme.palette.common.white,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'fit-content',
  fontSize: '10px',
  fontWeight: 400,
  cursor: 'pointer',
}));

export const Username = styled(Typography)<TypographyProps>(() => ({
  fontSize: '10px',
  fontWeight: 400,
  alignItems: 'center',
  display: 'flex',
}));
