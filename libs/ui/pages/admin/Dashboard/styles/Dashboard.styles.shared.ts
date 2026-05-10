import { Theme } from '@mui/material/styles';
import { CSSObject } from 'tss-react';

export const getBaseStyles = (theme: Theme): Record<string, CSSObject> => ({
  container: {
    padding: theme.spacing(3),
    background: 'linear-gradient(160deg, #f0f4ff 0%, #fafbff 50%, #f0f4ff 100%)',
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: { padding: theme.spacing(1.25) },
    [theme.breakpoints.between('sm', 'md')]: { padding: theme.spacing(2) },
  },

  heroHeader: {
    marginBottom: theme.spacing(2.5),
    background: '#ffffff',
    borderRadius: 14,
    padding: theme.spacing(2, 3),
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center',
    gap: theme.spacing(2),
    border: '1px solid #e8eaf0',
    borderLeft: '4px solid #4f46e5',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(99,102,241,0.07)',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'stretch' as const,
      padding: theme.spacing(1.5),
      gap: theme.spacing(1.5),
      borderLeft: '3px solid #4f46e5',
    },
  },

  heroLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.75),
    minWidth: 0,
    [theme.breakpoints.down('sm')]: {
      order: 0,
      flexDirection: 'row' as const,
      justifyContent: 'center',
      gap: theme.spacing(1),
    },
  },

  heroAvatar: {
    width: 46,
    height: 46,
    fontSize: '1rem',
    fontWeight: 700,
    flexShrink: 0,
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    boxShadow: '0 2px 8px rgba(79,70,229,0.35)',
    [theme.breakpoints.down('sm')]: { width: 36, height: 36, fontSize: '0.8rem' },
  },

  heroGreeting: {
    fontSize: '0.72rem',
    fontWeight: 500,
    color: '#94a3b8',
    letterSpacing: '0.02em',
    lineHeight: 1,
    marginBottom: theme.spacing(0.4),
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.65rem',
      marginBottom: theme.spacing(0.2),
    },
  },

  heroTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#1e293b',
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    [theme.breakpoints.down('sm')]: { fontSize: '0.9rem' },
  },

  heroCenter: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: theme.spacing(0.6),
    [theme.breakpoints.down('sm')]: {
      order: 2,
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing(0.5),
      paddingTop: theme.spacing(1),
      borderTop: '1px solid #e8eaf0',
      marginTop: theme.spacing(0.5),
    },
  },

  /* ── Mobile only center (hidden - use heroCenter instead) ── */
  heroCenterMobile: { display: 'none' },
  heroCenterMobileTitle: {},
  heroCenterMobileBadge: {},
  heroCenterMobileDot: {},
  heroCenterMobileLive: {},

  heroCenterTitle: {
    fontFamily: 'Orbitron, sans-serif',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#4f46e5',
    letterSpacing: '0.2em',
    lineHeight: 1,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.65rem',
      letterSpacing: '0.15em',
    },
  },

  heroCenterBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    background: 'rgba(16,185,129,0.07)',
    border: '1px solid rgba(16,185,129,0.22)',
    borderRadius: '20px',
    paddingLeft: theme.spacing(1.1),
    paddingRight: theme.spacing(1.1),
    paddingTop: '3px',
    paddingBottom: '3px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(0.8),
      paddingRight: theme.spacing(0.8),
      paddingTop: '2px',
      paddingBottom: '2px',
    },
  },

  heroCenterDot: {
    width: 5,
    height: 5,
    borderRadius: '50%',
    background: '#10b981',
    flexShrink: 0,
    animation: 'livePulse 2s ease-in-out infinite',
  },

  heroCenterLive: {
    fontSize: '0.58rem',
    fontWeight: 700,
    color: '#10b981',
    letterSpacing: '0.12em',
    lineHeight: 1,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.5rem',
      letterSpacing: '0.08em',
    },
  },

  heroCenterSub: {
    fontSize: '0.63rem',
    fontWeight: 500,
    color: '#64748b',
    lineHeight: 1,
  },

  heroCenterFacilities: {
    fontSize: '0.58rem',
    fontWeight: 400,
    color: '#94a3b8',
    letterSpacing: '0.04em',
    whiteSpace: 'nowrap' as const,
    marginTop: theme.spacing(0.15),
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.5rem',
      whiteSpace: 'normal' as const,
      textAlign: 'center',
    },
  },

  heroRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      order: 1,
      justifyContent: 'center',
      paddingTop: theme.spacing(1),
      borderTop: '1px solid #e8eaf0',
      marginTop: theme.spacing(0.5),
    },
  },

  heroClockWidget: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-end',
    gap: theme.spacing(0.35),
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
    },
  },

  heroClockRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: theme.spacing(0.6),
  },

  heroClockHM: {
    fontFamily: 'Orbitron, monospace',
    fontSize: '1.55rem',
    fontWeight: 700,
    color: '#1e293b',
    letterSpacing: '0.03em',
    lineHeight: 1,
    fontVariantNumeric: 'tabular-nums' as const,
    [theme.breakpoints.down('sm')]: { fontSize: '1.2rem' },
  },

  heroClockSec: {
    fontFamily: 'Orbitron, monospace',
    fontSize: '0.82rem',
    fontWeight: 600,
    color: '#94a3b8',
    lineHeight: 1,
    fontVariantNumeric: 'tabular-nums' as const,
    paddingBottom: '2px',
  },

  heroClockDate: {
    fontSize: '0.68rem',
    fontWeight: 600,
    color: '#475569',
    letterSpacing: '0.01em',
    textAlign: 'right' as const,
    [theme.breakpoints.down('sm')]: { textAlign: 'left' as const },
  },

  heroClockTz: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.75),
    background: '#f1f5f9',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    paddingLeft: theme.spacing(1.25),
    paddingRight: theme.spacing(1.25),
    paddingTop: '3px',
    paddingBottom: '3px',
    marginTop: theme.spacing(0.25),
    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(0.5),
      paddingLeft: theme.spacing(0.9),
      paddingRight: theme.spacing(0.9),
      paddingTop: '2px',
      paddingBottom: '2px',
      marginTop: theme.spacing(0.5),
    },
  },

  heroClockTzDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#10b981',
    flexShrink: 0,
    animation: 'livePulse 2s ease-in-out infinite',
  },

  heroClockTzText: {
    fontSize: '0.63rem',
    fontWeight: 500,
    color: '#64748b',
    whiteSpace: 'nowrap' as const,
  },
});
