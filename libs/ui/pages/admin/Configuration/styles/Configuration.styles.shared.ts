import { Theme } from '@mui/material/styles';
import { CSSObject } from 'tss-react';

export const getBaseStyles = (theme: Theme): Record<string, CSSObject> => ({
  // ── Container ────────────────────────────────────────────────────────────────
  container: {
    padding: theme.spacing(3),
    background: 'linear-gradient(160deg, #f0f4ff 0%, #fafbff 50%, #f0f4ff 100%)',
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: { padding: theme.spacing(1.25) },
    [theme.breakpoints.between('sm', 'md')]: { padding: theme.spacing(2) },
  },

  // ── Hero Header ─────────────────────────────────────────────────────────────
  pageHeader: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 35%, #4f46e5 70%, #0ea5e9 100%)',
    backgroundSize: '300% 300%',
    borderRadius: theme.spacing(4),
    padding: theme.spacing(3),
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 20px 56px rgba(79,70,229,0.25)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -80,
      right: -80,
      width: 280,
      height: 280,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(167,139,250,0.3) 0%, transparent 70%)',
      pointerEvents: 'none',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -60,
      left: '25%',
      width: 220,
      height: 220,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(14,165,233,0.25) 0%, transparent 70%)',
      pointerEvents: 'none',
    },
    animation: 'gradientShift 15s ease infinite',
    '@keyframes gradientShift': {
      '0%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
      '100%': { backgroundPosition: '0% 50%' },
    },
    [theme.breakpoints.up('sm')]: { padding: theme.spacing(4) },
  },

  pageHeaderContent: {
    position: 'relative',
    zIndex: 1,
  },

  pageHeaderTitle: {
    fontWeight: 800,
    color: '#fff',
    fontSize: '1.4rem',
    letterSpacing: '-0.025em',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    [theme.breakpoints.up('sm')]: { fontSize: '1.9rem' },
  },

  pageHeaderSubtitle: {
    color: 'rgba(255,255,255,0.68)',
    fontSize: '0.875rem',
    marginTop: theme.spacing(0.5),
  },

  pageHeaderStats: {
    display: 'flex',
    gap: theme.spacing(3),
    marginTop: theme.spacing(2.5),
    flexWrap: 'wrap' as const,
  },

  pageHeaderStat: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.75),
  },

  pageHeaderStatDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
  },

  pageHeaderStatText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: '0.75rem',
    fontWeight: 500,
  },

  // ── Tab Bar ─────────────────────────────────────────────────────────────────
  tabBar: {
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(16px)',
    borderRadius: theme.spacing(3.5),
    padding: theme.spacing(0.75),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    border: '1px solid rgba(79,70,229,0.1)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  },

  tabs: {
    minHeight: 44,
    '& .MuiTab-root': {
      minHeight: 44,
      borderRadius: '10px',
      fontWeight: 600,
      fontSize: '0.8rem',
      textTransform: 'none' as const,
      color: 'text.secondary',
      transition: 'all 0.22s ease',
      position: 'relative',
      '&.Mui-selected': {
        color: '#4f46e5',
        background: 'linear-gradient(135deg, rgba(79,70,229,0.12) 0%, rgba(79,70,229,0.06) 100%)',
        boxShadow: '0 2px 12px rgba(79,70,229,0.2)',
      },
      '&:not(:last-of-type)::after': {
        content: '""',
        position: 'absolute',
        right: 0,
        top: '22%',
        height: '56%',
        width: 1,
        background: 'rgba(0,0,0,0.08)',
        borderRadius: 1,
        pointerEvents: 'none',
      },
    },
    '& .MuiTabs-indicator': { display: 'none' },
  },

  // ── Content Grid ─────────────────────────────────────────────────────────────
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: theme.spacing(3),
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '340px 1fr',
    },
  },

  // ── Section Panel ────────────────────────────────────────────────────────────
  sectionPanel: {
    background: 'rgba(255,255,255,0.95)',
    borderRadius: theme.spacing(3.5),
    border: '1px solid rgba(0,0,0,0.06)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    overflow: 'hidden',
  },

  sectionPanelHeader: {
    padding: theme.spacing(2.5),
    borderBottom: '1px solid rgba(0,0,0,0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'linear-gradient(135deg, rgba(79,70,229,0.03) 0%, transparent 100%)',
  },

  sectionPanelTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
  },

  sectionPanelIcon: {
    width: 36,
    height: 36,
    borderRadius: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sectionPanelTitleText: {
    fontWeight: 700,
    fontSize: '0.95rem',
    color: 'text.primary',
  },

  sectionPanelSubtitle: {
    fontSize: '0.75rem',
    color: 'text.secondary',
    marginTop: 2,
  },

  sectionPanelBadge: {
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1.5)}px`,
    borderRadius: theme.spacing(2),
    background: 'rgba(79,70,229,0.08)',
    color: '#4f46e5',
    fontSize: '0.7rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
  },

  sectionPanelBody: {
    padding: theme.spacing(2.5),
  },

  // ── Config Item ─────────────────────────────────────────────────────────────
  configItem: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2.5),
    background: '#fafbfc',
    border: '1px solid rgba(0,0,0,0.04)',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: '#fff',
      boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      transform: 'translateY(-1px)',
      borderColor: 'rgba(79,70,229,0.15)',
    },
  },

  configItemActive: {
    background: 'linear-gradient(135deg, rgba(79,70,229,0.06) 0%, rgba(79,70,229,0.02) 100%)',
    borderColor: 'rgba(79,70,229,0.2)',
  },

  configItemContent: {
    flex: 1,
    minWidth: 0,
  },

  configItemTitle: {
    fontWeight: 600,
    fontSize: '0.875rem',
    color: 'text.primary',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },

  configItemDesc: {
    fontSize: '0.75rem',
    color: 'text.secondary',
    marginTop: theme.spacing(0.25),
    lineHeight: 1.5,
  },

  configItemControl: {
    flexShrink: 0,
  },

  // ── Config List ─────────────────────────────────────────────────────────────
  configList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing(1.5),
  },

  // ── Form Controls ───────────────────────────────────────────────────────────
  formRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    padding: `${theme.spacing(1.5)}px 0`,
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    '&:last-child': { borderBottom: 'none' },
  },

  formLabel: {
    fontSize: '0.85rem',
    fontWeight: 500,
    color: 'text.primary',
  },

  formDesc: {
    fontSize: '0.72rem',
    color: 'text.secondary',
    marginTop: 2,
  },

  // ── Input Fields ────────────────────────────────────────────────────────────
  inputField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.spacing(2),
      fontSize: '0.85rem',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(79,70,229,0.3)',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#4f46e5',
        borderWidth: 2,
      },
    },
  },

  selectField: {
    minWidth: 140,
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.spacing(2),
      fontSize: '0.82rem',
    },
  },

  // ── Toggle Switch ───────────────────────────────────────────────────────────
  toggleActive: {
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: '#4f46e5',
      '& + .MuiSwitch-track': {
        backgroundColor: '#4f46e5',
      },
    },
  },

  // ── Threshold Card ─────────────────────────────────────────────────────────
  thresholdCard: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2.5),
    background: 'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(245,158,11,0.02) 100%)',
    border: '1px solid rgba(245,158,11,0.15)',
  },

  thresholdCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
  },

  thresholdCardIcon: {
    width: 28,
    height: 28,
    borderRadius: theme.spacing(1.5),
    background: 'rgba(245,158,11,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  thresholdCardTitle: {
    fontWeight: 600,
    fontSize: '0.82rem',
    color: '#92400e',
  },

  thresholdRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(1.5),
    marginTop: theme.spacing(1.5),
  },

  thresholdItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing(0.5),
  },

  thresholdLabel: {
    fontSize: '0.72rem',
    color: 'text.secondary',
    fontWeight: 500,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },

  thresholdValue: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.75),
    padding: `${theme.spacing(0.75)}px ${theme.spacing(1.25)}px`,
    borderRadius: theme.spacing(1.5),
    background: '#fff',
    border: '1px solid rgba(0,0,0,0.08)',
  },

  thresholdNumber: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: '#f59e0b',
    fontVariantNumeric: 'tabular-nums',
  },

  thresholdUnit: {
    fontSize: '0.72rem',
    color: 'text.secondary',
    fontWeight: 500,
  },

  // ── Status Indicator ────────────────────────────────────────────────────────
  statusIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.75),
    padding: `${theme.spacing(0.75)}px ${theme.spacing(1.5)}px`,
    borderRadius: theme.spacing(2),
    background: 'rgba(16,185,129,0.1)',
    border: '1px solid rgba(16,185,129,0.2)',
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    animation: 'pulse 2s ease-in-out infinite',
    '@keyframes pulse': {
      '0%': { opacity: 1 },
      '50%': { opacity: 0.5 },
      '100%': { opacity: 1 },
    },
  },

  statusText: {
    fontSize: '0.72rem',
    fontWeight: 600,
    color: '#10b981',
  },

  // ── Info Box ─────────────────────────────────────────────────────────────────
  infoBox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(1.5),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0.02) 100%)',
    border: '1px solid rgba(59,130,246,0.15)',
  },

  infoBoxIcon: {
    width: 32,
    height: 32,
    borderRadius: theme.spacing(1.5),
    background: 'rgba(59,130,246,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  infoBoxContent: {
    flex: 1,
  },

  infoBoxTitle: {
    fontWeight: 600,
    fontSize: '0.82rem',
    color: 'text.primary',
  },

  infoBoxText: {
    fontSize: '0.75rem',
    color: 'text.secondary',
    marginTop: 2,
    lineHeight: 1.5,
  },

  // ── Action Buttons ───────────────────────────────────────────────────────────
  actionButton: {
    borderRadius: theme.spacing(2),
    textTransform: 'none' as const,
    fontWeight: 600,
    fontSize: '0.82rem',
    padding: `${theme.spacing(1)}px ${theme.spacing(2.5)}px`,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(79,70,229,0.3)',
    },
  },

  // ── Grid Layout ──────────────────────────────────────────────────────────────
  settingsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },

  // ── Divider ─────────────────────────────────────────────────────────────────
  sectionDivider: {
    height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)',
    margin: `${theme.spacing(2.5)}px 0`,
  },

  // ── Icon Wrapper ─────────────────────────────────────────────────────────────
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: theme.spacing(2.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  // ── Compact List ─────────────────────────────────────────────────────────────
  compactList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing(1),
  },
});
