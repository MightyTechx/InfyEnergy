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
      gridTemplateColumns: '1fr',
      padding: theme.spacing(1.75, 2),
      gap: theme.spacing(1.25),
    },
  },

  heroLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.75),
    minWidth: 0,
  },

  heroAvatar: {
    width: 46,
    height: 46,
    fontSize: '1rem',
    fontWeight: 700,
    flexShrink: 0,
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    boxShadow: '0 2px 8px rgba(79,70,229,0.35)',
    [theme.breakpoints.down('sm')]: { width: 40, height: 40, fontSize: '0.9rem' },
  },

  heroGreeting: {
    fontSize: '0.72rem',
    fontWeight: 500,
    color: '#94a3b8',
    letterSpacing: '0.02em',
    lineHeight: 1,
    marginBottom: theme.spacing(0.4),
  },

  heroTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#1e293b',
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    [theme.breakpoints.down('sm')]: { fontSize: '1rem' },
  },

  heroCenter: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 3,
    [theme.breakpoints.down('sm')]: { display: 'none' },
  },

  heroCenterIcon: {
    fontSize: '1.2rem !important',
    color: '#4f46e5',
    marginBottom: 3,
  },

  heroCenterTitle: {
    fontFamily: 'Orbitron, sans-serif',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#4f46e5',
    letterSpacing: '0.2em',
    lineHeight: 1,
  },

  heroCenterSub: {
    fontSize: '0.67rem',
    fontWeight: 500,
    color: '#94a3b8',
    letterSpacing: '0.06em',
    whiteSpace: 'nowrap' as const,
  },

  heroRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: { justifyContent: 'flex-start' },
  },

  heroClockWidget: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-end',
    gap: theme.spacing(0.35),
    [theme.breakpoints.down('sm')]: { alignItems: 'flex-start' },
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
