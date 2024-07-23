// Import libraries
import { styled, Switch, type SwitchProps } from '@mui/material';

export const StyledSwitch = styled(Switch)<SwitchProps>(
  ({ theme }) => ({
    width: 54,
    height: 28,
    padding: 0,

    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      color: theme.palette.primary.main,

      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(26px)',
        color: theme.palette.primary.main,
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.common.white,
          opacity: 1,
          border: `1px solid ${theme.palette.divider}`,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          backgroundColor: theme.palette.text.disabled,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.text.disabled,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 24,
      height: 24,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.common.white
          : '#39393D',
      border: `1px solid ${theme.palette.divider}`,
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  })
);
