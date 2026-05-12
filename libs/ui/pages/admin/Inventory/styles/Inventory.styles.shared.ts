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

  // ─── Page Header ────────────────────────────────────────────────────────────
  pageHeader: {
    marginBottom: theme.spacing(2.5),
    background: 'linear-gradient(135deg, #0f172a 0%, #134e4a 30%, #0d9488 65%, #0891b2 100%)',
    backgroundSize: '300% 300%',
    borderRadius: 18,
    padding: theme.spacing(3.5, 4),
    position: 'relative' as const,
    overflow: 'hidden',
    boxShadow:
      '0 24px 64px rgba(13,148,136,0.28), 0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -100,
      right: -100,
      width: 350,
      height: 350,
      borderRadius: '50%',
      background:
        'radial-gradient(circle at center, rgba(94,234,212,0.38) 0%, rgba(13,148,136,0.12) 50%, transparent 70%)',
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
      background: 'radial-gradient(circle at center, rgba(8,145,178,0.3) 0%, transparent 70%)',
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
    background: 'radial-gradient(circle at center, rgba(251,191,36,0.18) 0%, transparent 70%)',
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

  // ─── Table Section ───────────────────────────────────────────────────────────
  tableSection: {
    borderRadius: 14,
    overflow: 'hidden',
    border: '1px solid rgba(13,148,136,0.1)',
    boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
    marginTop: theme.spacing(2.5),
  },

  tableSectionHeader: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: theme.spacing(1.5),
    padding: theme.spacing(1.5, 2.5),
    background: 'linear-gradient(135deg, rgba(13,148,136,0.07) 0%, rgba(8,145,178,0.05) 100%)',
    borderBottom: '1px solid rgba(13,148,136,0.1)',
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
        border: '1px solid rgba(13,148,136,0.18)',
        borderRadius: 40,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: '1px solid rgba(13,148,136,0.4)',
      },
      '&.Mui-focused': {
        boxShadow: '0 0 0 3px rgba(13,148,136,0.1)',
        '& .MuiOutlinedInput-notchedOutline': {
          border: '1px solid #0d9488',
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
      color: 'rgba(13,148,136,0.6)',
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

  // ─── Action Buttons Section ──────────────────────────────────────────────────
  actionButtonsSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexWrap: 'wrap' as const,
    gap: theme.spacing(1.25),
    marginBottom: theme.spacing(2.5),
    padding: theme.spacing(1.75, 2.5),
    background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(240,253,250,0.95) 100%)',
    borderRadius: 14,
    border: '1px solid rgba(13,148,136,0.12)',
    boxShadow: '0 2px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(1),
      padding: theme.spacing(1.25),
      justifyContent: 'space-between',
    },
  },

  actionButtonsDivider: {
    width: 1,
    height: 32,
    background: 'rgba(13,148,136,0.15)',
    borderRadius: 1,
    margin: theme.spacing(0, 0.5),
    flexShrink: 0,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  // ─── Action Buttons ───────────────────────────────────────────────────────────
  actionButtonBase: {
    fontSize: '0.8rem',
    fontWeight: 600,
    textTransform: 'none' as const,
    borderRadius: '8px',
    padding: '7px 16px',
    minWidth: 110,
    boxShadow: 'none',
    transition: 'all 0.18s ease',
    '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transform: 'translateY(-1px)' },
    '&:active': { transform: 'translateY(0)' },
  },

  actionButtonAdd: {
    background: 'linear-gradient(135deg, #0d9488, #0891b2)',
    '&:hover': {
      background: 'linear-gradient(135deg, #0f766e, #0e7490)',
      boxShadow: '0 4px 14px rgba(13,148,136,0.4)',
      transform: 'translateY(-1px)',
    },
  },

  actionButtonReceive: {
    background: 'linear-gradient(135deg, #059669, #10b981)',
    '&:hover': {
      background: 'linear-gradient(135deg, #047857, #059669)',
      boxShadow: '0 4px 14px rgba(5,150,105,0.4)',
      transform: 'translateY(-1px)',
    },
  },

  actionButtonIssue: {
    background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    '&:hover': {
      background: 'linear-gradient(135deg, #d97706, #f59e0b)',
      boxShadow: '0 4px 14px rgba(245,158,11,0.4)',
      transform: 'translateY(-1px)',
    },
  },

  actionButtonAdjust: {
    background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
    '&:hover': {
      background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
      boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
      transform: 'translateY(-1px)',
    },
  },

  actionButtonExport: {
    background: 'linear-gradient(135deg, #475569, #64748b)',
    '&:hover': {
      background: 'linear-gradient(135deg, #334155, #475569)',
      boxShadow: '0 4px 14px rgba(71,85,105,0.35)',
      transform: 'translateY(-1px)',
    },
  },

  actionButtonImport: {
    background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    '&:hover': {
      background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
      boxShadow: '0 4px 14px rgba(139,92,246,0.4)',
      transform: 'translateY(-1px)',
    },
  },

  // ─── Filter Autocompletes ────────────────────────────────────────────────────
  filterAutocomplete: {
    width: 220,
    flexShrink: 0,
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      '&:hover fieldset': { borderColor: '#0d9488' },
      '&.Mui-focused fieldset': { borderColor: '#0d9488', borderWidth: '2px' },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#0d9488' },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexBasis: '100%',
    },
  },

  filterAutocompleteSmall: {
    width: 180,
    flexShrink: 0,
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      '&:hover fieldset': { borderColor: '#0d9488' },
      '&.Mui-focused fieldset': { borderColor: '#0d9488', borderWidth: '2px' },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#0d9488' },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexBasis: '100%',
    },
  },

  // ─── Action Icons ──────────────────────────────────────────────────────────────
  editIconButton: {
    color: '#0d9488',
    '&:hover': { background: 'rgba(13,148,136,0.1)' },
  },

  deleteIconButton: {
    color: '#dc2626',
    '&:hover': { background: 'rgba(220,38,38,0.1)' },
  },

  // ─── Dialog Styles ───────────────────────────────────────────────────────────
  dialog: {
    '& .MuiDialog-paper': {
      borderRadius: 16,
      overflow: 'hidden',
      maxHeight: '90vh',
      display: 'flex',
      flexDirection: 'column' as const,
    },
  },

  modalHero: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(2.5, 3),
    background: 'linear-gradient(135deg, #0f172a 0%, #134e4a 40%, #0d9488 70%, #0891b2 100%)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    position: 'relative' as const,
    flexShrink: 0,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -60,
      right: -60,
      width: 200,
      height: 200,
      borderRadius: '50%',
      background: 'radial-gradient(circle at center, rgba(94,234,212,0.3) 0%, transparent 70%)',
      pointerEvents: 'none',
    },
  },

  modalIconBox: {
    width: 50,
    height: 50,
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #0d9488, #0891b2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 16px rgba(13,148,136,0.45)',
    flexShrink: 0,
  },

  modalTitleBox: {
    flex: 1,
    minWidth: 0,
  },

  modalTitle: {
    fontWeight: 700,
    fontSize: '1.15rem',
    color: '#fff',
    letterSpacing: '-0.02em',
  },

  modalSubtitle: {
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },

  modalCloseBtn: {
    color: 'rgba(255,255,255,0.7) !important',
    '&:hover': { color: '#fff !important', background: 'rgba(255,255,255,0.1) !important' },
  },

  // ─── Section Card Styles ────────────────────────────────────────────────────
  sectionCard: {
    borderRadius: 12,
    border: '1px solid',
    borderColor: 'divider',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },

  sectionCardMt: {
    mt: 2,
  },

  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(1.5, 2.5),
    background: 'linear-gradient(135deg, rgba(13,148,136,0.05), rgba(8,145,178,0.03))',
    borderBottom: '1px solid',
    borderColor: 'divider',
  },

  sectionIcon: {
    width: 30,
    height: 30,
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #0d9488, #0891b2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    '& svg': { color: '#fff' },
  },

  // ─── Dialog Content ────────────────────────────────────────────────────────────
  dialogContent: {
    p: 3,
    bgcolor: 'background.default',
    maxHeight: '65vh',
    overflow: 'auto',
  },

  // ─── Form Field Styles ─────────────────────────────────────────────────────────
  formFieldFocused: {
    '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#0d9488' },
    '& label.Mui-focused': { color: '#0d9488' },
  },

  photoUpload: {
    border: '2px dashed rgba(13,148,136,0.3)',
    borderRadius: 12,
    padding: theme.spacing(1.5),
    textAlign: 'center' as const,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: 'rgba(13,148,136,0.02)',
    '&:hover': {
      borderColor: '#0d9488',
      background: 'rgba(13,148,136,0.05)',
    },
  },

  photoUploadIcon: {
    width: 36,
    height: 36,
    borderRadius: '10px',
    background: 'linear-gradient(135deg, rgba(13,148,136,0.1), rgba(8,145,178,0.1))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 8px',
  },

  photoUploadText: {
    fontSize: '0.8rem',
    color: 'text.secondary',
    fontWeight: 500,
  },

  photoUploadHint: {
    fontSize: '0.7rem',
    color: 'text.disabled',
    marginTop: 2,
  },

  dialogActions: {
    padding: theme.spacing(2, 3),
    borderTop: '1px solid',
    borderColor: 'divider',
    background: '#fafafa',
    gap: theme.spacing(1.5),
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: theme.spacing(2),
      gap: theme.spacing(1),
    },
  },

  cancelButton: {
    borderRadius: '10px',
    textTransform: 'none' as const,
    fontWeight: 600,
    fontSize: '0.85rem',
    color: 'text.secondary',
    border: '1px solid',
    borderColor: 'divider',
    minWidth: 'auto',
    '&:hover': {
      background: 'rgba(0,0,0,0.04)',
      borderColor: 'text.disabled',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  submitButton: {
    borderRadius: '10px',
    textTransform: 'none' as const,
    fontWeight: 700,
    fontSize: '0.85rem',
    padding: '10px 28px',
    background: 'linear-gradient(135deg, #0d9488, #0891b2) !important',
    boxShadow: '0 4px 14px rgba(13,148,136,0.35) !important',
    color: '#fff !important',
    minWidth: 'auto',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 20px rgba(13,148,136,0.45) !important',
    },
    '&:disabled': {
      background: 'rgba(0,0,0,0.12) !important',
      boxShadow: 'none !important',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
});
