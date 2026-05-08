import { Theme } from '@mui/material/styles';
import { createAppStyles } from '@infyenergy/theme';
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
    pointerEvents: 'none',
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
    width: 200,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
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
  },

  loaderRingCircleGlow: {
    filter: 'drop-shadow(0 0 8px var(--neon-cyan))',
  },

  loaderRingSvgAnimate: {
    animation: 'ring-spin 3s linear infinite',
  },

  loaderTurbine: {
    width: 120,
    height: 120,
    filter: 'drop-shadow(0 0 25px var(--neon-cyan))',
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
    letterSpacing: 8,
    fontSize: '0.7rem',
    textShadow: '0 0 20px var(--neon-cyan)',
    marginBottom: 30,
    animation: 'pulse 2s ease-in-out infinite',
  },

  loaderBarWrap: {
    width: 300,
    height: 3,
    background: 'rgba(0,242,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    position: 'relative',
  },

  loaderBar: {
    height: '100%',
    width: '100%',
    background:
      'linear-gradient(90deg, transparent, var(--neon-cyan), var(--accent-green), transparent)',
    borderRadius: 3,
    boxShadow: '0 0 20px var(--neon-cyan)',
    animation: 'shimmer 1.5s ease-in-out infinite',
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
    padding: '0 8%',
    height: 72,
    background: 'rgba(2,11,22,0.8)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    borderBottom: '1px solid var(--border-glow)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  headerScrolled: {
    background: 'rgba(2,11,22,0.98)',
    boxShadow: '0 4px 30px rgba(0,0,0,0.5), 0 0 60px rgba(0,242,255,0.05)',
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    fontFamily: 'Orbitron',
    color: 'var(--neon-cyan)',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '1.05rem',
    letterSpacing: 3,
    textShadow: '0 0 15px rgba(0,242,255,0.6)',
    cursor: 'pointer',
  },

  headerTurbine: {
    width: 36,
    height: 36,
    filter: 'drop-shadow(0 0 8px rgba(0,242,255,0.5))',
  },

  navList: {
    display: 'flex',
    listStyle: 'none',
    gap: 8,
    margin: 0,
    padding: 0,
  },

  navLink: {
    color: 'rgba(255,255,255,0.7)',
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: 600,
    letterSpacing: 1.5,
    padding: '10px 18px',
    borderRadius: 4,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative' as const,
    '&::after': {
      content: '""',
      position: 'absolute' as const,
      bottom: 6,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 0,
      height: 2,
      background: 'var(--neon-cyan)',
      boxShadow: '0 0 10px var(--neon-cyan)',
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    '&:hover': {
      color: '#fff',
      background: 'rgba(0,242,255,0.08)',
    },
  },

  navLinkHover: {
    '&:hover::after': {
      width: '60%',
    },
  },

  navCta: {
    background: 'linear-gradient(135deg, var(--neon-cyan) 0%, #0099ff 100%)',
    color: 'var(--deep-blue) !important',
    fontWeight: 700,
    borderRadius: 6,
    padding: '10px 24px',
    boxShadow: '0 0 30px rgba(0,242,255,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
    '&:hover': {
      boxShadow: '0 0 50px rgba(0,242,255,0.7), inset 0 1px 0 rgba(255,255,255,0.2)',
      transform: 'translateY(-2px) scale(1.02)',
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
    padding: '0 8%',
    overflow: 'hidden',
    background: `linear-gradient(180deg, rgba(2,11,22,0.7) 0%, rgba(2,11,22,0.5) 50%, rgba(2,11,22,0.9) 100%), url('https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=2000&auto=format&fit=crop') center/cover no-repeat`,
  },

  heroGlowOrb: {
    position: 'absolute' as const,
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0,242,255,0.15) 0%, transparent 70%)',
    filter: 'blur(60px)',
    pointerEvents: 'none',
    animation: 'float 8s ease-in-out infinite',
  },

  heroGlowOrb2: {
    position: 'absolute' as const,
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(61,252,173,0.1) 0%, transparent 70%)',
    filter: 'blur(80px)',
    pointerEvents: 'none',
    animation: 'float 10s ease-in-out infinite reverse',
  },

  heroInner: {
    position: 'relative',
    zIndex: 2,
  },

  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    fontFamily: 'Orbitron',
    fontSize: '0.65rem',
    letterSpacing: 5,
    color: 'var(--accent-green)',
    border: '1px solid rgba(61,252,173,0.4)',
    padding: '8px 22px',
    borderRadius: 30,
    marginBottom: 36,
    background: 'rgba(61,252,173,0.05)',
    backdropFilter: 'blur(10px)',
    animation: 'fadeUp 1s ease both, pulse 3s ease-in-out infinite',
    boxShadow: '0 0 30px rgba(61,252,173,0.1), inset 0 0 20px rgba(61,252,173,0.05)',
  },

  heroBadgeDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: 'var(--accent-green)',
    boxShadow: '0 0 12px var(--accent-green), 0 0 24px var(--accent-green)',
    animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
  },

  heroTitle: {
    fontFamily: 'Orbitron',
    fontSize: 'clamp(3rem, 10vw, 6.5rem)',
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: 4,
    marginBottom: 16,
    background: 'linear-gradient(135deg, #ffffff 0%, var(--neon-cyan) 50%, #80f7ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: 'drop-shadow(0 0 40px rgba(0,242,255,0.5))',
    animation: 'fadeUp 1s ease both',
    animationDelay: '0.1s',
  },

  heroSub: {
    fontFamily: 'Orbitron',
    fontSize: 'clamp(0.9rem, 2vw, 1.3rem)',
    fontWeight: 400,
    letterSpacing: 10,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 32,
    animation: 'fadeUp 1s ease both',
    animationDelay: '0.2s',
  },

  heroDesc: {
    maxWidth: 700,
    margin: '0 auto 50px',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '1.15rem',
    lineHeight: 1.8,
    fontWeight: 400,
    animation: 'fadeUp 1s ease both',
    animationDelay: '0.3s',
  },

  heroTurbineDisplay: {
    position: 'absolute' as const,
    right: '8%',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '400px',
    height: '400px',
    opacity: 0.15,
    pointerEvents: 'none',
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },

  heroStats: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    borderTop: '1px solid var(--border-glow)',
    background: 'rgba(2,11,22,0.85)',
    backdropFilter: 'blur(20px)',
    zIndex: 2,
  },

  statItem: {
    flex: 1,
    maxWidth: 240,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '28px 24px',
    borderRight: '1px solid var(--border-glow)',
    transition: 'all 0.4s ease',
    '&:hover': {
      background: 'rgba(0,242,255,0.05)',
    },
    '&:last-child': {
      borderRight: 'none',
    },
  },

  statNum: {
    fontFamily: 'Orbitron',
    fontSize: '2rem',
    fontWeight: 700,
    color: 'var(--neon-cyan)',
    lineHeight: 1,
    textShadow: '0 0 25px rgba(0,242,255,0.7)',
  },

  statLabel: {
    fontSize: '0.7rem',
    letterSpacing: 3,
    color: 'var(--text-muted)',
    marginTop: 8,
    textTransform: 'uppercase' as const,
  },

  // ── Section Shared ──────────────────────────────────────────────────────────
  section: {
    position: 'relative',
    zIndex: 1,
    padding: '140px 10%',
  },

  sectionHeader: {
    marginBottom: 70,
    textAlign: 'center' as const,
  },

  sectionEyebrow: {
    fontFamily: 'Orbitron',
    fontSize: '0.65rem',
    letterSpacing: 6,
    color: 'var(--accent-green)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
    padding: '10px 24px',
    border: '1px solid rgba(61,252,173,0.3)',
    borderRadius: 30,
    background: 'rgba(61,252,173,0.05)',
  },

  sectionTitle: {
    fontFamily: 'Orbitron',
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 700,
    lineHeight: 1.15,
    background: 'linear-gradient(135deg, #fff 0%, var(--neon-cyan) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: 20,
  },

  sectionLine: {
    width: 80,
    height: 3,
    background: 'linear-gradient(90deg, var(--neon-cyan), var(--accent-green))',
    boxShadow: '0 0 20px var(--neon-cyan)',
    margin: '0 auto',
    borderRadius: 3,
  },

  // ── About Section ──────────────────────────────────────────────────────────
  aboutSection: {
    background: 'linear-gradient(180deg, var(--deep-blue) 0%, var(--mid-blue) 100%)',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      height: 1,
      background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)',
      boxShadow: '0 0 30px var(--neon-cyan)',
    },
  },

  aboutGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: 80,
    alignItems: 'start',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },

  aboutText: {
    '& p': {
      color: 'rgba(255,255,255,0.7)',
      fontSize: '1.05rem',
      lineHeight: 1.9,
      marginBottom: 20,
      fontWeight: 400,
    },
  },

  aboutTextFirst: {
    fontSize: '1.2rem !important',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.9) !important',
    marginBottom: '24px !important',
  },

  aboutFeatures: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 16,
  },

  featRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 20,
    padding: '24px 28px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--border-glow)',
    borderRadius: 12,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'default',
    '&:hover': {
      background: 'rgba(0,242,255,0.06)',
      borderColor: 'var(--neon-cyan)',
      transform: 'translateX(10px)',
      boxShadow: '-8px 0 30px rgba(0,242,255,0.1), 0 0 0 1px rgba(0,242,255,0.2)',
    },
  },

  featIcon: {
    width: 50,
    height: 50,
    flexShrink: 0,
    background: 'linear-gradient(135deg, rgba(0,242,255,0.2), rgba(0,242,255,0.05))',
    border: '1px solid var(--border-glow)',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.3rem',
  },

  featInfo: {
    '& h4': {
      fontFamily: 'Orbitron',
      fontSize: '0.85rem',
      color: 'var(--neon-cyan)',
      letterSpacing: 1.5,
      marginBottom: 6,
    },
    '& p': {
      color: 'var(--text-muted)',
      fontSize: '0.95rem',
      lineHeight: 1.6,
      margin: 0,
    },
  },

  // ── Platform / Cards Section ─────────────────────────────────────────────────
  platformSection: {
    background: 'linear-gradient(180deg, var(--mid-blue) 0%, #020a15 100%)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '800px',
      height: '800px',
      background: 'radial-gradient(circle, rgba(0,242,255,0.05) 0%, transparent 60%)',
      pointerEvents: 'none',
    },
  },

  platformGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24,
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },

  platformCard: {
    position: 'relative',
    overflow: 'hidden',
    padding: '40px 36px',
    background: 'linear-gradient(145deg, rgba(4,30,54,0.8), rgba(2,11,22,0.9))',
    border: '1px solid rgba(0,242,255,0.1)',
    borderRadius: 20,
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'default',
    backdropFilter: 'blur(10px)',
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      height: 3,
      background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)',
      opacity: 0,
      transition: 'opacity 0.5s',
    },
    '&::after': {
      content: '""',
      position: 'absolute' as const,
      top: '-80%',
      left: '-30%',
      width: '160%',
      height: '160%',
      background: 'radial-gradient(circle, rgba(0,242,255,0.08) 0%, transparent 50%)',
      opacity: 0,
      transition: 'opacity 0.5s',
    },
    '&:hover': {
      background: 'linear-gradient(145deg, rgba(0,242,255,0.1), rgba(2,11,22,0.95))',
      borderColor: 'rgba(0,242,255,0.4)',
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow:
        '0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(0,242,255,0.15), inset 0 0 30px rgba(0,242,255,0.03)',
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
    fontSize: '0.6rem',
    color: 'rgba(0,242,255,0.4)',
    letterSpacing: 4,
    marginBottom: 20,
  },

  cardIconWrap: {
    width: 64,
    height: 64,
    marginBottom: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.8rem',
    background: 'linear-gradient(135deg, rgba(0,242,255,0.15), rgba(0,242,255,0.02))',
    border: '1px solid rgba(0,242,255,0.2)',
    borderRadius: 16,
    transition: 'all 0.5s ease',
  },

  cardTitle: {
    fontFamily: 'Orbitron',
    fontSize: '1rem',
    color: '#fff',
    letterSpacing: 1.5,
    marginBottom: 20,
  },

  cardList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  cardListItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.95rem',
    padding: '10px 0',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    transition: 'color 0.3s',
    '&::before': {
      content: '""',
      display: 'block',
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--accent-green)',
      boxShadow: '0 0 8px var(--accent-green)',
      flexShrink: 0,
    },
  },

  // ── Live Metrics Strip ──────────────────────────────────────────────────────
  metricsStrip: {
    background: 'rgba(1,5,12,0.98)',
    borderTop: '1px solid var(--border-glow)',
    borderBottom: '1px solid var(--border-glow)',
    padding: 0,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
    boxShadow: '0 10px 60px rgba(0,0,0,0.5)',
  },

  metricsInner: {
    display: 'flex',
    padding: 0,
  },

  metricBlock: {
    flex: 1,
    padding: '36px 28px',
    borderRight: '1px solid var(--border-glow)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.4s ease',
    '&:last-child': {
      borderRight: 'none',
    },
    '&:hover': {
      background: 'rgba(0,242,255,0.05)',
    },
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      bottom: 0,
      left: 0,
      right: 0,
      height: 3,
      background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)',
      transform: 'scaleX(0)',
      transition: 'transform 0.5s ease',
    },
    '&:hover::before': {
      transform: 'scaleX(1)',
    },
  },

  metricVal: {
    fontFamily: 'Orbitron',
    fontSize: '2.2rem',
    fontWeight: 700,
    lineHeight: 1,
    background: 'linear-gradient(135deg, var(--neon-cyan), #fff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: 'drop-shadow(0 0 20px rgba(0,242,255,0.6))',
    marginBottom: 8,
  },

  metricLbl: {
    fontSize: '0.7rem',
    letterSpacing: 3,
    color: 'var(--text-muted)',
    textTransform: 'uppercase' as const,
    marginBottom: 6,
  },

  metricTrend: {
    fontSize: '0.75rem',
    color: 'var(--accent-green)',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },

  // ── Careers Section ────────────────────────────────────────────────────────
  careersSection: {
    background: 'linear-gradient(180deg, #020a15 0%, var(--mid-blue) 100%)',
  },

  careersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 30,
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },

  careerCard: {
    position: 'relative',
    overflow: 'hidden',
    padding: '48px 36px',
    background: 'linear-gradient(145deg, rgba(4,30,54,0.6), rgba(2,11,22,0.8))',
    border: '1px solid var(--border-glow)',
    borderRadius: 20,
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-10px)',
      borderColor: 'var(--neon-cyan)',
      boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(0,242,255,0.15)',
    },
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      top: 0,
      left: 0,
      bottom: 0,
      width: 4,
      background: 'linear-gradient(180deg, var(--neon-cyan), var(--accent-green))',
      boxShadow: '4px 0 30px rgba(0,242,255,0.4)',
      opacity: 0,
      transition: 'opacity 0.5s',
    },
    '&:hover::before': {
      opacity: 1,
    },
  },

  careerIcon: {
    fontSize: '2.8rem',
    marginBottom: 24,
    filter: 'drop-shadow(0 0 10px rgba(0,242,255,0.3))',
  },

  careerCardTitle: {
    fontFamily: 'Orbitron',
    fontSize: '1.05rem',
    color: '#fff',
    letterSpacing: 1.5,
    marginBottom: 16,
  },

  careerCardText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '1rem',
    lineHeight: 1.7,
  },

  careerTag: {
    display: 'inline-block',
    marginTop: 28,
    fontFamily: 'Orbitron',
    fontSize: '0.6rem',
    color: 'var(--accent-green)',
    letterSpacing: 3,
    border: '1px solid rgba(61,252,173,0.3)',
    padding: '8px 16px',
    borderRadius: 30,
    background: 'rgba(61,252,173,0.08)',
  },

  // ── Contact Section ─────────────────────────────────────────────────────────
  contactSection: {
    background: 'linear-gradient(180deg, var(--mid-blue) 0%, var(--deep-blue) 100%)',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      height: 1,
      background: 'linear-gradient(90deg, transparent, var(--border-glow), transparent)',
    },
  },

  contactWrap: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 100,
    alignItems: 'start',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gap: 50,
    },
  },

  contactInfo: {
    '& h3': {
      fontFamily: 'Orbitron',
      fontSize: '1.3rem',
      color: '#fff',
      marginBottom: 20,
      letterSpacing: 2,
    },
    '& p': {
      color: 'var(--text-muted)',
      fontSize: '1.05rem',
      lineHeight: 1.8,
      marginBottom: 36,
    },
  },

  contactDetail: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 16,
  },

  cdItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 18,
    padding: '18px 22px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border-glow)',
    borderRadius: 12,
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(0,242,255,0.05)',
      borderColor: 'var(--neon-cyan)',
      transform: 'translateX(8px)',
    },
  },

  cdIcon: {
    width: 44,
    height: 44,
    flexShrink: 0,
    background: 'linear-gradient(135deg, rgba(0,242,255,0.2), rgba(0,242,255,0.05))',
    border: '1px solid var(--border-glow)',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
  },

  cdText: {
    '& span': {
      display: 'block',
    },
  },

  cdLabel: {
    fontSize: '0.65rem',
    letterSpacing: 3,
    color: 'var(--text-muted)',
    textTransform: 'uppercase' as const,
  },

  cdValue: {
    fontSize: '1rem',
    color: '#fff',
    fontWeight: 600,
    marginTop: 4,
  },

  contactForm: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 18,
  },

  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 18,
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },

  inputField: {
    width: '100%',
    padding: '18px 22px',
    background: 'linear-gradient(145deg, rgba(4,30,54,0.8), rgba(2,11,22,0.9))',
    border: '1px solid var(--border-glow)',
    color: '#fff',
    fontFamily: 'Rajdhani, sans-serif',
    fontSize: '1rem',
    fontWeight: 500,
    borderRadius: 12,
    outline: 'none',
    transition: 'all 0.3s ease',
    '&::placeholder': {
      color: 'rgba(255,255,255,0.35)',
    },
    '&:focus': {
      borderColor: 'var(--neon-cyan)',
      background: 'linear-gradient(145deg, rgba(0,242,255,0.1), rgba(2,11,22,0.95))',
      boxShadow: '0 0 0 4px rgba(0,242,255,0.1), 0 0 30px rgba(0,242,255,0.15)',
    },
  },

  textareaField: {
    resize: 'vertical',
    minHeight: 150,
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
    padding: 20,
    background: 'linear-gradient(135deg, var(--neon-cyan), #0099ee)',
    color: 'var(--deep-blue)',
    fontFamily: 'Orbitron',
    fontWeight: 700,
    fontSize: '0.9rem',
    letterSpacing: 4,
    border: 'none',
    cursor: 'pointer',
    borderRadius: 12,
    boxShadow: '0 0 40px rgba(0,242,255,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
    transition: 'all 0.4s ease',
    position: 'relative' as const,
    overflow: 'hidden',
    '&:hover': {
      boxShadow: '0 0 70px rgba(0,242,255,0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
      transform: 'translateY(-3px) scale(1.02)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      transition: 'left 0.5s ease',
    },
    '&:hover::before': {
      left: '100%',
    },
  },

  // ── Footer ─────────────────────────────────────────────────────────────────
  footer: {
    background: 'rgba(1,5,10,0.99)',
    borderTop: '1px solid var(--border-glow)',
    padding: '80px 10% 40px',
    position: 'relative',
    zIndex: 1,
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      top: 0,
      left: '10%',
      right: '10%',
      height: 2,
      background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)',
      boxShadow: '0 0 40px rgba(0,242,255,0.5)',
    },
  },

  footerGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: 60,
    marginBottom: 60,
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr 1fr',
      gap: 40,
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },

  footerBrand: {
    '& p': {
      color: 'var(--text-muted)',
      fontSize: '0.95rem',
      lineHeight: 1.8,
      maxWidth: 320,
    },
  },

  footerBrandLogoContainer: {
    marginBottom: 20,
  },

  footerCol: {
    '& h5': {
      fontFamily: 'Orbitron',
      fontSize: '0.7rem',
      color: 'var(--neon-cyan)',
      letterSpacing: 4,
      marginBottom: 24,
    },
    '& ul': {
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    '& li': {
      marginBottom: 14,
    },
    '& a': {
      color: 'var(--text-muted)',
      textDecoration: 'none',
      fontSize: '0.95rem',
      transition: 'all 0.3s ease',
      '&:hover': {
        color: 'var(--neon-cyan)',
        paddingLeft: 8,
      },
    },
  },

  footerBottom: {
    borderTop: '1px solid rgba(255,255,255,0.05)',
    paddingTop: 30,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: 16,
    '& p': {
      color: 'var(--text-muted)',
      fontSize: '0.85rem',
    },
  },

  statusPill: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    color: 'var(--accent-green)',
    fontFamily: 'Orbitron',
    fontSize: '0.65rem',
    letterSpacing: 3,
    fontWeight: 700,
  },

  pulseDot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: 'var(--accent-green)',
    boxShadow: '0 0 15px var(--accent-green)',
  },

  // ── Reveal Animation Classes ────────────────────────────────────────────────
  reveal: {
    opacity: 0,
    transform: 'translateY(40px)',
    transition:
      'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
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
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.5 },
    },
    '& @keyframes ping': {
      '75%, 100%': {
        transform: 'scale(2)',
        opacity: 0,
      },
    },
    '& @keyframes shimmer': {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(100%)' },
    },
    '& @keyframes float': {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-20px)' },
    },
    '& @keyframes fadeUp': {
      from: { opacity: 0, transform: 'translateY(30px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    '& @keyframes ring-spin': {
      to: { transform: 'rotate(360deg)' },
    },
    '& ::-webkit-scrollbar': {
      width: 8,
    },
    '& ::-webkit-scrollbar-track': {
      background: 'var(--deep-blue)',
    },
    '& ::-webkit-scrollbar-thumb': {
      background: 'linear-gradient(180deg, var(--neon-cyan), #004488)',
      borderRadius: 4,
    },
  },
});
