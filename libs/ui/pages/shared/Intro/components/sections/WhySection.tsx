import { Box, Container, Typography } from '@mui/material';
import { useStyles } from '../../styles';

const whyItems = [
  {
    id: 1,
    icon: '⚡',
    title: 'Real-Time Monitoring',
    description: 'Sub-second data refresh across all wind turbines and electrical infrastructure.',
  },
  {
    id: 2,
    icon: '📊',
    title: 'Advanced Analytics',
    description: 'Multi-timeframe reporting from hourly to yearly with comprehensive KPIs.',
  },
  {
    id: 3,
    icon: '🔒',
    title: 'Enterprise Security',
    description: 'AES-256 encryption and role-based access for complete data protection.',
  },
  {
    id: 4,
    icon: '🚀',
    title: 'Scalable Architecture',
    description: 'From single wind farm to enterprise-wide deployment, built to scale.',
  },
];

export default function WhySection() {
  const { classes, cx } = useStyles();

  return (
    <Box className={cx(classes.section, classes.platformSection)}>
      <Box className={cx(classes.sectionHeader, 'reveal')}>
        <Box className={classes.sectionEyebrow}>WHY INFY ENERGY</Box>
        <Typography className={classes.sectionTitle}>Built for Performance</Typography>
        <Box className={classes.sectionLine} />
      </Box>
      <Box className={classes.careersGrid}>
        {whyItems.map((item, idx) => (
          <Box
            key={item.id}
            className={cx(classes.careerCard, 'reveal', idx > 0 && `reveal-delay-${idx}`)}
          >
            <Box className={classes.careerIcon}>{item.icon}</Box>
            <Typography className={classes.careerCardTitle}>{item.title}</Typography>
            <Typography className={classes.careerCardText}>{item.description}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
