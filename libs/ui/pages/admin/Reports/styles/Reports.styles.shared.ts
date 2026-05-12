import { Theme } from '@mui/material/styles';
import { CSSObject } from 'tss-react';

export const getBaseStyles = (theme: Theme): Record<string, CSSObject> => ({
  container: {
    padding: theme.spacing(3),
    background: 'linear-gradient(160deg, #f0f4ff 0%, #fafbff 50%, #f0f4ff 100%)',
    minHeight: '100vh',

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5),
    },
  },

  /* PAGE HEADER OVERRIDE (smaller + cleaner) */
  pageHeaderTitle: {
    fontSize: '1.15rem',
    fontWeight: 700,
    color: '#0f172a',
    letterSpacing: '-0.01em',
  },

  pageHeaderDesc: {
    fontSize: '0.78rem',
    color: '#64748b',
    marginTop: 2,
  },

  /* FILTER TOOLBAR */
  filterToolbar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(0),
    marginBottom: theme.spacing(3),
    background: '#ffffff',
    borderRadius: 14,
    border: '1px solid rgba(79,70,229,0.12)',
    boxShadow: '0 4px 16px rgba(99,102,241,0.08)',

    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      padding: theme.spacing(1.5),
    },
  },

  /* FILTER FIELD */
  filterField: {
    width: '100%',

    '& .MuiOutlinedInput-root': {
      height: 38,
      fontSize: '0.78rem',
      background: '#fff',
      display: 'flex',
      alignItems: 'center',

      '& fieldset': {
        borderColor: 'rgba(79,70,229,0.15)',
      },

      '&:hover fieldset': {
        borderColor: 'rgba(79,70,229,0.35)',
      },

      '&.Mui-focused fieldset': {
        borderColor: '#4f46e5',
        borderWidth: 2,
      },
    },

    '& .MuiInputBase-input': {
      fontSize: '0.78rem',
      padding: '9px 10px',
    },

    '& .MuiInputLabel-root': {
      fontSize: '0.78rem',
      color: '#64748b',
    },
  },

  /* FORM CONTROL (SELECT) */
  formControl: {
    width: '100%',

    '& .MuiOutlinedInput-root': {
      borderRadius: '14px !important',
      height: 38,
      fontSize: '0.78rem',
      background: '#fff',
      display: 'flex',
      alignItems: 'center',

      '& fieldset': {
        borderColor: 'rgba(79,70,229,0.15)',
      },

      '&:hover fieldset': {
        borderColor: 'rgba(79,70,229,0.35)',
      },

      '&.Mui-focused fieldset': {
        borderColor: '#4f46e5',
        borderWidth: 2,
      },
    },

    '& .MuiSelect-select': {
      display: 'flex',
      alignItems: 'center',
    },
  },

  /* FILTER AUTOCOMPLETE */
  filterAutocomplete: {
    width: '100%',

    '& .MuiOutlinedInput-root': {
      borderRadius: '14px !important',
      height: 38,
      fontSize: '0.78rem',
      background: '#fff',
      display: 'flex',
      alignItems: 'center',

      '& fieldset': {
        borderColor: 'rgba(79,70,229,0.15)',
      },

      '&:hover fieldset': {
        borderColor: 'rgba(79,70,229,0.35)',
      },

      '&.Mui-focused fieldset': {
        borderColor: '#4f46e5',
        borderWidth: 2,
      },
    },
  },

  /* DATE PICKER FIELD */
  datePickerField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 14,
    },
  },

  /* DOWNLOAD */
  downloadBtn: {
    height: 38,
    borderRadius: 10,
    fontSize: '0.78rem',
    fontWeight: 600,
    textTransform: 'none',
    background: '#180de9 0%',
    color: '#fff',

    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },

  /* TABLE WRAPPER */
  tableSection: {
    borderRadius: 14,
    overflow: 'hidden',
    background: '#fff',
    border: '1px solid rgba(79,70,229,0.1)',
    marginBottom: theme.spacing(3),
  },

  /* TABLE HEADER (FIXED SMALLER TYPOGRAPHY) */
  tableSectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    padding: theme.spacing(1.5, 2),

    background: 'linear-gradient(135deg, rgba(79,70,229,0.04), rgba(14,165,233,0.02))',
    borderBottom: '1px solid rgba(79,70,229,0.08)',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },

  tableSectionTitle: {
    fontWeight: 600,
    color: '#1e293b',
    fontSize: '16px !important',
  },

  tableSectionDate: {
    fontSize: '13px !important',
    color: '#64748b',
  },

  /* SEARCH */
  searchField: {
    width: 220,

    '& .MuiOutlinedInput-root': {
      height: 36,
      borderRadius: 40,
      fontSize: '0.75rem',
    },

    '& .MuiInputBase-input': {
      fontSize: '0.75rem',
    },
  },

  /* TABLE WRAPPER */
  tableWrapper: {
    overflowX: 'auto',
  },

  /* TABLE BODY FONT FIX */
  tableCell: {
    fontSize: '12px !important',
    padding: '5px 10px !important',
    color: '#334155',
  },

  tableCellBold: {
    fontSize: '12px !important',
    fontWeight: 600,
    padding: '5px 10px !important',
  },

  tableHeaderCell: {
    fontSize: '12px !important',
    fontWeight: 600,
    color: '#0f172a',
    padding: '7px 10px !important',
    background: '#f8fafc',
  },
});
