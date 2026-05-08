import { Box, Typography } from '@mui/material';
import { useStyles } from '../../styles';

const FOOTER_LINKS = {
  Platform: ['SCADA Monitoring', 'Energy Analytics', 'Predictive AI', 'Grid Control'],
  'Live Metrics': [
    '1,284 Active Turbines',
    '2.6 GW Total Output',
    '99.98% Uptime',
    '47 Wind Farms',
  ],
  Company: ['About', 'Careers', 'Contact', 'Privacy Policy'],
};

interface FooterProps {
  tenant: string;
}

export default function Footer({ tenant }: FooterProps) {
  const { classes } = useStyles();

  return (
    <Box component='footer' className={classes.footer}>
      <Box className={classes.footerGrid}>
        <Box className={classes.footerBrand}>
          <Box className={classes.footerBrandLogoContainer} onClick={() => {}}>
            <svg viewBox='0 0 100 100' style={{ width: 32, height: 32 }}>
              <path
                d='M47 42 L53 42 L56 92 L44 92 Z'
                stroke='rgba(0,242,255,0.5)'
                strokeWidth={2}
                fill='none'
              />
              <g style={{ transformOrigin: '50px 42px', animation: 'spin 5s linear infinite' }}>
                <circle cx={50} cy={42} r={3} fill='var(--neon-cyan)' />
                <path d='M50 42 L50 3 Q63 3 57 42 Z' fill='var(--neon-cyan)' />
                <path d='M50 42 L87 66 Q92 77 50 50 Z' fill='var(--neon-cyan)' />
                <path d='M50 42 L13 66 Q8 77 50 50 Z' fill='var(--neon-cyan)' />
              </g>
            </svg>
            <Typography component='span'>{tenant.toUpperCase()}</Typography>
          </Box>
          <Typography>
            Complete Wind Farm SCADA & Infrastructure Management. AI-driven analytics, real-time
            grid integration, and predictive maintenance in one unified platform.
          </Typography>
        </Box>
        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <Box key={title} className={classes.footerCol}>
            <Typography component='h5'>{title}</Typography>
            <Box component='ul'>
              {links.map((link) => (
                <li key={link}>
                  <Box component='a' href='#'>
                    {link}
                  </Box>
                </li>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
      <Box className={classes.footerBottom}>
        <Typography>© 2026 {tenant} — All rights reserved</Typography>
        <Box className={classes.statusPill}>
          <Box className={classes.pulseDot} />
          GRID SYNCHRONIZED
        </Box>
      </Box>
    </Box>
  );
}
