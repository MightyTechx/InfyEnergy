import { Theme } from '@mui/material/styles';
import { CSSObject } from 'tss-react';

export const getBaseStyles = (theme: Theme): Record<string, CSSObject> => ({
  // ─── Container ───────────────────────────────────────────────────────────────
  container: {
    padding: theme.spacing(2),
    minHeight: '100%',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    },
  },

  // ─── Search Bar ──────────────────────────────────────────────────────────────
  searchBar: {
    borderRadius: 12,
    border: '1px solid #e8eaf0',
    padding: theme.spacing(1.5, 2),
    marginBottom: theme.spacing(3),
    background: '#ffffff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },

  searchInput: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { border: 'none' },
    },
    '& .MuiInputBase-input': {
      fontSize: '0.9rem',
      '&::placeholder': {
        color: '#94a3b8',
        opacity: 1,
      },
    },
  },

  // ─── Section ─────────────────────────────────────────────────────────────────
  section: {
    marginBottom: theme.spacing(3),
  },

  sectionTitle: {
    fontWeight: 700,
    fontSize: '0.95rem',
    color: '#1e293b',
    marginBottom: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.75),
  },

  // ─── Quick Action Cards ──────────────────────────────────────────────────────
  quickActionCard: {
    padding: theme.spacing(2.5),
    borderRadius: 12,
    border: '1px solid #e8eaf0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    transition: 'all 0.22s ease',
    height: '100%',
    '&:hover': {
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      transform: 'translateY(-2px)',
      borderColor: 'rgba(79,102,241,0.25)',
    },
  },

  // ─── Contact Cards ───────────────────────────────────────────────────────────
  contactCard: {
    padding: theme.spacing(2.5),
    borderRadius: 12,
    border: '1px solid #e8eaf0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    background: '#ffffff',
    height: '100%',
  },

  // ─── Chat Assistant Card ─────────────────────────────────────────────────────
  chatAssistantCard: {
    borderRadius: 14,
    border: '1px solid rgba(79,70,229,0.15)',
    boxShadow: '0 2px 12px rgba(79,70,229,0.08)',
    padding: theme.spacing(2.5, 3),
    marginBottom: theme.spacing(3),
    background: 'linear-gradient(135deg, rgba(99,102,241,0.03) 0%, rgba(124,58,237,0.02) 100%)',
  },

  chatAssistantContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    flexWrap: 'wrap',
  },

  chatAssistantLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    flex: 1,
  },

  botAvatar: {
    width: 56,
    height: 56,
    borderRadius: 14,
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxShadow: '0 8px 24px rgba(79,70,229,0.35)',
    flexShrink: 0,
  },

  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: '50%',
    background: '#22c55e',
    border: '2px solid #fff',
  },

  chatButton: {
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    fontWeight: 600,
    fontSize: '0.85rem',
    px: 3,
    py: 1,
    borderRadius: 10,
    boxShadow: '0 4px 14px rgba(79,70,229,0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
      boxShadow: '0 6px 20px rgba(79,70,229,0.4)',
      transform: 'translateY(-1px)',
    },
  },

  // ─── FAQ Category ───────────────────────────────────────────────────────────
  faqCategory: {
    marginBottom: theme.spacing(2.5),
    borderRadius: 12,
    overflow: 'hidden',
    border: '1px solid #e8eaf0',
    background: '#ffffff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },

  faqCategoryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.25),
    padding: theme.spacing(2, 2.5),
    background: 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(124,58,237,0.04) 100%)',
    borderBottom: '1px solid rgba(99,102,241,0.1)',
  },

  // ─── FAQ Accordion ───────────────────────────────────────────────────────────
  faqAccordion: {
    background: 'transparent',
    boxShadow: 'none',
    '&::before': { display: 'none' },
    '&.Mui-expanded': { margin: 0 },
    '&:not(:last-child)': {
      borderBottom: '1px solid #f1f5f9',
    },
  },

  faqAccordionSummary: {
    padding: theme.spacing(1.5, 2.5),
    minHeight: 'auto',
    '&.Mui-expanded': { minHeight: 'auto' },
    '& .MuiAccordionSummary-content': { margin: 0 },
    '&:hover': {
      background: 'rgba(99,102,241,0.03)',
    },
  },

  faqAccordionDetails: {
    padding: theme.spacing(0, 2.5, 2),
  },

  // ─── No Results ─────────────────────────────────────────────────────────────
  noResults: {
    padding: theme.spacing(4),
    borderRadius: 12,
    border: '1px solid #e8eaf0',
    textAlign: 'center',
    background: '#ffffff',
  },

  // ─── Need Help Card ─────────────────────────────────────────────────────────
  needHelpCard: {
    padding: theme.spacing(3),
    borderRadius: 14,
    border: '1px solid #e8eaf0',
    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
    background: '#ffffff',
    marginBottom: theme.spacing(3),
  },

  needHelpButton: {
    fontWeight: 600,
    fontSize: '0.82rem',
    borderRadius: 8,
    textTransform: 'none',
    px: 2.5,
  },
});