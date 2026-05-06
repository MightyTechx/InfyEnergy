import { Theme } from '@mui/material/styles';
import { CSSObject } from 'tss-react';

export const getBaseStyles = (theme: Theme): Record<string, CSSObject> => ({
  // ── Full page wrapper ──────────────────────────────────────────────────────
  pageWrapper: {
    minHeight: '100vh',
    background: 'var(--deep-blue)',
    color: '#fff',
    overflowX: 'hidden',
    position: 'relative',
  },

  // ── Particle Canvas ────────────────────────────────────────────────────────
  particleCanvas: {
    position: 'fixed',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none' as const,
  },

  // ── Preloader ──────────────────────────────────────────────────────────────
  loader: {
    position: 'fixed' as const,
    inset: 0,
    background: 'var(--deep-blue)',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    transition: 'opacity 0.9s ease, visibility 0.9s',
  },

  loaderHidden: {
    opacity: 0,
    visibility: 'hidden' as const,
    pointerEvents: 'none' as const,
  },

  loaderRing: {
    position: 'relative' as const,
    width: 180,
    height: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },

  loaderRingSvg: {
    position: 'absolute' as const,
    inset: 0,
    width: '100%',
    height: '100%',
    animation: 'ring-spin 3s linear infinite',
  },

  loaderRingCircle: {
    fill: 'none',
    stroke: 'var(--neon-cyan)',
    strokeWidth: 2,
    strokeDasharray: '30 500',
    strokeLinecap: 'round',
    filter: 'drop-shadow(0 0 6px var(--neon-cyan))',
  },

  loaderTurbine: {
    width: 100,
    height: 100,
    filter: 'drop-shadow(0 0 18px var(--neon-cyan))',
  },

  loaderTurbineSvg: {
    width: '100%',
    height: '100%',
  },

  loaderTurbineGroup: {
    transformOrigin: '50px 42px',
    animation: 'spin 2s linear infinite',
  },

  loaderTurbinePath: {
    stroke: 'rgba(255,255,255,0.2)',
    strokeWidth: 2,
    fill: 'none',
  },

  loaderTurbineBlade: {
    fill: 'var(--neon-cyan)',
  },

  loaderTurbineCircle: {
    fill: 'var(--neon-cyan)',
  },

  loaderText: {
    fontFamily: 'Orbitron',
    color: 'var(--neon-cyan)',
    letterSpacing: 6,
    fontSize: '0.65rem',
    textShadow: '0 0 15px var(--neon-cyan)',
    marginBottom: 20,
  },

  loaderBarWrap: {
    width: 260,
    height: 2,
    background: 'rgba(0,242,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },

  loaderBar: {
    height: '100%',
    width: '100%',
    background: 'linear-gradient(90deg, var(--neon-cyan), var(--accent-green))',
    borderRadius: 2,
    boxShadow: '0 0 12px var(--neon-cyan)',
  },

  // ── Header ─────────────────────────────────────────────────────────────────
  header: {
    position: 'fixed' as const,
    top: 0,
    width: '100%',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 6%',
    height: 68,
    background: 'rgba(2,11,22,0.75)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid var(--border-glow)',
    transition: 'background 0.3s',
  },

  headerScrolled: {
    background: 'rgba(2,11,22,0.95)',
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontFamily: 'Orbitron',
    color: 'var(--neon-cyan)',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '1rem',
    letterSpacing: 2,
    textShadow: '0 0 12px rgba(0,242,255,0.5)',
    cursor: 'pointer',
  },

  headerTurbine: {
    width: 32,
    height: 32,
  },

  navList: {
    display: 'flex',
    listStyle: 'none',
    gap: 6,
    margin: 0,
    padding: 0,
  },

  navLink: {
    color: 'rgba(255,255,255,0.65)',
    textDecoration: 'none',
    fontSize: '0.88rem',
    fontWeight: 600,
    letterSpacing: 1,
    padding: '8px 14px',
    borderRadius: 4,
    transition: 'all 0.25s',
    cursor: 'pointer',
    position: 'relative' as const,
    '&::after': {
      content: '""',
      position: 'absolute' as const,
      bottom: 4,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 0,
      height: 1,
      background: 'var(--neon-cyan)',
      boxShadow: '0 0 8px var(--neon-cyan)',
      transition: 'width 0.25s',
    },
    '&:hover': {
      color: '#fff',
    },
  },

  navLinkHover: {
    '&:hover::after': {
      width: '60%',
    },
  },

  navCta: {
    background: 'linear-gradient(135deg, var(--neon-cyan), #0099ff)',
    color: 'var(--deep-blue) !important',
    fontWeight: 700,
    borderRadius: 4,
    padding: '8px 18px',
    boxShadow: '0 0 20px rgba(0,242,255,0.3)',
    '&:hover': {
      boxShadow: '0 0 35px rgba(0,242,255,0.6)',
      transform: 'translateY(-1px)',
    },
    '&::after': {
      display: 'none',
    },
  },

  // ── Hero Section ────────────────────────────────────────────────────────────
  hero: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0 10%',
    overflow: 'hidden',
    background: `url('https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=2000&auto=format&fit=crop') center/cover no-repeat`,
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      inset: 0,
      background:
        'linear-gradient(180deg, rgba(2,11,22,0.5) 0%, rgba(2,11,22,0.3) 40%, rgba(2,11,22,0.85) 100%)',
    },
  },

  heroInner: {
    position: 'relative',
    zIndex: 2,
  },

  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: 'Orbitron',
    fontSize: '0.6rem',
    letterSpacing: 4,
    color: 'var(--accent-green)',
    border: '1px solid rgba(61,252,173,0.3)',
    padding: '6px 18px',
    borderRadius: 2,
    marginBottom: 28,
    background: 'rgba(61,252,173,0.05)',
    backdropFilter: 'blur(6px)',
    animation: 'fadeUp 0.9s ease both',
    animationDelay: '0s',
  },

  heroBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: 'var(--accent-green)',
    boxShadow: '0 0 8px var(--accent-green)',
  },

  heroTitle: {
    fontFamily: 'Orbitron',
    fontSize: 'clamp(2.6rem, 7vw, 5.2rem)',
    fontWeight: 900,
    lineHeight: 1.1,
    letterSpacing: 2,
    marginBottom: 8,
    background: 'linear-gradient(135deg, #ffffff 0%, var(--neon-cyan) 50%, #aaf0ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: 'drop-shadow(0 0 30px rgba(0,242,255,0.4))',
    animation: 'fadeUp 0.9s ease both',
    animationDelay: '0.1s',
  },

  heroSub: {
    fontFamily: 'Orbitron',
    fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
    fontWeight: 400,
    letterSpacing: 6,
    color: 'rgba(255,255,255,0.55)',
    marginBottom: 20,
    animation: 'fadeUp 0.9s ease both',
    animationDelay: '0.2s',
  },

  heroDesc: {
    maxWidth: 600,
    margin: '0 auto 40px',
    color: 'rgba(255,255,255,0.65)',
    fontSize: '1.05rem',
    lineHeight: 1.7,
    fontWeight: 400,
    animation: 'fadeUp 0.9s ease both',
    animationDelay: '0.3s',
  },

  heroStats: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    borderTop: '1px solid var(--border-glow)',
    background: 'rgba(2,11,22,0.7)',
    backdropFilter: 'blur(16px)',
    zIndex: 2,
  },

  statItem: {
    flex: 1,
    maxWidth: 220,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '22px 20px',
    borderRight: '1px solid var(--border-glow)',
    '&:last-child': {
      borderRight: 'none',
    },
  },

  statNum: {
    fontFamily: 'Orbitron',
    fontSize: '1.8rem',
    fontWeight: 700,
    color: 'var(--neon-cyan)',
    lineHeight: 1,
    textShadow: '0 0 20px rgba(0,242,255,0.6)',
  },

  statLabel: {
    fontSize: '0.72rem',
    letterSpacing: 2,
    color: 'var(--text-muted)',
    marginTop: 6,
    textTransform: 'uppercase' as const,
  },

  // ── Section Shared ──────────────────────────────────────────────────────────
  section: {
    position: 'relative',
    zIndex: 1,
    padding: '120px 8%',
  },

  sectionHeader: {
    marginBottom: 60,
  },

  sectionEyebrow: {
    fontFamily: 'Orbitron',
    fontSize: '0.58rem',
    letterSpacing: 5,
    color: 'var(--accent-green)',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
    '&::before': {
      content: '""',
      display: 'block',
      width: 30,
      height: 1,
      background: 'var(--accent-green)',
      boxShadow: '0 0 8px var(--accent-green)',
    },
  },

  sectionTitle: {
    fontFamily: 'Orbitron',
    fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
    fontWeight: 700,
    lineHeight: 1.2,
    background: 'linear-gradient(135deg, #fff 30%, var(--neon-cyan) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  sectionLine: {
    width: 60,
    height: 2,
    background: 'linear-gradient(90deg, var(--neon-cyan), transparent)',
    boxShadow: '0 0 12px var(--neon-cyan)',
    marginTop: 16,
  },

  // ── About Section ──────────────────────────────────────────────────────────
  aboutSection: {
    background: 'linear-gradient(180deg, var(--deep-blue) 0%, var(--mid-blue) 100%)',
  },

  aboutGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 60,
    alignItems: 'start',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },

  aboutText: {
    '& p': {
      color: 'rgba(255,255,255,0.72)',
      fontSize: '1rem',
      lineHeight: 1.85,
      marginBottom: 16,
      fontWeight: 400,
    },
  },

  aboutTextFirst: {
    fontSize: '1.1rem',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.88)',
  },

  aboutFeatures: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 16,
  },

  featRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 16,
    padding: '20px 22px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border-glow)',
    borderRadius: 4,
    transition: 'all 0.3s',
    cursor: 'default',
    '&:hover': {
      background: 'rgba(0,242,255,0.04)',
      borderColor: 'var(--neon-cyan)',
      transform: 'translateX(6px)',
      boxShadow: '-4px 0 24px rgba(0,242,255,0.08), 0 0 0 1px rgba(0,242,255,0.15)',
    },
  },

  featIcon: {
    width: 42,
    height: 42,
    flexShrink: 0,
    background: 'var(--neon-cyan-dim)',
    border: '1px solid var(--border-glow)',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
  },

  featInfo: {
    '& h4': {
      fontFamily: 'Orbitron',
      fontSize: '0.78rem',
      color: 'var(--neon-cyan)',
      letterSpacing: 1,
      marginBottom: 4,
    },
    '& p': {
      color: 'var(--text-muted)',
      fontSize: '0.88rem',
      lineHeight: 1.5,
      margin: 0,
    },
  },

  // ── Platform / Cards Section ─────────────────────────────────────────────────
  platformSection: {
    background: 'linear-gradient(180deg, var(--mid-blue) 0%, #030f1e 100%)',
  },

  platformGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 2,
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },

  platformCard: {
    position: 'relative',
    overflow: 'hidden',
    padding: '36px 32px',
    background: 'rgba(4,30,54,0.7)',
    border: '1px solid rgba(0,242,255,0.08)',
    transition: 'all 0.4s',
    cursor: 'default',
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      height: 2,
      background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)',
      opacity: 0,
      transition: 'opacity 0.4s',
    },
    '&::after': {
      content: '""',
      position: 'absolute' as const,
      top: '-60%',
      left: '-20%',
      width: '140%',
      height: '140%',
      background: 'radial-gradient(circle, rgba(0,242,255,0.06) 0%, transparent 65%)',
      opacity: 0,
      transition: 'opacity 0.4s',
    },
    '&:hover': {
      background: 'rgba(0,242,255,0.04)',
      borderColor: 'rgba(0,242,255,0.3)',
      transform: 'translateY(-4px)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,242,255,0.15)',
      zIndex: 1,
    },
    '&:hover::before': {
      opacity: 1,
    },
    '&:hover::after': {
      opacity: 1,
    },
  },

  cardNumber: {
    fontFamily: 'Orbitron',
    fontSize: '0.58rem',
    color: 'rgba(0,242,255,0.3)',
    letterSpacing: 3,
    marginBottom: 16,
  },

  cardIconWrap: {
    width: 52,
    height: 52,
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    background: 'rgba(0,242,255,0.07)',
    border: '1px solid rgba(0,242,255,0.15)',
    borderRadius: 6,
    transition: 'all 0.4s',
    '&:hover': {
      background: 'rgba(0,242,255,0.12)',
      borderColor: 'var(--neon-cyan)',
      boxShadow: '0 0 20px rgba(0,242,255,0.2)',
    },
  },

  cardTitle: {
    fontFamily: 'Orbitron',
    fontSize: '0.88rem',
    color: '#fff',
    letterSpacing: 1,
    marginBottom: 16,
  },

  cardList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  cardListItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.9rem',
    padding: '7px 0',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    transition: 'color 0.25s',
    '&::before': {
      content: '""',
      display: 'block',
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: 'var(--accent-green)',
      boxShadow: '0 0 6px var(--accent-green)',
      flexShrink: 0,
    },
  },

  // ── Live Metrics Strip ──────────────────────────────────────────────────────
  metricsStrip: {
    background: 'rgba(0,10,20,0.95)',
    borderTop: '1px solid var(--border-glow)',
    borderBottom: '1px solid var(--border-glow)',
    padding: 0,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
  },

  metricsInner: {
    display: 'flex',
    padding: 0,
  },

  metricBlock: {
    flex: 1,
    padding: '28px 24px',
    borderRight: '1px solid var(--border-glow)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    transition: 'background 0.3s',
    '&:last-child': {
      borderRight: 'none',
    },
    '&:hover': {
      background: 'rgba(0,242,255,0.03)',
    },
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      bottom: 0,
      left: 0,
      right: 0,
      height: 2,
      background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)',
      transform: 'scaleX(0)',
      transition: 'transform 0.4s',
    },
    '&:hover::before': {
      transform: 'scaleX(1)',
    },
  },

  metricVal: {
    fontFamily: 'Orbitron',
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: 1,
    background: 'linear-gradient(135deg, var(--neon-cyan), #fff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: 'drop-shadow(0 0 15px rgba(0,242,255,0.5))',
  },

  metricLbl: {
    fontSize: '0.68rem',
    letterSpacing: 3,
    color: 'var(--text-muted)',
    marginTop: 6,
  },

  metricTrend: {
    fontSize: '0.72rem',
    color: 'var(--accent-green)',
    marginTop: 4,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },

  // ── Careers Section ────────────────────────────────────────────────────────
  careersSection: {
    background: 'linear-gradient(180deg, #030f1e 0%, var(--mid-blue) 100%)',
  },

  careersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24,
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },

  careerCard: {
    position: 'relative',
    overflow: 'hidden',
    padding: '40px 32px',
    background: 'rgba(4,30,54,0.5)',
    border: '1px solid var(--border-glow)',
    borderRadius: 4,
    transition: 'all 0.4s',
    '&:hover': {
      transform: 'translateY(-6px)',
      borderColor: 'var(--neon-cyan)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,242,255,0.1)',
    },
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      top: 0,
      left: 0,
      bottom: 0,
      width: 3,
      background: 'linear-gradient(180deg, var(--neon-cyan), var(--accent-green))',
      boxShadow: '2px 0 20px rgba(0,242,255,0.3)',
      opacity: 0,
      transition: 'opacity 0.4s',
    },
    '&:hover::before': {
      opacity: 1,
    },
  },

  careerIcon: {
    fontSize: '2.2rem',
    marginBottom: 20,
  },

  careerCardTitle: {
    fontFamily: 'Orbitron',
    fontSize: '0.9rem',
    color: '#fff',
    letterSpacing: 1,
    marginBottom: 14,
  },

  careerCardText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.95rem',
    lineHeight: 1.6,
  },

  careerTag: {
    display: 'inline-block',
    marginTop: 20,
    fontFamily: 'Orbitron',
    fontSize: '0.58rem',
    color: 'var(--accent-green)',
    letterSpacing: 2,
    border: '1px solid rgba(61,252,173,0.25)',
    padding: '5px 12px',
    borderRadius: 2,
    background: 'var(--accent-green-dim)',
  },

  // ── Contact Section ─────────────────────────────────────────────────────────
  contactSection: {
    background: 'linear-gradient(180deg, var(--mid-blue) 0%, var(--deep-blue) 100%)',
  },

  contactWrap: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 80,
    alignItems: 'start',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gap: 40,
    },
  },

  contactInfo: {
    '& h3': {
      fontFamily: 'Orbitron',
      fontSize: '1.1rem',
      color: '#fff',
      marginBottom: 16,
    },
    '& p': {
      color: 'var(--text-muted)',
      fontSize: '0.95rem',
      lineHeight: 1.7,
      marginBottom: 30,
    },
  },

  contactDetail: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 14,
  },

  cdItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '14px 18px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border-glow)',
    borderRadius: 4,
  },

  cdIcon: {
    width: 36,
    height: 36,
    flexShrink: 0,
    background: 'var(--neon-cyan-dim)',
    border: '1px solid var(--border-glow)',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
  },

  cdText: {
    '& span': {
      display: 'block',
    },
  },

  cdLabel: {
    fontSize: '0.68rem',
    letterSpacing: 2,
    color: 'var(--text-muted)',
  },

  cdValue: {
    fontSize: '0.9rem',
    color: '#fff',
    fontWeight: 600,
    marginTop: 2,
  },

  contactForm: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 14,
  },

  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 14,
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },

  inputField: {
    width: '100%',
    padding: '15px 18px',
    background: 'rgba(4,30,54,0.7)',
    border: '1px solid var(--border-glow)',
    color: '#fff',
    fontFamily: 'Rajdhani, sans-serif',
    fontSize: '0.95rem',
    fontWeight: 500,
    borderRadius: 2,
    outline: 'none',
    transition: 'all 0.3s',
    '&::placeholder': {
      color: 'rgba(255,255,255,0.3)',
    },
    '&:focus': {
      borderColor: 'var(--neon-cyan)',
      background: 'rgba(0,242,255,0.05)',
      boxShadow: '0 0 0 3px rgba(0,242,255,0.08), 0 0 20px rgba(0,242,255,0.1)',
    },
  },

  textareaField: {
    resize: 'vertical',
    minHeight: 130,
  },

  selectField: {
    cursor: 'pointer',
    '& option': {
      background: 'var(--mid-blue)',
      color: '#fff',
    },
  },

  btnSubmit: {
    width: '100%',
    padding: 18,
    background: 'linear-gradient(135deg, var(--neon-cyan), #0099ee)',
    color: 'var(--deep-blue)',
    fontFamily: 'Orbitron',
    fontWeight: 700,
    fontSize: '0.8rem',
    letterSpacing: 3,
    border: 'none',
    cursor: 'pointer',
    clipPath: 'polygon(0 0, 96% 0, 100% 15%, 100% 100%, 4% 100%, 0 85%)',
    boxShadow: '0 0 30px rgba(0,242,255,0.3)',
    transition: 'all 0.3s',
    position: 'relative' as const,
    overflow: 'hidden',
    '&:hover': {
      boxShadow: '0 0 50px rgba(0,242,255,0.5)',
      transform: 'translateY(-2px)',
    },
  },

  // ── Footer ─────────────────────────────────────────────────────────────────
  footer: {
    background: 'rgba(1,5,12,0.98)',
    borderTop: '1px solid var(--border-glow)',
    padding: '70px 8% 30px',
    position: 'relative',
    zIndex: 1,
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      top: 0,
      left: '8%',
      right: '8%',
      height: 1,
      background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)',
      boxShadow: '0 0 20px rgba(0,242,255,0.4)',
    },
  },

  footerGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: 50,
    marginBottom: 50,
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr 1fr',
      gap: 30,
    },
  },

  footerBrand: {
    '& p': {
      color: 'var(--text-muted)',
      fontSize: '0.88rem',
      lineHeight: 1.7,
      maxWidth: 280,
    },
  },

  footerBrandLogoContainer: {
    marginBottom: 16,
  },

  footerCol: {
    '& h5': {
      fontFamily: 'Orbitron',
      fontSize: '0.65rem',
      color: 'var(--neon-cyan)',
      letterSpacing: 3,
      marginBottom: 18,
    },
    '& ul': {
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    '& li': {
      marginBottom: 10,
    },
    '& a': {
      color: 'var(--text-muted)',
      textDecoration: 'none',
      fontSize: '0.88rem',
      transition: 'color 0.25s',
      '&:hover': {
        color: 'var(--neon-cyan)',
      },
    },
  },

  footerBottom: {
    borderTop: '1px solid rgba(255,255,255,0.05)',
    paddingTop: 24,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: 14,
    '& p': {
      color: 'var(--text-muted)',
      fontSize: '0.8rem',
    },
  },

  statusPill: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: 'var(--accent-green)',
    fontFamily: 'Orbitron',
    fontSize: '0.6rem',
    letterSpacing: 2,
    fontWeight: 700,
  },

  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: 'var(--accent-green)',
    boxShadow: '0 0 10px var(--accent-green)',
  },

  // ── Reveal Animation Classes ────────────────────────────────────────────────
  reveal: {
    opacity: 0,
    transform: 'translateY(30px)',
    transition: 'opacity 0.7s ease, transform 0.7s ease',
  },

  revealVisible: {
    opacity: 1,
    transform: 'translateY(0)',
  },

  revealDelay1: {
    transitionDelay: '0.1s',
  },

  revealDelay2: {
    transitionDelay: '0.2s',
  },

  revealDelay3: {
    transitionDelay: '0.3s',
  },

  revealDelay4: {
    transitionDelay: '0.4s',
  },

  revealDelay5: {
    transitionDelay: '0.5s',
  },

  // ── Global CSS Variables & Keyframes ─────────────────────────────────────────
  globalStyles: {
    '& :root': {
      '--neon-cyan': '#00f2ff',
      '--neon-cyan-dim': 'rgba(0,242,255,0.15)',
      '--pen-blue': '#01315b',
      '--deep-blue': '#020b16',
      '--mid-blue': '#041e36',
      '--border-glow': 'rgba(0,242,255,0.25)',
      '--accent-green': '#3dfcad',
      '--accent-green-dim': 'rgba(61,252,173,0.15)',
      '--gold': '#f5c518',
      '--text-muted': 'rgba(255,255,255,0.55)',
    },
    '& .particle-canvas': {
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none' as const,
    },
    '& @keyframes spin': {
      to: { transform: 'rotate(360deg)' },
    },
    '& @keyframes pulse': {
      '50%': { opacity: 0.3 },
    },
    '& @keyframes fadeUp': {
      from: { opacity: 0, transform: 'translateY(28px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    '& @keyframes ring-spin': {
      to: { transform: 'rotate(360deg)' },
    },
    '& ::-webkit-scrollbar': {
      width: 5,
    },
    '& ::-webkit-scrollbar-track': {
      background: 'var(--deep-blue)',
    },
    '& ::-webkit-scrollbar-thumb': {
      background: 'linear-gradient(180deg, var(--neon-cyan), #004488)',
      borderRadius: 3,
    },
  },
});