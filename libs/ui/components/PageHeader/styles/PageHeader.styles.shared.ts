import { Theme } from '@mui/material/styles';
import { CSSObject } from 'tss-react';

export const getBaseStyles = (theme: Theme): Record<string, CSSObject> => ({
  // ─── Page Header Container ────────────────────────────────────────────────────
  pageHeader: {
    marginBottom: theme.spacing(2.5),
    borderRadius: 18,
    padding: theme.spacing(3.5, 4),
    position: 'relative' as const,
    overflow: 'hidden' as const,
    transition: 'all 0.3s ease',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2.5, 2),
      borderRadius: 12,
      marginBottom: theme.spacing(2),
    },
  },

  // ─── Admin Header ────────────────────────────────────────────────────────────
  headerAdmin: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 30%, #4338ca 65%, #6366f1 100%)',
    backgroundSize: '300% 300%',
    boxShadow:
      '0 24px 64px rgba(99,102,241,0.28), 0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1)',
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      top: -100,
      right: -100,
      width: 350,
      height: 350,
      borderRadius: '50%',
      background:
        'radial-gradient(circle at center, rgba(165,180,252,0.38) 0%, rgba(99,102,241,0.12) 50%, transparent 70%)',
      pointerEvents: 'none' as const,
    },
    '&::after': {
      content: '""',
      position: 'absolute' as const,
      bottom: -80,
      left: '22%',
      width: 280,
      height: 280,
      borderRadius: '50%',
      background: 'radial-gradient(circle at center, rgba(139,92,246,0.3) 0%, transparent 70%)',
      pointerEvents: 'none' as const,
    },
  },

  // ─── Consultant Header ───────────────────────────────────────────────────────
  headerConsultant: {
    background: 'linear-gradient(135deg, #052e16 0%, #064e3b 30%, #065f46 65%, #059669 100%)',
    backgroundSize: '300% 300%',
    boxShadow:
      '0 24px 64px rgba(16,185,129,0.28), 0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1)',
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      top: -100,
      right: -100,
      width: 350,
      height: 350,
      borderRadius: '50%',
      background:
        'radial-gradient(circle at center, rgba(110,231,183,0.38) 0%, rgba(16,185,129,0.12) 50%, transparent 70%)',
      pointerEvents: 'none' as const,
    },
    '&::after': {
      content: '""',
      position: 'absolute' as const,
      bottom: -80,
      left: '22%',
      width: 280,
      height: 280,
      borderRadius: '50%',
      background: 'radial-gradient(circle at center, rgba(5,150,105,0.3) 0%, transparent 70%)',
      pointerEvents: 'none' as const,
    },
  },

  // ─── Header Orb (decorative) ─────────────────────────────────────────────────
  headerOrb: {
    position: 'absolute' as const,
    bottom: '10%',
    right: '28%',
    width: 180,
    height: 180,
    borderRadius: '50%',
    background: 'radial-gradient(circle at center, rgba(251,191,36,0.18) 0%, transparent 70%)',
    pointerEvents: 'none' as const,
    zIndex: 0,
  },

  headerOrbConsultant: {
    position: 'absolute' as const,
    bottom: '10%',
    right: '28%',
    width: 180,
    height: 180,
    borderRadius: '50%',
    background: 'radial-gradient(circle at center, rgba(52,211,153,0.25) 0%, transparent 70%)',
    pointerEvents: 'none' as const,
    zIndex: 0,
  },

  // ─── Header Row ──────────────────────────────────────────────────────────────
  pageHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(0.5),
    position: 'relative' as const,
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column' as const,
      alignItems: 'flex-start',
      gap: theme.spacing(1),
    },
  },

  // ─── Icon Box + Title ────────────────────────────────────────────────────────
  pageHeaderIconBox: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: theme.spacing(1.5),
  },

  pageHeaderIconWrap: {
    width: 48,
    height: 48,
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.2)',
    flexShrink: 0,
  },

  // ─── Title ───────────────────────────────────────────────────────────────────
  title: {
    fontWeight: 800,
    color: '#fff',
    fontSize: '2rem',
    letterSpacing: '-0.028em',
    lineHeight: 1.18,
    textShadow: '0 2px 18px rgba(0,0,0,0.28)',
    position: 'relative' as const,
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.4rem',
    },
  },

  // ─── Description ─────────────────────────────────────────────────────────────
  description: {
    color: 'rgba(255,255,255,0.68)',
    marginTop: theme.spacing(0.5),
    fontSize: '0.88rem',
    position: 'relative' as const,
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.78rem',
    },
  },

  // ─── Chip (Admin) ────────────────────────────────────────────────────────────
  pageHeaderChip: {
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(8px)',
    color: '#fff',
    fontWeight: 600,
    fontSize: '0.75rem',
    border: '1px solid rgba(255,255,255,0.25)',
    alignSelf: 'flex-start' as const,
    mt: 0.5,
  },

  // ─── Chip (Consultant) ──────────────────────────────────────────────────────
  pageHeaderChipConsultant: {
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(8px)',
    color: '#fff',
    fontWeight: 600,
    fontSize: '0.75rem',
    border: '1px solid rgba(255,255,255,0.25)',
    alignSelf: 'flex-start' as const,
    mt: 0.5,
  },
});
