import { Theme } from '@mui/material/styles';
import { CSSObject } from 'tss-react';

export const getBaseStyles = (theme: Theme): Record<string, CSSObject> => ({
  container: {
    padding: theme.spacing(3),
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5),
    },
  },

  pageHeader: {
    marginBottom: theme.spacing(2.5),
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

  headerOrb3: {
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

  description: {
    color: 'rgba(255,255,255,0.68)',
    marginTop: theme.spacing(0.5),
    fontSize: '0.88rem',
    position: 'relative' as const,
    zIndex: 1,
  },

  // ─── Filter Bar ─────────────────────────────────────────────────────────────
  filterBar: {
    display: 'flex',
    alignItems: 'flex-end',
    flexWrap: 'wrap' as const,
    gap: theme.spacing(1.5),
    padding: theme.spacing(2, 2.5),
    background: 'rgba(255,255,255,0.96)',
    backdropFilter: 'blur(16px)',
    borderRadius: 14,
    border: '1px solid rgba(79,70,229,0.1)',
    boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
    marginTop: theme.spacing(2.5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5),
      gap: theme.spacing(1),
      '& > *': {
        width: '100%',
        flexBasis: '100%',
      },
    },
  },

  downloadBtn: {
    alignSelf: 'flex-end',
    flexShrink: 0,
    minWidth: 140,
    height: 40,
    borderRadius: '10px !important',
    fontWeight: '700 !important',
    fontSize: '0.85rem !important',
    whiteSpace: 'nowrap' as const,
    textTransform: 'none' as const,
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%) !important',
    boxShadow: '0 4px 14px rgba(79,70,229,0.4) !important',
    transition: 'all 0.22s ease !important',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(79,70,229,0.5) !important',
    },
    '&.Mui-disabled': {
      background: 'rgba(0,0,0,0.1) !important',
      boxShadow: 'none !important',
      color: 'rgba(0,0,0,0.3) !important',
    },
    [theme.breakpoints.down('sm')]: { width: '100%' },
  },

  tableSection: {
    borderRadius: 14,
    overflow: 'hidden',
    border: '1px solid rgba(79,70,229,0.1)',
    boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
    marginTop: theme.spacing(2.5),
  },

  tableSectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    padding: theme.spacing(1.5, 2.5),
    background: 'linear-gradient(135deg, rgba(79,70,229,0.07) 0%, rgba(14,165,233,0.05) 100%)',
    borderBottom: '1px solid rgba(79,70,229,0.1)',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column' as const,
      alignItems: 'flex-start',
      gap: theme.spacing(1),
    },
  },

  tableSectionTitle: {
    fontWeight: 700,
    fontSize: '0.95rem',
    color: '#1e293b',
    letterSpacing: '-0.01em',
    whiteSpace: 'nowrap' as const,
  },

  tableSectionDate: {
    fontSize: '0.75rem',
    fontWeight: 500,
    color: '#64748b',
    whiteSpace: 'nowrap' as const,
  },

  tableSectionTitleGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 2,
  },

  searchField: {
    width: 240,
    flexShrink: 0,
    '& .MuiOutlinedInput-root': {
      height: '36px',
      fontSize: '0.85rem',
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(14px)',
      borderRadius: 40,
      transition: 'all 0.22s ease',
      '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid rgba(79,70,229,0.18)',
        borderRadius: 40,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: '1px solid rgba(79,70,229,0.4)',
      },
      '&.Mui-focused': {
        boxShadow: '0 0 0 3px rgba(79,70,229,0.1)',
        '& .MuiOutlinedInput-notchedOutline': {
          border: '1px solid #4f46e5',
        },
      },
    },
    '& .MuiInputBase-input': {
      padding: '4px 4px 4px 12px',
      fontSize: '0.85rem',
      '&::placeholder': { color: '#94a3b8', opacity: 1 },
    },
    '& .MuiInputAdornment-root .MuiSvgIcon-root': {
      fontSize: '1.1rem',
      color: 'rgba(79,70,229,0.6)',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexBasis: '100%',
    },
  },

  tableWrapper: {
    overflowX: 'auto' as const,
    background: '#fff',
  },

  // ─── Filter Controls ──────────────────────────────────────────────────────────
  filterAutocomplete: {
    flex: '2 1 220px',
    minWidth: 0,
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      '& fieldset': { borderRadius: '8px' },
      '&:hover fieldset': { borderColor: '#4f46e5' },
      '&.Mui-focused fieldset': { borderColor: '#4f46e5', borderWidth: '2px' },
    },
    '& .MuiInputLabel-root': { fontSize: '0.95rem' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#4f46e5' },
    '@media (max-width:600px)': {
      width: '100%',
      flexBasis: '100%',
    },
  },

  filterFormControl: {
    flex: '1 1 180px',
    minWidth: 0,
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      '& fieldset': { borderRadius: '8px' },
      '&:hover fieldset': { borderColor: '#4f46e5' },
      '&.Mui-focused fieldset': { borderColor: '#4f46e5', borderWidth: '2px' },
    },
    '& .MuiInputLabel-root': { fontSize: '0.95rem' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#4f46e5' },
  },

  datePickerField: {
    flex: '1 1 180px',
    minWidth: 0,
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
      '& fieldset': { borderRadius: '10px' },
      '&:hover fieldset': { borderColor: '#4f46e5' },
      '&.Mui-focused fieldset': { borderColor: '#4f46e5', borderWidth: '2px' },
    },
    '& fieldset': { borderRadius: '10px' },
    '& .MuiInputLabel-root': { fontSize: '0.95rem' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#4f46e5' },
    '@media (max-width:600px)': {
      width: '100%',
      flexBasis: '100%',
    },
  },

  datePickerPaper: {
    borderRadius: '10px',
    mt: 0.5,
  },

  filterCheckbox: {
    color: '#4f46e5',
    '&.Mui-checked': { color: '#4f46e5' },
  },
});
