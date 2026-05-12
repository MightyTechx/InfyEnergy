import { Theme } from '@mui/material/styles';
import { CSSObject } from 'tss-react';

export const getBaseStyles = (theme: Theme): Record<string, CSSObject> => ({
  // ─── Page Header Container ────────────────────────────────────────────────────
  pageHeader: {
    marginBottom: theme.spacing(2.5),
    background: '#ffffff',
    borderRadius: 14,
    padding: theme.spacing(2.5, 3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid #e8eaf0',
    borderLeft: '4px solid #4f46e5',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(99,102,241,0.07)',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    transition: 'all 0.25s ease',
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      top: 0,
      right: 0,
      width: '120px',
      height: '100%',
      background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.03) 100%)',
      pointerEvents: 'none' as const,
    },
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.08), 0 8px 24px rgba(99,102,241,0.1)',
      borderLeftColor: '#4338ca',
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2, 2.5),
      borderRadius: 12,
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column' as const,
      alignItems: 'flex-start' as const,
      padding: theme.spacing(1.75, 2),
      borderRadius: 10,
      borderLeft: '3px solid #4f46e5',
      gap: theme.spacing(1.5),
    },
  },

  // ─── Admin Header ────────────────────────────────────────────────────────────
  headerAdmin: {
    borderLeft: '4px solid #4f46e5',
    '&:hover': {
      borderLeftColor: '#4338ca',
    },
  },

  // ─── Consultant Header ───────────────────────────────────────────────────────
  headerConsultant: {
    borderLeft: '4px solid #10b981',
    '&::before': {
      background: 'linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.03) 100%)',
    },
    '&:hover': {
      borderLeftColor: '#059669',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08), 0 8px 24px rgba(16,185,129,0.1)',
    },
  },

  // ─── Turbine Header ────────────────────────────────────────────────────────────
  headerTurbine: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 30%, #4f46e5 65%, #0ea5e9 100%)',
    backgroundSize: '300% 300%',
    borderRadius: 18,
    padding: theme.spacing(3.5, 4),
    border: 'none',
    borderLeft: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    boxShadow:
      '0 24px 64px rgba(79,70,229,0.28), 0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1)',
    marginBottom: theme.spacing(2.5),
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      top: -100,
      right: -100,
      width: 350,
      height: 350,
      borderRadius: '50%',
      background:
        'radial-gradient(circle at center, rgba(167,139,250,0.38) 0%, rgba(99,102,241,0.12) 50%, transparent 70%)',
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
      background: 'radial-gradient(circle at center, rgba(14,165,233,0.3) 0%, transparent 70%)',
      pointerEvents: 'none' as const,
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2.5, 3),
      borderRadius: 14,
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 2.5),
      borderRadius: 12,
      flexDirection: 'column' as const,
      alignItems: 'flex-start' as const,
      gap: theme.spacing(1.5),
    },
  },

  // ─── Header Orbs (hidden - using simple design) ─────────────────────────────────
  headerOrb: {
    display: 'none',
  },

  headerOrbConsultant: {
    display: 'none',
  },

  // ─── Header Row ──────────────────────────────────────────────────────────────
  pageHeaderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    position: 'relative' as const,
    zIndex: 1,
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  // ─── Icon Box + Title ────────────────────────────────────────────────────────
  pageHeaderIconBox: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: theme.spacing(1.75),
  },

  pageHeaderIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    flexShrink: 0,
    boxShadow: '0 4px 12px rgba(79,70,229,0.35)',
    transition: 'all 0.25s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 6px 16px rgba(79,70,229,0.45)',
    },
    [theme.breakpoints.down('sm')]: {
      width: 42,
      height: 42,
      borderRadius: 10,
    },
  },

  pageHeaderIconWrapTurbine: {
    background: 'linear-gradient(135deg, #4f46e5 0%, #0ea5e9 100%)',
    boxShadow: '0 4px 12px rgba(14,165,233,0.35)',
  },

  // ─── Title ───────────────────────────────────────────────────────────────────
  title: {
    fontWeight: 700,
    color: '#1e293b',
    fontSize: '1.25rem',
    letterSpacing: '-0.015em',
    lineHeight: 1.25,
    position: 'relative' as const,
    zIndex: 1,
    [theme.breakpoints.down('lg')]: {
      fontSize: '1.15rem',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1.05rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },

  titleTurbine: {
    color: '#ffffff',
    fontSize: '1.5rem',
    textShadow: '0 2px 18px rgba(0,0,0,0.28)',
    [theme.breakpoints.down('lg')]: {
      fontSize: '1.35rem',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1.25rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.15rem',
    },
  },

  // ─── Description ─────────────────────────────────────────────────────────────
  description: {
    color: '#64748b',
    marginTop: theme.spacing(0.25),
    fontSize: '0.8rem',
    fontWeight: 500,
    lineHeight: 1.5,
    position: 'relative' as const,
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
    },
  },

  descriptionTurbine: {
    color: 'rgba(255,255,255,0.7)',
    marginTop: theme.spacing(0.5),
  },

  // ─── Chip (Admin) ────────────────────────────────────────────────────────────
  pageHeaderChip: {
    background: 'linear-gradient(135deg, rgba(79,70,229,0.1) 0%, rgba(124,58,237,0.08) 100%)',
    color: '#4f46e5',
    fontWeight: 600,
    fontSize: '0.68rem',
    letterSpacing: '0.04em',
    border: '1px solid rgba(79,70,229,0.2)',
    alignSelf: 'center' as const,
    height: 26,
    px: 1.5,
    borderRadius: 20,
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'linear-gradient(135deg, rgba(79,70,229,0.15) 0%, rgba(124,58,237,0.12) 100%)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(79,70,229,0.2)',
    },
    [theme.breakpoints.down('sm')]: {
      alignSelf: 'flex-start' as const,
    },
  },

  // ─── Chip (Consultant) ────────────────────────────────────────────────────────
  pageHeaderChipConsultant: {
    background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(5,150,105,0.08) 100%)',
    color: '#059669',
    fontWeight: 600,
    fontSize: '0.68rem',
    letterSpacing: '0.04em',
    border: '1px solid rgba(16,185,129,0.2)',
    alignSelf: 'center' as const,
    height: 26,
    px: 1.5,
    borderRadius: 20,
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(5,150,105,0.12) 100%)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(16,185,129,0.2)',
    },
    [theme.breakpoints.down('sm')]: {
      alignSelf: 'flex-start' as const,
    },
  },
});
