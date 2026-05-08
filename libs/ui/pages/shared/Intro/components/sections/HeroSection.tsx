import { Box, Typography } from '@mui/material';
import { useStyles } from '../../styles';

const HERO_STATS = [
  { count: 1284, label: 'Active Turbines' },
  { count: 2600, label: 'Total Output', suffix: ' MW' },
  { count: 99, label: 'System Uptime', suffix: '.98%' },
  { count: 47, label: 'Wind Farms' },
  { count: 360, label: 'Coverage', suffix: '°' },
];

interface HeroSectionProps {
  onNavigate: (href: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const { classes, cx } = useStyles();

  return (
    <Box id='home' className={classes.hero}>
      <Box className={classes.heroGlowOrb} />
      <Box className={classes.heroGlowOrb2} />
      <Box className={classes.heroTurbineDisplay}>
        <svg viewBox='0 0 100 100' style={{ width: '100%', height: '100%' }}>
          <path
            d='M47 42 L53 42 L56 92 L44 92 Z'
            stroke='rgba(0,242,255,0.3)'
            strokeWidth={2}
            fill='none'
          />
          <g style={{ transformOrigin: '50px 42px', animation: 'spin 8s linear infinite' }}>
            <circle cx={50} cy={42} r={4} fill='var(--neon-cyan)' />
            <path d='M50 42 L50 3 Q63 3 57 42 Z' fill='var(--neon-cyan)' />
            <path d='M50 42 L87 66 Q92 77 50 50 Z' fill='var(--neon-cyan)' />
            <path d='M50 42 L13 66 Q8 77 50 50 Z' fill='var(--neon-cyan)' />
          </g>
        </svg>
      </Box>
      <Box className={classes.heroInner}>
        <Box className={classes.heroBadge}>
          <Box className={classes.heroBadgeDot} />
          SCADA SYSTEM ONLINE — 2026
        </Box>
        <Typography className={classes.heroTitle}>
          WIND SERVICE
          <br />
          MATRIX
        </Typography>
        <Typography className={classes.heroSub}>WIND FARM · SCADA · GRID CONTROL</Typography>
        <Typography className={classes.heroDesc}>
          A next-generation centralized platform for real-time wind turbine monitoring, substation
          control, predictive maintenance, and full grid lifecycle management.
        </Typography>
      </Box>
      <Box className={classes.heroStats}>
        {HERO_STATS.map((stat) => (
          <Box key={stat.label} className={classes.statItem}>
            <Typography
              className={classes.statNum}
              data-count={stat.count}
              data-suffix={stat.suffix}
            >
              0
            </Typography>
            <Typography className={classes.statLabel}>{stat.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
