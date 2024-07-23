// Import libraries
import {
  styled,
  Typography,
  type BoxProps,
  type TypographyProps,
} from '@mui/material';

type SectionContainerProps = {
  taskBar?: boolean;
  sideBar?: boolean;
} & BoxProps;

export const SectionContainer = styled('div')<SectionContainerProps>(
  ({ theme, taskBar, sideBar }) => ({
    position: 'relative',
    width:
      sideBar && !taskBar
        ? 'calc(100vw - 272px)'
        : !sideBar && taskBar
          ? 'calc(100vw - 360px)'
          : sideBar && taskBar
            ? 'calc(100vw - 568px)'
            : 'calc(100vw - 380px)',
    margin: !taskBar ? '0 auto' : 0,
    height: 'calc(100vh - 74px)',
    display: 'flex',
    transition: 'all 200ms',
    [theme.breakpoints.down('md')]: {
      display: 'block',
      width: '100%',
    },
  })
);

export const SectionInnerContainer = styled('div')<BoxProps>(
  ({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: 'calc(100vh - 74px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  })
);

export const ChatContainer = styled('div')<SectionContainerProps>(
  ({ theme, taskBar }) => ({
    height: !taskBar ? 'calc(100% - 74px)' : 'calc(100% - 24px)',
    overflow: 'auto',
    paddingBottom: !taskBar ? '24px' : 0,
    [theme.breakpoints.down('md')]: {
      height: 'calc(100% - 58px)',
    },
  })
);

export const Title = styled(Typography)<TypographyProps>(() => ({
  fontSize: '14px',
  fontWeight: 600,
}));
