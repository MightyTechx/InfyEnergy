import { Box, Typography } from '@mui/material';

const TurbineSVG = ({ size = 40 }: { size?: number }) => (
  <svg viewBox='0 0 100 100' style={{ width: size, height: size }}>
    <path
      d='M47 42 L53 42 L56 92 L44 92 Z'
      stroke='rgba(255,255,255,0.3)'
      strokeWidth={2}
      fill='none'
    />
    <g style={{ transformOrigin: '50px 42px', animation: 'spin 5s linear infinite' }}>
      <circle cx={50} cy={42} r={4} fill='var(--neon-cyan)' />
      <path d='M50 42 L50 4 Q61 4 56 42 Z' fill='var(--neon-cyan)' />
      <path d='M50 42 L84 64 Q89 74 50 48 Z' fill='var(--neon-cyan)' />
      <path d='M50 42 L16 64 Q11 74 50 48 Z' fill='var(--neon-cyan)' />
    </g>
  </svg>
);

interface LogoMarkProps {
  compact?: boolean;
}

const LogoMark = ({ compact = false }: LogoMarkProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <TurbineSVG size={compact ? 32 : 40} />
      <Typography
        variant='h6'
        sx={{
          fontFamily: 'Orbitron, sans-serif',
          fontWeight: 700,
          fontSize: compact ? '0.9rem' : '1.1rem',
          color: '#fff',
          letterSpacing: 2,
          textShadow: '0 0 10px rgba(0,242,255,0.5)',
        }}
      >
        {!compact && 'INFYGEN'}
      </Typography>
    </Box>
  );
};

export default LogoMark;
