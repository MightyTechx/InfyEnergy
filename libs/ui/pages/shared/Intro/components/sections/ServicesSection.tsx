import { Box, Container, Typography } from '@mui/material';
import { useStyles } from '../../styles';

const PLATFORM_CARDS = [
  {
    number: '01',
    icon: '📡',
    title: 'End-to-End Monitoring',
    items: [
      'Turbine → Grid visibility',
      'Multi-farm centralized control',
      'Live SCADA dashboards',
      'Real-time power tracking',
    ],
  },
  {
    number: '02',
    icon: '📈',
    title: 'Energy Analytics Engine',
    items: [
      'Daily / Monthly reports',
      'CUF & performance KPIs',
      'Downtime analytics',
      'Revenue estimation',
    ],
  },
  {
    number: '03',
    icon: '🤖',
    title: 'Predictive Maintenance',
    items: [
      'AI failure prediction',
      'Gearbox & blade monitoring',
      'Vibration analysis',
      'Maintenance scheduling',
    ],
  },
  {
    number: '04',
    icon: '🌬️',
    title: 'Wind Intelligence',
    items: [
      'Wind speed & direction',
      'Wake loss analysis',
      'Forecasting models',
      'Power curve optimization',
    ],
  },
  {
    number: '05',
    icon: '🔌',
    title: 'Grid & Compliance',
    items: [
      'Voltage & frequency control',
      'SLDC / RLDC integration',
      'Reactive power management',
      'Grid code compliance',
    ],
  },
  {
    number: '06',
    icon: '⚙️',
    title: 'Automation & Control',
    items: [
      'Remote turbine control',
      'Alarm & fault system',
      'Event logging',
      'Auto shutdown protection',
    ],
  },
];

export default function ServicesSection() {
  const { classes, cx } = useStyles();

  return (
    <Box id='services' className={cx(classes.section, classes.platformSection)}>
      <Box className={cx(classes.sectionHeader, 'reveal')}>
        <Box className={classes.sectionEyebrow}>INTELLIGENCE PLATFORM</Box>
        <Typography className={classes.sectionTitle}>Full Wind Farm Intelligence Suite</Typography>
        <Box className={classes.sectionLine} />
      </Box>
      <Box className={classes.platformGrid}>
        {PLATFORM_CARDS.map((card, idx) => (
          <Box
            key={card.number}
            className={cx(
              classes.platformCard,
              'reveal',
              idx > 0 && `reveal-delay-${Math.min(idx % 3, 3)}`,
            )}
          >
            <Typography className={classes.cardNumber}>{card.number}</Typography>
            <Box className={classes.cardIconWrap}>{card.icon}</Box>
            <Typography className={classes.cardTitle}>{card.title}</Typography>
            <Box component='ul' className={classes.cardList}>
              {card.items.map((item) => (
                <Box component='li' key={item} className={classes.cardListItem}>
                  {item}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
