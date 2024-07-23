// Import libraries
import { styled } from '@mui/material';
import {
  Avatar,
  Box,
  AppBar,
  type AvatarProps,
  type BoxProps,
  type AppBarProps,
} from '@mui/material';

export const HeaderContainer = styled(AppBar)<AppBarProps>(
  ({ theme }) => ({
    height: 50,
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'row',
    zIndex: 99999,
  })
);

export const UserContainer = styled(Box)<BoxProps>(({ theme }) => ({
  width: 208,
  borderRight: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '14px 24px',
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('md')]: {
    width: 73,
    padding: '14px 12px',
    gap: 8,
  },
}));

export const ToolBarContainer = styled(Box)<BoxProps>(
  ({ theme }) => ({
    width: 'calc(100% - 208px)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: ' center',
    padding: '14px 24px',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('md')]: {
      width: 'calc(100% - 73px)',
    },
  })
);

export const SimpleContainer = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: ' center',
  padding: '14px 24px',
  backgroundColor: theme.palette.background.paper,
}));

export const UserAvatar = styled(Avatar)<AvatarProps>(
  ({ theme }) => ({
    backgroundColor: theme.palette.divider,
    color: '#000',
    width: 24,
    height: 24,
    fontSize: 12,
    fontWeight: 700,
  })
);

export const ToolBarInnerContainer = styled(Box)<BoxProps>(
  ({ theme }) => ({
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'fit-content',
      justifyContent: 'space-between',
    },
  })
);
