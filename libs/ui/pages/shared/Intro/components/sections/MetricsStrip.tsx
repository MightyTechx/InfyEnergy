import { Box, Container, Typography } from '@mui/material';
import { useStyles } from '../../styles';

const METRICS = [
  { value: '14.2 m/s', label: 'Avg Wind Speed', trend: '+1.4 from yesterday' },
  { value: '2.6 GW', label: 'Live Generation', trend: '94% capacity' },
  { value: '4 ms', label: 'SCADA Latency', trend: '● Optimal' },
  { value: '3', label: 'Active Alerts', trend: '▲ Maintenance due', trendColor: '#f5c518' },
  { value: '₹1.82Cr', label: "Today's Revenue", trend: '+8% vs forecast' },
];

export default function MetricsStrip() {
  const { classes, cx } = useStyles();

  return (
    <Box className={classes.metricsStrip}>
      <Box className={classes.metricsInner}>
        {METRICS.map((metric, idx) => (
          <Box
            key={metric.label}
            className={cx(classes.metricBlock, 'reveal', idx > 0 && `reveal-delay-${idx}`)}
          >
            <Typography className={classes.metricVal}>{metric.value}</Typography>
            <Typography className={classes.metricLbl}>{metric.label}</Typography>
            <Typography
              className={classes.metricTrend}
              sx={metric.trendColor ? { color: metric.trendColor } : {}}
            >
              {metric.trend}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
