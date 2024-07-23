// Import libraries
import { styled } from '@mui/material';

export const Container = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '70vh',
  marginLeft: 0,
  flexDirection: 'column',
  gap: 12,
}));

export const ContactContainer = styled('div')(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
  width: 327,
  marginTop: 10,
  marginBottom: 10,
  fontWeight: 400,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.text.secondary,
  textAlign: 'center',
}));

export const SamlButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  alignItems: 'center',
  gap: 10,
  width: 327,
  marginTop: 15,
  height: 40,
  backgroundColor: theme.palette.text.primary,
  borderRadius: 100,
  fontWeight: 600,
  fontSize: 14,
  color: theme.palette.common.white,
  cursor: 'pointer',
}));
