// Import libraries
import { styled } from '@mui/material';

type PromptInputContainerProps = {
  isMultiLine?: boolean;
};

export const PromptInputContainer = styled(
  'div'
)<PromptInputContainerProps>(({ theme, isMultiLine }) => ({
  minWidth: 200,
  height: 'fit-content',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 24,
  border: `1px solid ${theme.palette.divider}`,
  padding: '8px 8px 8px 6px',
  display: 'flex',
  gap: 12,
  justifyContent: 'space-between',
  alignItems: isMultiLine ? 'flex-end' : 'center',
  flexDirection: isMultiLine ? 'column' : 'row',
  position: 'absolute',
  bottom: 24,
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    bottom: 14,
  },
}));

export const PromptTextAresField = styled(
  'textarea'
)<PromptInputContainerProps>(({ theme, isMultiLine }) => ({
  width: isMultiLine ? '100%' : 'calc(100% - 110px)',
  paddingLeft: 10,
  border: 'none',
  backgroundColor: theme.palette.common.white,
  fontSize: 14,
  borderRadius: 24,
  resize: 'none',
  '&:focus-visible': {
    outline: 'none',
  },
  fontFamily: '"Titillium Web", sans-serif',
}));
