import { Box, Container, Typography } from '@mui/material';
import { useStyles } from '../../styles';

const CAREER_CARDS = [
  {
    icon: '🖥️',
    title: 'SCADA Engineer',
    text: 'Oversee complex monitoring infrastructure and telemetry integration across the global fleet of wind assets.',
    tag: 'ENGINEERING',
  },
  {
    icon: '📊',
    title: 'Wind Data Analyst',
    text: 'Analyze high-frequency SCADA data to improve energy yields and turbine efficiency through advanced modeling.',
    tag: 'ANALYTICS',
  },
  {
    icon: '⚡',
    title: 'Grid Engineer',
    text: 'Manage high-voltage substation integration and stability requirements for regional and national grids.',
    tag: 'GRID OPERATIONS',
  },
];

export default function CareersSection() {
  const { classes, cx } = useStyles();

  return (
    <Box id='careers' className={cx(classes.section, classes.careersSection)}>
      <Box className={cx(classes.sectionHeader, 'reveal')}>
        <Box className={classes.sectionEyebrow}>DEPLOYMENT OPPORTUNITIES</Box>
        <Typography className={classes.sectionTitle}>Join the Grid</Typography>
        <Box className={classes.sectionLine} />
      </Box>
      <Box className={classes.careersGrid}>
        {CAREER_CARDS.map((card, idx) => (
          <Box
            key={card.title}
            className={cx(classes.careerCard, 'reveal', idx > 0 && `reveal-delay-${idx}`)}
          >
            <Box className={classes.careerIcon}>{card.icon}</Box>
            <Typography className={classes.careerCardTitle}>{card.title}</Typography>
            <Typography className={classes.careerCardText}>{card.text}</Typography>
            <Box className={classes.careerTag}>{card.tag}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
