import { Box, Container, Typography } from '@mui/material';
import { useStyles } from '../../styles';

const PRODUCTS = [
  {
    id: 1,
    badge: 'Operations',
    title: 'ServiceOps',
    description:
      'Intelligent field service management platform that automates scheduling, tracking, and client communication.',
  },
  {
    id: 2,
    badge: 'Energy',
    title: 'Energy Suite',
    description:
      'Complete wind farm management with SCADA integration, real-time monitoring, and predictive maintenance.',
  },
  {
    id: 3,
    badge: 'Analytics',
    title: 'Insight Hub',
    description:
      'AI-powered analytics platform for energy yield optimization and performance benchmarking.',
  },
  {
    id: 4,
    badge: 'Grid',
    title: 'Grid Control',
    description:
      'Advanced grid management system with voltage control and frequency regulation capabilities.',
  },
];

export default function ProductsSection() {
  const { classes, cx } = useStyles();

  return (
    <Box id='products' className={cx(classes.section, classes.careersSection)}>
      <Box className={cx(classes.sectionHeader, 'reveal')}>
        <Box className={classes.sectionEyebrow}>PRODUCT SUITE</Box>
        <Typography className={classes.sectionTitle}>Our Products</Typography>
        <Box className={classes.sectionLine} />
      </Box>
      <Box className={classes.platformGrid}>
        {PRODUCTS.map((product, idx) => (
          <Box
            key={product.id}
            className={cx(
              classes.platformCard,
              'reveal',
              idx > 0 && `reveal-delay-${Math.min(idx % 3, 3)}`,
            )}
          >
            <Box className={classes.cardIconWrap}>
              <Typography style={{ fontSize: '1.5rem' }}>🚀</Typography>
            </Box>
            <Box style={{ marginBottom: 12 }}>
              <Typography
                style={{
                  display: 'inline-block',
                  fontSize: '0.65rem',
                  fontFamily: 'Orbitron',
                  letterSpacing: 2,
                  color: 'var(--accent-green)',
                  border: '1px solid rgba(61,252,173,0.3)',
                  padding: '4px 10px',
                  borderRadius: 20,
                  marginBottom: 12,
                }}
              >
                {product.badge}
              </Typography>
            </Box>
            <Typography className={classes.cardTitle}>{product.title}</Typography>
            <Typography
              style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.6 }}
            >
              {product.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
