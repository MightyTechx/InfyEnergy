import { Box, Container, Typography } from '@mui/material';
import { useStyles } from '../../styles';

const FEATURES = [
  {
    icon: '⚡',
    title: 'Real-Time SCADA',
    desc: 'Live monitoring of all wind and electrical infrastructure with sub-second data refresh.',
  },
  {
    icon: '📊',
    title: 'Generation Analytics',
    desc: 'Multi-timeframe reporting from hourly to yearly with CUF, KPIs and revenue estimation.',
  },
  {
    icon: '🔧',
    title: 'Breakdown Management',
    desc: 'Structured fault logging with solutions, downtime tracking, and attendee records.',
  },
  {
    icon: '🛡️',
    title: 'Safety & Compliance',
    desc: 'Permit-to-work, incident reporting, audits, and regulatory compliance management.',
  },
  {
    icon: '🗓️',
    title: 'Scheduled Maintenance',
    desc: 'Quarterly, half-yearly, and yearly servicing cycles managed end-to-end in the system.',
  },
];

export default function AboutSection() {
  const { classes, cx } = useStyles();

  return (
    <Box id='about' className={cx(classes.section, classes.aboutSection)}>
      <Box className={cx(classes.sectionHeader, 'reveal')}>
        <Box className={classes.sectionEyebrow}>ABOUT THE APPLICATION</Box>
        <Typography className={classes.sectionTitle}>
          Complete Wind Energy Management Ecosystem
        </Typography>
        <Box className={classes.sectionLine} />
      </Box>
      <Box className={classes.aboutGrid}>
        <Box className={cx(classes.aboutText, 'reveal reveal-delay-1')}>
          <Typography className={classes.aboutTextFirst}>
            A complete Wind Turbine and Substation Monitoring & Management System built to support
            efficient operation of wind energy assets — from real-time SCADA monitoring to full
            lifecycle reporting.
          </Typography>
          <Typography>
            The system tracks key operational parameters such as wind speed, rotor performance,
            temperature, vibration, and voltage levels across all turbines (690V/33kV), and
            substations (33kV/132kV and 33kV/230kV) in real time.
          </Typography>
          <Typography>
            Generation analytics cover hourly through yearly timeframes, while the breakdown
            management system creates a knowledge base to reduce downtime and resolve recurring
            failures faster.
          </Typography>
          <Typography>
            Comprehensive safety management features include hazard identification, incident
            reporting, PTW systems, safety training tracking, and compliance audits — ensuring all
            activities meet industry standards.
          </Typography>
        </Box>
        <Box className={cx(classes.aboutFeatures, 'reveal reveal-delay-2')}>
          {FEATURES.map((f) => (
            <Box key={f.title} className={classes.featRow}>
              <Box className={classes.featIcon}>{f.icon}</Box>
              <Box className={classes.featInfo}>
                <Typography component='h4'>{f.title}</Typography>
                <Typography component='p'>{f.desc}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
