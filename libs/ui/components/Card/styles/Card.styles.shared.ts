import { Theme } from '@mui/material/styles';
import { CSSObject } from 'tss-react';

export const getBaseStyles = (theme: Theme): Record<string, CSSObject> => ({
  root: {
    borderRadius: '12px',
    boxShadow: `0 4px 12px ${theme.palette.shadow.light}`,
    overflow: 'hidden',
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
      boxShadow: `0 6px 20px ${theme.palette.shadow.strong}`,
    },
  },
  header: {
    padding: theme.spacing(2, 3),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  content: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  footer: {
    padding: theme.spacing(2, 3),
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.grey[100],
  },

  // ─── Status Card Variant ─────────────────────────────────────────────────────
  'status-card': {
    borderRadius: 10,
    border: '1px solid',
    borderColor: 'divider',
    background: '#ffffff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    transition: 'all 0.2s ease',
    overflow: 'hidden',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      transform: 'translateY(-2px)',
    },
  },

  // ─── Filter Card Variant ─────────────────────────────────────────────────────
  'filter-card': {
    borderRadius: 16,
    border: '1px solid',
    borderColor: 'primary.light',
    background: '#ffffff',
    boxShadow: '0 4px 16px rgba(99,102,241,0.1)',
    overflow: 'visible',
    transition: 'all 0.25s ease',
    '&:hover': {
      boxShadow: '0 6px 24px rgba(99,102,241,0.15)',
    },
  },

  // ─── KPI Card Variant ────────────────────────────────────────────────────────
  'kpi-card': {
    borderRadius: 14,
    border: '1px solid',
    borderColor: 'divider',
    background: 'linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 2,
      background: 'linear-gradient(90deg, rgba(99,102,241,0.3), rgba(124,58,237,0.2))',
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },
    '&:hover': {
      boxShadow: '0 8px 25px -5px rgba(99,102,241,0.15)',
      transform: 'translateY(-4px)',
      borderColor: 'primary.light',
      '&::before': {
        opacity: 1,
      },
    },
  },
});
