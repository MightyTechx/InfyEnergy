import { Theme } from '@mui/material/styles';
import { CSSObject } from 'tss-react';

export const getBaseStyles = (theme: Theme): Record<string, CSSObject> => ({
  // ─── Page Container ──────────────────────────────────────────────────────────
  container: {
    padding: theme.spacing(3),
    background: 'linear-gradient(160deg, #f0f4ff 0%, #fafbff 50%, #f0f4ff 100%)',
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5),
    },
    [theme.breakpoints.between('sm', 'md')]: {
      padding: theme.spacing(2),
    },
  },

  // ─── Page Header ──────────────────────────────────────────────────────────────
  pageHeader: {
    marginBottom: theme.spacing(3),
    borderRadius: 18,
    padding: theme.spacing(4, 5),
    position: 'relative' as const,
    overflow: 'hidden' as const,
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 30%, #4f46e5 65%, #0ea5e9 100%)',
    backgroundSize: '300% 300%',
    boxShadow: '0 24px 64px rgba(79,70,229,0.28), 0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1)',
    animation: 'shimmerBg 8s ease-in-out infinite',
    '@keyframes shimmerBg': {
      '0%, 100%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
    },
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      top: -100,
      right: -100,
      width: 400,
      height: 400,
      borderRadius: '50%',
      background: 'radial-gradient(circle at center, rgba(167,139,250,0.4) 0%, rgba(99,102,241,0.15) 50%, transparent 70%)',
      pointerEvents: 'none' as const,
    },
    '&::after': {
      content: '""',
      position: 'absolute' as const,
      bottom: -100,
      left: '20%',
      width: 320,
      height: 320,
      borderRadius: '50%',
      background: 'radial-gradient(circle at center, rgba(14,165,233,0.35) 0%, transparent 70%)',
      pointerEvents: 'none' as const,
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3, 2.5),
      borderRadius: 12,
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.between('sm', 'md')]: {
      padding: theme.spacing(3.5, 3),
      borderRadius: 14,
    },
  },

  headerOrb3: {
    position: 'absolute' as const,
    bottom: '8%',
    right: '25%',
    width: 200,
    height: 200,
    borderRadius: '50%',
    background: 'radial-gradient(circle at center, rgba(251,191,36,0.25) 0%, transparent 70%)',
    pointerEvents: 'none' as const,
    zIndex: 0,
  },

  pageHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(0.75),
    position: 'relative' as const,
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column' as const,
      alignItems: 'flex-start' as const,
      gap: theme.spacing(1),
    },
  },

  title: {
    fontWeight: 800,
    color: '#fff',
    fontSize: '2rem',
    letterSpacing: '-0.028em',
    lineHeight: 1.2,
    textShadow: '0 2px 20px rgba(0,0,0,0.3)',
    position: 'relative' as const,
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.4rem',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '1.7rem',
    },
  },

  description: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: '0.9rem',
    position: 'relative' as const,
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.78rem',
    },
  },

  // ─── Filter Toolbar (Grid Layout - Same Heights & Widths) ────────────────────
  filterToolbar: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: theme.spacing(1.5),
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    background: '#ffffff',
    borderRadius: 14,
    border: '1px solid rgba(79,70,229,0.12)',
    boxShadow: '0 4px 16px rgba(99,102,241,0.08)',
    [theme.breakpoints.down('md')]: {
      gap: theme.spacing(1.25),
      padding: theme.spacing(1.5, 2),
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column' as const,
      alignItems: 'stretch' as const,
      gap: theme.spacing(1),
      padding: theme.spacing(1.5),
      borderRadius: 12,
    },
  },

  // ─── Filter Controls (Fixed Height = 40px) ──────────────────────────────────
  filterAutocomplete: {
    flex: '1 1 220px',
    minWidth: 180,
    maxWidth: 260,
    [theme.breakpoints.down('lg')]: {
      flex: '1 1 180px',
    },
    [theme.breakpoints.down('md')]: {
      flex: '1 1 160px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flex: 'none',
    },
    '& .MuiOutlinedInput-root': {
      height: '40px',
      fontSize: '0.82rem',
      borderRadius: 10,
      background: '#ffffff',
      transition: 'all 0.2s ease',
      boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
      '& fieldset': {
        borderColor: 'rgba(79,70,229,0.15)',
        borderWidth: '1px',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(79,70,229,0.35)',
      },
      '&.Mui-focused': {
        boxShadow: '0 0 0 3px rgba(79,70,229,0.1)',
        '& fieldset': {
          borderColor: '#4f46e5',
          borderWidth: '2px',
        },
      },
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.82rem',
      fontWeight: 500,
      color: '#64748b',
      transform: 'translateY(-50%)',
      '&.Mui-focused': {
        color: '#4f46e5',
        fontWeight: 600,
      },
      '&.Mui-shrink': {
        transform: 'translateY(-50%)',
      },
    },
    '& .MuiInputBase-input': {
      padding: '8px 12px',
      fontSize: '0.82rem',
    },
    '& .MuiAutocomplete-popupIndicator': {
      color: 'rgba(79,70,229,0.5)',
    },
  },

  // ─── Form Controls (Fixed Height = 40px) ────────────────────────────────────
  formControl: {
    flex: '1 1 160px',
    minWidth: 140,
    maxWidth: 180,
    [theme.breakpoints.down('lg')]: {
      flex: '1 1 140px',
    },
    [theme.breakpoints.down('md')]: {
      flex: '1 1 120px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flex: 'none',
    },
    '& .MuiOutlinedInput-root': {
      height: '40px',
      fontSize: '0.82rem',
      borderRadius: 10,
      background: '#ffffff',
      transition: 'all 0.2s ease',
      boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
      '& fieldset': {
        borderColor: 'rgba(79,70,229,0.15)',
        borderWidth: '1px',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(79,70,229,0.35)',
      },
      '&.Mui-focused': {
        boxShadow: '0 0 0 3px rgba(79,70,229,0.1)',
        '& fieldset': {
          borderColor: '#4f46e5',
          borderWidth: '2px',
        },
      },
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.82rem',
      fontWeight: 500,
      color: '#64748b',
      transform: 'translateY(-50%)',
      '&.Mui-focused': {
        color: '#4f46e5',
        fontWeight: 600,
      },
      '&.Mui-shrink': {
        transform: 'translateY(-50%)',
      },
    },
    '& .MuiSelect-select': {
      py: '8px',
      display: 'flex',
      alignItems: 'center',
    },
  },

  filterCheckbox: {
    color: '#4f46e5',
    padding: '4px',
    '&.Mui-checked': { color: '#4f46e5' },
  },

  // ─── Date Picker (Fixed Height = 40px) ──────────────────────────────────────
  datePickerField: {
    flex: '1 1 150px',
    minWidth: 130,
    maxWidth: 170,
    [theme.breakpoints.down('lg')]: {
      flex: '1 1 130px',
    },
    [theme.breakpoints.down('md')]: {
      flex: '1 1 110px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flex: 'none',
    },
    '& .MuiOutlinedInput-root': {
      height: '40px',
      fontSize: '0.82rem',
      borderRadius: 10,
      background: '#ffffff',
      transition: 'all 0.2s ease',
      boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
      '& fieldset': {
        borderColor: 'rgba(79,70,229,0.15)',
        borderWidth: '1px',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(79,70,229,0.35)',
      },
      '&.Mui-focused': {
        boxShadow: '0 0 0 3px rgba(79,70,229,0.1)',
        '& fieldset': {
          borderColor: '#4f46e5',
          borderWidth: '2px',
        },
      },
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.82rem',
      fontWeight: 500,
      color: '#64748b',
      transform: 'translateY(-50%)',
      '&.Mui-focused': {
        color: '#4f46e5',
        fontWeight: 600,
      },
      '&.Mui-shrink': {
        transform: 'translateY(-50%)',
      },
    },
    '& .MuiInputBase-input': {
      padding: '8px 12px',
      fontSize: '0.82rem',
    },
  },

  datePickerPaper: {
    borderRadius: '12px',
    mt: 0.5,
    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
  },

  // ─── Download Button (Fixed Height = 40px) ─────────────────────────────────
  downloadBtn: {
    height: '40px',
    minWidth: 130,
    borderRadius: '10px',
    fontWeight: 700,
    fontSize: '0.82rem',
    whiteSpace: 'nowrap' as const,
    textTransform: 'none' as const,
    padding: '0 20px',
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    boxShadow: '0 4px 14px rgba(79,70,229,0.35)',
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(79,70,229,0.45)',
      background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
    },
    '&.Mui-disabled': {
      background: 'rgba(0,0,0,0.08)',
      boxShadow: 'none',
      color: 'rgba(0,0,0,0.3)',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      minWidth: '100%',
    },
  },

  // ─── Table Section ───────────────────────────────────────────────────────────
  tableSection: {
    borderRadius: 14,
    overflow: 'hidden',
    border: '1px solid rgba(79,70,229,0.1)',
    boxShadow: '0 4px 16px rgba(99,102,241,0.06)',
    marginBottom: theme.spacing(3),
    background: '#ffffff',
    [theme.breakpoints.down('sm')]: {
      borderRadius: 12,
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.between('sm', 'md')]: {
      borderRadius: 14,
      marginBottom: theme.spacing(2.5),
    },
  },

  tableSectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap' as const,
    gap: theme.spacing(1.5),
    padding: theme.spacing(2, 2.5),
    background: 'linear-gradient(135deg, rgba(79,70,229,0.05) 0%, rgba(14,165,233,0.03) 100%)',
    borderBottom: '1px solid rgba(79,70,229,0.08)',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column' as const,
      alignItems: 'flex-start' as const,
      gap: theme.spacing(1.25),
      padding: theme.spacing(1.5),
    },
    [theme.breakpoints.between('sm', 'md')]: {
      padding: theme.spacing(1.75, 2),
    },
  },

  tableSectionTitleGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 4,
  },

  tableSectionTitle: {
    fontWeight: 700,
    fontSize: '1rem',
    color: '#1e293b',
    letterSpacing: '-0.01em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },

  tableSectionDate: {
    fontSize: '0.75rem',
    fontWeight: 500,
    color: '#64748b',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
    },
  },

  // ─── Search Field ────────────────────────────────────────────────────────────
  searchField: {
    width: 260,
    flexShrink: 0,
    [theme.breakpoints.down('md')]: {
      width: 220,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexBasis: '100%',
    },
    '& .MuiOutlinedInput-root': {
      height: '38px',
      fontSize: '0.85rem',
      borderRadius: 40,
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(14px)',
      transition: 'all 0.22s ease',
      '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid rgba(79,70,229,0.18)',
        borderRadius: 40,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: '1px solid rgba(79,70,229,0.35)',
      },
      '&.Mui-focused': {
        boxShadow: '0 0 0 3px rgba(79,70,229,0.1)',
        '& .MuiOutlinedInput-notchedOutline': {
          border: '1px solid #4f46e5',
        },
      },
    },
    '& .MuiInputBase-input': {
      padding: '6px 8px 6px 14px',
      fontSize: '0.85rem',
      '&::placeholder': {
        color: '#94a3b8',
        opacity: 1,
      },
    },
    '& .MuiInputAdornment-root .MuiSvgIcon-root': {
      fontSize: '1.15rem',
      color: 'rgba(79,70,229,0.5)',
    },
  },

  tableWrapper: {
    overflowX: 'auto' as const,
    background: '#fff',
  },
});