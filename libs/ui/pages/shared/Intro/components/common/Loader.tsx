import { Box, Typography } from '@mui/material';
import { useStyles } from '../../styles';

export default function Loader() {
  const { classes, cx } = useStyles();

  return (
    <Box className={cx(classes.loader)}>
      <Box className={classes.loaderRing}>
        <svg
          className={cx(classes.loaderRingSvg, classes.loaderRingSvgAnimate)}
          viewBox='0 0 200 200'
        >
          <circle
            className={cx(classes.loaderRingCircle, classes.loaderRingCircleGlow)}
            cx={100}
            cy={100}
            r={90}
          />
        </svg>
        <Box className={classes.loaderTurbine}>
          <svg
            className={classes.loaderTurbineSvg}
            viewBox='0 0 100 100'
            style={{ width: 120, height: 120 }}
          >
            <path
              d='M47 42 L53 42 L56 92 L44 92 Z'
              stroke='rgba(255,255,255,0.2)'
              strokeWidth={2}
              fill='none'
            />
            <g style={{ transformOrigin: '50px 42px', animation: 'spin 2s linear infinite' }}>
              <circle cx={50} cy={42} r={4} fill='var(--neon-cyan)' />
              <path d='M50 42 L50 3 Q63 3 57 42 Z' fill='var(--neon-cyan)' />
              <path d='M50 42 L87 66 Q92 77 50 50 Z' fill='var(--neon-cyan)' />
              <path d='M50 42 L13 66 Q8 77 50 50 Z' fill='var(--neon-cyan)' />
            </g>
          </svg>
        </Box>
      </Box>
      <Typography className={classes.loaderText}>INITIALIZING SCADA...</Typography>
      <Box className={classes.loaderBarWrap}>
        <Box className={classes.loaderBar} />
      </Box>
    </Box>
  );
}
