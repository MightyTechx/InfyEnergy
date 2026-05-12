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

  // ─── Action Buttons & Filters Section ─────────────────────────────────────────
  actionButtonsSection: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(2.5),
    padding: theme.spacing(1.75, 2.5),
    background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(240,244,255,0.95) 100%)',
    borderRadius: 14,
    border: '1px solid rgba(99,102,241,0.12)',
    boxShadow: '0 2px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
    [theme.breakpoints.down('md')]: {
      gap: theme.spacing(1.25),
      padding: theme.spacing(1.5),
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column' as const,
      alignItems: 'stretch' as const,
      gap: theme.spacing(1),
    },
  },

  // ─── Filter Autocompletes (Flexible Width) ──────────────────────────────────────
  filterAutocomplete: {
    flex: '1 1 160px',
    minWidth: 150,
    maxWidth: 220,
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      '&:hover fieldset': { borderColor: '#6366f1' },
      '&.Mui-focused fieldset': { borderColor: '#6366f1', borderWidth: '2px' },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1' },
    [theme.breakpoints.down('sm')]: {
      flex: 'none',
      width: '100%',
      maxWidth: '100%',
    },
  },

  filterAutocompleteSmall: {
    flex: '1 1 150px',
    minWidth: 140,
    maxWidth: 200,
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      '&:hover fieldset': { borderColor: '#6366f1' },
      '&.Mui-focused fieldset': { borderColor: '#6366f1', borderWidth: '2px' },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1' },
    [theme.breakpoints.down('sm')]: {
      flex: 'none',
      width: '100%',
      maxWidth: '100%',
    },
  },

  // ─── Date Picker Input (Flexible Width) ─────────────────────────────────────────
  datePickerInput: {
    flex: '1 1 150px',
    minWidth: 140,
    maxWidth: 200,
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      height: '40px',
      '&:hover fieldset': { borderColor: '#6366f1' },
      '&.Mui-focused fieldset': { borderColor: '#6366f1', borderWidth: '2px' },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1' },
    [theme.breakpoints.down('sm')]: {
      flex: 'none',
      width: '100%',
      maxWidth: '100%',
    },
  },

  // ─── Action Buttons ───────────────────────────────────────────────────────────
  actionButtonBase: {
    fontSize: '0.8rem',
    fontWeight: 600,
    textTransform: 'none' as const,
    borderRadius: '8px',
    padding: '8px 18px',
    minWidth: 130,
    boxShadow: 'none',
    transition: 'all 0.18s ease',
    '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transform: 'translateY(-1px)' },
    '&:active': { transform: 'translateY(0)' },
    '&:disabled': {
      opacity: 0.5,
      transform: 'none',
      boxShadow: 'none',
    },
  },

  actionButtonAdd: {
    flex: '0 0 auto',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    '&:hover': {
      background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
      boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
      transform: 'translateY(-1px)',
    },
    '&:disabled': {
      background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)',
      color: '#94a3b8',
    },
    [theme.breakpoints.down('sm')]: {
      flex: 'none',
      width: '100%',
    },
  },

  // ─── Doc Option ───────────────────────────────────────────────────────────────
  docOption: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    py: '8px !important',
    px: '12px !important',
    fontSize: '0.82rem',
  },

  // ─── Table Section ───────────────────────────────────────────────────────────
  tableSection: {
    borderRadius: 14,
    overflow: 'hidden',
    border: '1px solid rgba(99,102,241,0.1)',
    boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
    marginBottom: theme.spacing(3),
  },

  tableSectionHeader: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: theme.spacing(1.5),
    padding: theme.spacing(1.5, 2.5),
    background: 'linear-gradient(135deg, rgba(99,102,241,0.07) 0%, rgba(124,58,237,0.05) 100%)',
    borderBottom: '1px solid rgba(99,102,241,0.1)',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5),
      gap: theme.spacing(1),
    },
  },

  searchField: {
    marginLeft: 'auto',
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
        border: '1px solid rgba(99,102,241,0.18)',
        borderRadius: 40,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: '1px solid rgba(99,102,241,0.4)',
      },
      '&.Mui-focused': {
        boxShadow: '0 0 0 3px rgba(99,102,241,0.1)',
        '& .MuiOutlinedInput-notchedOutline': {
          border: '1px solid #6366f1',
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
      color: 'rgba(99,102,241,0.6)',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexBasis: '100%',
      marginLeft: 0,
    },
  },

  tableWrapper: {
    overflowX: 'auto' as const,
    background: '#fff',
  },
});
