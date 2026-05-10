import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(() => ({
  container: {
    flexGrow: 1,
    p: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  pageHeader: {
    mb: 4,
    position: 'relative',
    pr: 3,
  },
  headerOrb: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 150,
    height: 150,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  title: {
    fontWeight: 700,
    color: '#e2e8f0',
    mb: 0.5,
  },
  description: {
    color: '#64748b',
  },
}));