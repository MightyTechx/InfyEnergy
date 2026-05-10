import { Theme } from '@mui/material/styles';
import { CSSObject } from 'tss-react';

export const getBaseStyles = (theme: Theme): Record<string, CSSObject> => ({
  root: {
    borderRadius: 8,
    textTransform: 'none',
    fontWeight: 600,
    padding: theme.spacing(1.5, 3),
    fontSize: '1rem',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: `0 4px 12px ${theme.palette.shadow.dark}`,
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 2),
      fontSize: '0.875rem',
    },
  },
  iconStart: {
    marginRight: theme.spacing(1),
  },
  iconEnd: {
    marginLeft: theme.spacing(1),
  },
  loadingDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
    animation: 'loadingPulse 1.2s ease-in-out infinite',
    '@keyframes loadingPulse': {
      '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: 0.4 },
      '40%': { transform: 'scale(1)', opacity: 1 },
    },
  },
});
