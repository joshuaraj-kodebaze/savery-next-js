// Import libraries
import {
  styled,
  Typography,
  type TypographyProps,
} from '@mui/material';

export const Title = styled(Typography)<TypographyProps>(() => ({
  fontSize: '14px',
  fontWeight: 600,
  marginLeft: '10px',
  marginTop: '-2.5px',
}));

export const BilledText = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    fontSize: '14px',
    fontWeight: 400,
    marginLeft: '10px',
    marginRight: '10px',
    color: theme.palette.text.secondary,
  })
);

export const SaveUpToText = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    fontSize: '14px',
    fontWeight: 400,
    marginLeft: '10px',
    marginRight: '10px',
    color: theme.palette.primary.main,
    textAlign: 'end',
    marginTop: 5,
  })
);

export const PlanName = styled(Typography)<TypographyProps>(() => ({
  fontSize: 14,
  fontWeight: 600,
  textAlign: 'center',
}));

export const Price = styled(Typography)<TypographyProps>(() => ({
  fontSize: 42,
  fontWeight: 400,
}));

export const PerMonthText = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    fontSize: 14,
    color: theme.palette.text.secondary,
    marginBottom: 10,
  })
);

export const CustomPricing = styled(Typography)<TypographyProps>(
  () => ({
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 15,
  })
);

export const PlanTitle = styled(Typography)<TypographyProps>(() => ({
  fontSize: 14,
  fontWeight: 400,
  textAlign: 'center',
  marginTop: 5,
  marginBottom: 10,
}));

export const FeatureText = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.text.secondary,
    marginTop: 5,
    marginBottom: 10,
    lineHeight: 'normal',
  })
);

export const MostPopular = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    position: 'absolute',
    // top: '10px',
    // left: 0,
    // top: 0,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    textAlign: 'center',
    width: 101,
    height: 22,
    marginTop: -30,
    backgroundColor: theme.palette.primary.main,
    fontSize: 14,
    fontWeight: 400,
    borderRadius: 100,
    color: theme.palette.common.white,
    lineHeight: 'normal',
  })
);
