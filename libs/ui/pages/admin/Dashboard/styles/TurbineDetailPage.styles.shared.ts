import { Theme } from '@mui/material/styles';
import { CSSObject } from 'tss-react';

export const getTurbineDetailBaseStyles = (theme: Theme): Record<string, CSSObject> => ({
  container: {
    padding: theme.spacing(3),
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5),
    },
  },

  // ─── Page Header ────────────────────────────────────────────────────────────
  pageHeader: {
    marginBottom: theme.spacing(3),
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 30%, #4f46e5 65%, #0ea5e9 100%)',
    backgroundSize: '300% 300%',
    borderRadius: 18,
    padding: theme.spacing(3.5, 4),
    position: 'relative' as const,
    overflow: 'hidden',
    boxShadow:
      '0 24px 64px rgba(79,70,229,0.28), 0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -100,
      right: -100,
      width: 350,
      height: 350,
      borderRadius: '50%',
      background:
        'radial-gradient(circle at center, rgba(167,139,250,0.38) 0%, rgba(99,102,241,0.12) 50%, transparent 70%)',
      pointerEvents: 'none',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -80,
      left: '22%',
      width: 280,
      height: 280,
      borderRadius: '50%',
      background: 'radial-gradient(circle at center, rgba(14,165,233,0.3) 0%, transparent 70%)',
      pointerEvents: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2.5, 2),
      borderRadius: 12,
    },
  },

  headerOrb: {
    position: 'absolute' as const,
    bottom: '10%',
    right: '28%',
    width: 180,
    height: 180,
    borderRadius: '50%',
    background: 'radial-gradient(circle at center, rgba(251,191,36,0.22) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: 0,
  },

  liveDataBadge: {
    position: 'absolute' as const,
    top: 16,
    right: 16,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.75),
    background: 'rgba(16,185,129,0.2)',
    border: '1px solid rgba(16,185,129,0.5)',
    borderRadius: 10,
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    zIndex: 2,
  },

  liveDataDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#4ade80',
    boxShadow: '0 0 10px #4ade80',
    flexShrink: 0,
    animation: 'livePulse 1.4s ease-in-out infinite',
  },

  liveDataText: {
    fontSize: '0.7rem',
    fontWeight: 700,
    color: '#4ade80',
    letterSpacing: '0.1em',
  },

  pageHeaderContent: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2.5),
    marginTop: theme.spacing(4),
    position: 'relative' as const,
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(1.5),
      marginTop: theme.spacing(5),
    },
  },

  turbineIdBox: {
    width: 72,
    height: 72,
    borderRadius: '18px',
    flexShrink: 0,
    background: 'rgba(255,255,255,0.15)',
    border: '2px solid rgba(255,255,255,0.3)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 56,
      height: 56,
      borderRadius: '14px',
    },
  },

  turbineIdLabel: {
    fontSize: '0.55rem',
    color: 'rgba(255,255,255,0.7)',
    fontWeight: 700,
    letterSpacing: '0.08em',
    lineHeight: 1,
  },

  turbineIdNumber: {
    fontSize: '1.1rem',
    color: '#fff',
    fontWeight: 800,
    lineHeight: 1.2,
    letterSpacing: '0.02em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.95rem',
    },
  },

  headerTitle: {
    fontWeight: 800,
    color: '#fff',
    letterSpacing: '-0.02em',
    marginBottom: theme.spacing(0.5),
    textShadow: '0 2px 18px rgba(0,0,0,0.28)',
    lineHeight: 1.18,
    fontSize: '1.5rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.1rem',
    },
  },

  headerMetaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    flexWrap: 'wrap' as const,
  },
});
