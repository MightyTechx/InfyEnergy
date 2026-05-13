import { useState, type ReactElement } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Switch,
  Select,
  MenuItem,
  FormControl,
  Button,
  Chip,
  TextField as MuiTextField,
} from '@mui/material';
import { PageHeader, TextField } from '@infygen/component';
import {
  Settings as SettingsIcon,
  Speed as SpeedIcon,
  Opacity as OpacityIcon,
  Thermostat as ThermostatIcon,
  Compress as CompressIcon,
  Bolt as BoltIcon,
  Warning as WarningIcon,
  NotificationsActive as NotificationsIcon,
  Security as SecurityIcon,
  Schedule as ScheduleIcon,
  Storage as StorageIcon,
  CloudDone as CloudDoneIcon,
  AccessTime as AccessTimeIcon,
  DeviceThermostat as DeviceThermostatIcon,
  Air as AirIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircleOutline as CheckIcon,
  InfoOutlined as InfoIcon,
  EditOutlined as EditIcon,
  SaveOutlined as SaveIcon,
  Refresh as RefreshIcon,
  LocalFireDepartment as FireIcon,
  WaterDrop as WaterIcon,
  Speed as RpmIcon,
} from '@mui/icons-material';
import { useStyles } from './styles';

// ─── Tab Interface ─────────────────────────────────────────────────────────────
interface TabConfig {
  label: string;
  icon: ReactElement;
  description: string;
}

// ─── Tab Configurations ─────────────────────────────────────────────────────────
const TABS: TabConfig[] = [
  {
    label: 'SCADA Settings',
    icon: <SpeedIcon fontSize='small' />,
    description: 'Monitor & data acquisition configuration',
  },
  {
    label: 'Thresholds',
    icon: <WarningIcon fontSize='small' />,
    description: 'Alert limits & operational boundaries',
  },
  {
    label: 'Alerts',
    icon: <NotificationsIcon fontSize='small' />,
    description: 'Notification & alert preferences',
  },
  {
    label: 'System',
    icon: <SettingsIcon fontSize='small' />,
    description: 'Platform & operational settings',
  },
];

// ─── SCADA Settings Tab ─────────────────────────────────────────────────────────
const SCADASettingsTab = ({ classes }: { classes: Record<string, string> }) => {
  const [config, setConfig] = useState({
    pollingInterval: '5',
    dataRetention: '90',
    maxDataPoints: '10000',
    enableCompression: true,
    enableCaching: true,
    syncMode: 'realtime',
    reconnectAttempts: '3',
    timeout: '30',
  });

  const scadaStats = [
    { label: 'Active Sensors', value: '48', color: '#10b981' },
    { label: 'Data Points/min', value: '2.4K', color: '#6366f1' },
    { label: 'Uptime', value: '99.8%', color: '#06b6d4' },
    { label: 'Latency', value: '120ms', color: '#f59e0b' },
  ];

  return (
    <Box>
      {/* Stats Bar */}
      <Box className={classes.sectionPanel}>
        <Box className={classes.sectionPanelHeader}>
          <Box className={classes.sectionPanelTitle}>
            <Box
              className={classes.sectionPanelIcon}
              sx={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                boxShadow: '0 4px 14px rgba(79,70,229,0.4)',
              }}
            >
              <SpeedIcon sx={{ fontSize: 18, color: '#fff' }} />
            </Box>
            <Box>
              <Typography className={classes.sectionPanelTitleText}>
                SCADA Monitor Status
              </Typography>
              <Typography className={classes.sectionPanelSubtitle}>
                Real-time data acquisition overview
              </Typography>
            </Box>
          </Box>
          <Box className={classes.statusIndicator}>
            <Box
              className={classes.statusDot}
              sx={{ background: '#10b981', boxShadow: '0 0 8px #10b981' }}
            />
            <Typography className={classes.statusText}>Connected</Typography>
          </Box>
        </Box>
        <Box sx={{ p: 2.5, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {scadaStats.map((stat) => (
            <Box key={stat.label} sx={{ flex: '1 1 120px', minWidth: 100 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: '#f8fafc',
                  border: '1px solid rgba(0,0,0,0.05)',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.68rem',
                    color: 'text.secondary',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {stat.label}
                </Typography>
                <Typography
                  sx={{ fontSize: '1.35rem', fontWeight: 800, color: stat.color, mt: 0.5 }}
                >
                  {stat.value}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Data Collection Settings */}
      <Box className={classes.sectionPanel} sx={{ mt: 3 }}>
        <Box className={classes.sectionPanelHeader}>
          <Box className={classes.sectionPanelTitle}>
            <Box
              className={classes.sectionPanelIcon}
              sx={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)' }}
            >
              <StorageIcon sx={{ fontSize: 18, color: '#3b82f6' }} />
            </Box>
            <Box>
              <Typography className={classes.sectionPanelTitleText}>Data Collection</Typography>
              <Typography className={classes.sectionPanelSubtitle}>
                Configure polling and data retention
              </Typography>
            </Box>
          </Box>
          <Chip
            label='Auto-saved'
            size='small'
            icon={<CloudDoneIcon sx={{ fontSize: '0.85rem !important' }} />}
            sx={{
              background: 'rgba(16,185,129,0.1)',
              color: '#10b981',
              border: '1px solid rgba(16,185,129,0.2)',
              fontSize: '0.7rem',
              fontWeight: 600,
            }}
          />
        </Box>
        <Box className={classes.sectionPanelBody}>
          <Box className={classes.settingsGrid}>
            <FormControl fullWidth size='small'>
              <Box className={classes.formRow}>
                <Box>
                  <Typography className={classes.formLabel}>Polling Interval</Typography>
                  <Typography className={classes.formDesc}>
                    Data collection frequency from turbines
                  </Typography>
                </Box>
                <Select
                  value={config.pollingInterval}
                  onChange={(e) => setConfig({ ...config, pollingInterval: e.target.value })}
                  className={classes.selectField}
                >
                  <MenuItem value='1'>1 second</MenuItem>
                  <MenuItem value='3'>3 seconds</MenuItem>
                  <MenuItem value='5'>5 seconds</MenuItem>
                  <MenuItem value='10'>10 seconds</MenuItem>
                  <MenuItem value='30'>30 seconds</MenuItem>
                </Select>
              </Box>
            </FormControl>

            <FormControl fullWidth size='small'>
              <Box className={classes.formRow}>
                <Box>
                  <Typography className={classes.formLabel}>Sync Mode</Typography>
                  <Typography className={classes.formDesc}>How data is synchronized</Typography>
                </Box>
                <Select
                  value={config.syncMode}
                  onChange={(e) => setConfig({ ...config, syncMode: e.target.value })}
                  className={classes.selectField}
                >
                  <MenuItem value='realtime'>Real-time</MenuItem>
                  <MenuItem value='batch'>Batch Sync</MenuItem>
                  <MenuItem value='ondemand'>On-demand</MenuItem>
                </Select>
              </Box>
            </FormControl>

            <FormControl fullWidth size='small'>
              <Box className={classes.formRow}>
                <Box>
                  <Typography className={classes.formLabel}>Data Retention</Typography>
                  <Typography className={classes.formDesc}>Days to keep historical data</Typography>
                </Box>
                <Select
                  value={config.dataRetention}
                  onChange={(e) => setConfig({ ...config, dataRetention: e.target.value })}
                  className={classes.selectField}
                >
                  <MenuItem value='30'>30 days</MenuItem>
                  <MenuItem value='60'>60 days</MenuItem>
                  <MenuItem value='90'>90 days</MenuItem>
                  <MenuItem value='180'>180 days</MenuItem>
                  <MenuItem value='365'>1 year</MenuItem>
                </Select>
              </Box>
            </FormControl>

            <FormControl fullWidth size='small'>
              <Box className={classes.formRow}>
                <Box>
                  <Typography className={classes.formLabel}>Max Data Points</Typography>
                  <Typography className={classes.formDesc}>Points per chart render</Typography>
                </Box>
                <TextField
                  type='number'
                  size='small'
                  value={config.maxDataPoints}
                  onChange={(e) => setConfig({ ...config, maxDataPoints: e.target.value })}
                  className={classes.inputField}
                  sx={{ width: 140 }}
                />
              </Box>
            </FormControl>
          </Box>

          <Box className={classes.sectionDivider} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                borderRadius: 2.5,
                background: '#fafbfc',
                border: '1px solid rgba(0,0,0,0.04)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    background: 'rgba(79,70,229,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <StorageIcon sx={{ fontSize: 18, color: '#4f46e5' }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    Enable Data Compression
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                    Reduce bandwidth with gzip compression
                  </Typography>
                </Box>
              </Box>
              <Switch
                checked={config.enableCompression}
                onChange={(e) => setConfig({ ...config, enableCompression: e.target.checked })}
                className={classes.toggleActive}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                borderRadius: 2.5,
                background: '#fafbfc',
                border: '1px solid rgba(0,0,0,0.04)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    background: 'rgba(6,182,212,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SpeedIcon sx={{ fontSize: 18, color: '#06b6d4' }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    Enable Response Caching
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                    Cache frequently accessed data
                  </Typography>
                </Box>
              </Box>
              <Switch
                checked={config.enableCaching}
                onChange={(e) => setConfig({ ...config, enableCaching: e.target.checked })}
                className={classes.toggleActive}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Connection Settings */}
      <Box className={classes.sectionPanel} sx={{ mt: 3 }}>
        <Box className={classes.sectionPanelHeader}>
          <Box className={classes.sectionPanelTitle}>
            <Box
              className={classes.sectionPanelIcon}
              sx={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}
            >
              <SecurityIcon sx={{ fontSize: 18, color: '#8b5cf6' }} />
            </Box>
            <Box>
              <Typography className={classes.sectionPanelTitleText}>
                Connection Management
              </Typography>
              <Typography className={classes.sectionPanelSubtitle}>
                Network timeout and retry settings
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className={classes.sectionPanelBody}>
          <Box className={classes.settingsGrid}>
            <FormControl fullWidth size='small'>
              <Box className={classes.formRow}>
                <Box>
                  <Typography className={classes.formLabel}>Connection Timeout</Typography>
                  <Typography className={classes.formDesc}>
                    Seconds before connection fails
                  </Typography>
                </Box>
                <Select
                  value={config.timeout}
                  onChange={(e) => setConfig({ ...config, timeout: e.target.value })}
                  className={classes.selectField}
                >
                  <MenuItem value='15'>15 seconds</MenuItem>
                  <MenuItem value='30'>30 seconds</MenuItem>
                  <MenuItem value='60'>60 seconds</MenuItem>
                  <MenuItem value='120'>2 minutes</MenuItem>
                </Select>
              </Box>
            </FormControl>

            <FormControl fullWidth size='small'>
              <Box className={classes.formRow}>
                <Box>
                  <Typography className={classes.formLabel}>Reconnect Attempts</Typography>
                  <Typography className={classes.formDesc}>
                    Max retries on connection loss
                  </Typography>
                </Box>
                <Select
                  value={config.reconnectAttempts}
                  onChange={(e) => setConfig({ ...config, reconnectAttempts: e.target.value })}
                  className={classes.selectField}
                >
                  <MenuItem value='3'>3 attempts</MenuItem>
                  <MenuItem value='5'>5 attempts</MenuItem>
                  <MenuItem value='10'>10 attempts</MenuItem>
                  <MenuItem value='unlimited'>Unlimited</MenuItem>
                </Select>
              </Box>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// ─── Thresholds Tab ────────────────────────────────────────────────────────────
const ThresholdsTab = ({ classes }: { classes: Record<string, string> }) => {
  const [thresholds, setThresholds] = useState({
    windSpeedMin: '3',
    windSpeedMax: '25',
    powerMin: '100',
    powerMax: '2500',
    rpmMin: '8',
    rpmMax: '16',
    tempMin: '-10',
    tempMax: '65',
    pressureMin: '200',
    pressureMax: '350',
  });

  const thresholdCards = [
    {
      title: 'Wind Speed',
      icon: <AirIcon sx={{ fontSize: 16 }} />,
      unit: 'm/s',
      color: '#06b6d4',
      bgColor: 'rgba(6,182,212,0.1)',
      values: [thresholds.windSpeedMin, thresholds.windSpeedMax],
      keys: ['windSpeedMin', 'windSpeedMax'] as const,
      min: 0,
      max: 50,
    },
    {
      title: 'Active Power',
      icon: <BoltIcon sx={{ fontSize: 16 }} />,
      unit: 'kW',
      color: '#f59e0b',
      bgColor: 'rgba(245,158,11,0.1)',
      values: [thresholds.powerMin, thresholds.powerMax],
      keys: ['powerMin', 'powerMax'] as const,
      min: 0,
      max: 3000,
    },
    {
      title: 'Rotor RPM',
      icon: <RpmIcon sx={{ fontSize: 16 }} />,
      unit: 'rpm',
      color: '#8b5cf6',
      bgColor: 'rgba(139,92,246,0.1)',
      values: [thresholds.rpmMin, thresholds.rpmMax],
      keys: ['rpmMin', 'rpmMax'] as const,
      min: 0,
      max: 20,
    },
    {
      title: 'Temperature',
      icon: <ThermostatIcon sx={{ fontSize: 16 }} />,
      unit: '°C',
      color: '#ef4444',
      bgColor: 'rgba(239,68,68,0.1)',
      values: [thresholds.tempMin, thresholds.tempMax],
      keys: ['tempMin', 'tempMax'] as const,
      min: -30,
      max: 100,
    },
  ];

  return (
    <Box>
      {/* Threshold Overview */}
      <Box className={classes.sectionPanel}>
        <Box className={classes.sectionPanelHeader}>
          <Box className={classes.sectionPanelTitle}>
            <Box
              className={classes.sectionPanelIcon}
              sx={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                boxShadow: '0 4px 14px rgba(245,158,11,0.4)',
              }}
            >
              <WarningIcon sx={{ fontSize: 18, color: '#fff' }} />
            </Box>
            <Box>
              <Typography className={classes.sectionPanelTitleText}>
                Operational Thresholds
              </Typography>
              <Typography className={classes.sectionPanelSubtitle}>
                Define safe operating limits for wind turbines
              </Typography>
            </Box>
          </Box>
          <Chip
            label='7 Active Alerts'
            size='small'
            sx={{
              background: 'rgba(239,68,68,0.1)',
              color: '#ef4444',
              border: '1px solid rgba(239,68,68,0.2)',
              fontSize: '0.7rem',
              fontWeight: 600,
            }}
          />
        </Box>
        <Box className={classes.sectionPanelBody}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 2,
            }}
          >
            {thresholdCards.map((card) => (
              <Box key={card.title} className={classes.thresholdCard}>
                <Box className={classes.thresholdCardHeader}>
                  <Box className={classes.thresholdCardIcon} sx={{ background: card.bgColor }}>
                    {card.icon}
                  </Box>
                  <Typography className={classes.thresholdCardTitle}>{card.title}</Typography>
                </Box>
                <Box className={classes.thresholdRow}>
                  <Box className={classes.thresholdItem}>
                    <Typography className={classes.thresholdLabel}>Min</Typography>
                    <Box className={classes.thresholdValue}>
                      <TextField
                        type='number'
                        size='small'
                        value={card.values[0]}
                        onChange={(e) =>
                          setThresholds({ ...thresholds, [card.keys[0]]: e.target.value })
                        }
                        sx={{
                          width: 70,
                          '& input': {
                            py: 0.5,
                            px: 1,
                            textAlign: 'center',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                          },
                        }}
                      />
                      <Typography className={classes.thresholdUnit}>{card.unit}</Typography>
                    </Box>
                  </Box>
                  <Box className={classes.thresholdItem}>
                    <Typography className={classes.thresholdLabel}>Max</Typography>
                    <Box className={classes.thresholdValue}>
                      <TextField
                        type='number'
                        size='small'
                        value={card.values[1]}
                        onChange={(e) =>
                          setThresholds({ ...thresholds, [card.keys[1]]: e.target.value })
                        }
                        sx={{
                          width: 70,
                          '& input': {
                            py: 0.5,
                            px: 1,
                            textAlign: 'center',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                          },
                        }}
                      />
                      <Typography className={classes.thresholdUnit}>{card.unit}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Advanced Thresholds */}
      <Box className={classes.sectionPanel} sx={{ mt: 3 }}>
        <Box className={classes.sectionPanelHeader}>
          <Box className={classes.sectionPanelTitle}>
            <Box
              className={classes.sectionPanelIcon}
              sx={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              <ThermostatIcon sx={{ fontSize: 18, color: '#10b981' }} />
            </Box>
            <Box>
              <Typography className={classes.sectionPanelTitleText}>
                Equipment Thresholds
              </Typography>
              <Typography className={classes.sectionPanelSubtitle}>
                Component-specific temperature and pressure limits
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className={classes.sectionPanelBody}>
          <Box className={classes.configList}>
            {[
              {
                icon: <FireIcon />,
                title: 'Gearbox Temperature',
                min: '85',
                max: '110',
                unit: '°C',
                color: '#ef4444',
              },
              {
                icon: <FireIcon />,
                title: 'Generator Temperature',
                min: '80',
                max: '120',
                unit: '°C',
                color: '#f59e0b',
              },
              {
                icon: <FireIcon />,
                title: 'Transformer Temperature',
                min: '60',
                max: '90',
                unit: '°C',
                color: '#8b5cf6',
              },
              {
                icon: <WaterIcon />,
                title: 'Hydraulic Pressure',
                min: '200',
                max: '350',
                unit: 'bar',
                color: '#3b82f6',
              },
              {
                icon: <CompressIcon />,
                title: 'Gear Oil Pressure',
                min: '2.5',
                max: '4.5',
                unit: 'bar',
                color: '#06b6d4',
              },
            ].map((item, i) => (
              <Box key={i} className={classes.configItem}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      background: `${item.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    {item.title}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                      Min:
                    </Typography>
                    <MuiTextField
                      type='number'
                      size='small'
                      defaultValue={item.min}
                      sx={{
                        width: 70,
                        '& input': { py: 0.5, px: 1, textAlign: 'center', fontSize: '0.8rem' },
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                      Max:
                    </Typography>
                    <MuiTextField
                      type='number'
                      size='small'
                      defaultValue={item.max}
                      sx={{
                        width: 70,
                        '& input': { py: 0.5, px: 1, textAlign: 'center', fontSize: '0.8rem' },
                      }}
                    />
                  </Box>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', minWidth: 30 }}>
                    {item.unit}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Nacelle & Pitch Settings */}
      <Box className={classes.sectionPanel} sx={{ mt: 3 }}>
        <Box className={classes.sectionPanelHeader}>
          <Box className={classes.sectionPanelTitle}>
            <Box
              className={classes.sectionPanelIcon}
              sx={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}
            >
              <TrendingUpIcon sx={{ fontSize: 18, color: '#6366f1' }} />
            </Box>
            <Box>
              <Typography className={classes.sectionPanelTitleText}>
                Pitch & Nacelle Control
              </Typography>
              <Typography className={classes.sectionPanelSubtitle}>
                Blade pitch and yaw position limits
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className={classes.sectionPanelBody}>
          <Box className={classes.settingsGrid}>
            <FormControl fullWidth size='small'>
              <Box className={classes.formRow}>
                <Box>
                  <Typography className={classes.formLabel}>Nacelle Position Range</Typography>
                  <Typography className={classes.formDesc}>Acceptable yaw angle range</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MuiTextField
                    type='number'
                    size='small'
                    defaultValue='0'
                    sx={{ width: 70, '& input': { textAlign: 'center' } }}
                  />
                  <Typography sx={{ color: 'text.secondary' }}>to</Typography>
                  <MuiTextField
                    type='number'
                    size='small'
                    defaultValue='360'
                    sx={{ width: 70, '& input': { textAlign: 'center' } }}
                  />
                  <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>°</Typography>
                </Box>
              </Box>
            </FormControl>

            <FormControl fullWidth size='small'>
              <Box className={classes.formRow}>
                <Box>
                  <Typography className={classes.formLabel}>Pitch Angle Limits</Typography>
                  <Typography className={classes.formDesc}>
                    Blade pitch operational range
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MuiTextField
                    type='number'
                    size='small'
                    defaultValue='0'
                    sx={{ width: 70, '& input': { textAlign: 'center' } }}
                  />
                  <Typography sx={{ color: 'text.secondary' }}>to</Typography>
                  <MuiTextField
                    type='number'
                    size='small'
                    defaultValue='90'
                    sx={{ width: 70, '& input': { textAlign: 'center' } }}
                  />
                  <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>°</Typography>
                </Box>
              </Box>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// ─── Alerts Tab ─────────────────────────────────────────────────────────────────
const AlertsTab = ({ classes }: { classes: Record<string, string> }) => {
  const [alertConfig, setAlertConfig] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    criticalOnly: false,
    dailySummary: true,
    weeklyReport: true,
  });

  const alertRules = [
    { name: 'High Wind Speed', condition: '> 25 m/s', severity: 'critical', enabled: true },
    { name: 'Low Power Output', condition: '< 100 kW', severity: 'warning', enabled: true },
    { name: 'Temperature Alert', condition: '> 110°C', severity: 'critical', enabled: true },
    { name: 'Communication Loss', condition: '> 5 min', severity: 'critical', enabled: true },
    { name: 'Rotor Overspeed', condition: '> 18 rpm', severity: 'critical', enabled: true },
    { name: 'Maintenance Due', condition: 'Monthly', severity: 'info', enabled: true },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '#ef4444';
      case 'warning':
        return '#f59e0b';
      case 'info':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  return (
    <Box>
      {/* Notification Channels */}
      <Box className={classes.sectionPanel}>
        <Box className={classes.sectionPanelHeader}>
          <Box className={classes.sectionPanelTitle}>
            <Box
              className={classes.sectionPanelIcon}
              sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
              }}
            >
              <NotificationsIcon sx={{ fontSize: 18, color: '#fff' }} />
            </Box>
            <Box>
              <Typography className={classes.sectionPanelTitleText}>
                Notification Channels
              </Typography>
              <Typography className={classes.sectionPanelSubtitle}>
                Configure how you receive alerts
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className={classes.sectionPanelBody}>
          <Box className={classes.configList}>
            <Box className={classes.configItem}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'rgba(239,68,68,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#ef4444'
                    strokeWidth='2'
                  >
                    <rect x='2' y='4' width='20' height='16' rx='2' />
                    <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
                  </svg>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    Email Notifications
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                    Send alerts to admin email addresses
                  </Typography>
                </Box>
              </Box>
              <Switch
                checked={alertConfig.emailAlerts}
                onChange={(e) => setAlertConfig({ ...alertConfig, emailAlerts: e.target.checked })}
                className={classes.toggleActive}
              />
            </Box>

            <Box className={classes.configItem}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'rgba(16,185,129,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#10b981'
                    strokeWidth='2'
                  >
                    <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
                  </svg>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    SMS Notifications
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                    Send SMS to registered phone numbers
                  </Typography>
                </Box>
              </Box>
              <Switch
                checked={alertConfig.smsAlerts}
                onChange={(e) => setAlertConfig({ ...alertConfig, smsAlerts: e.target.checked })}
                className={classes.toggleActive}
              />
            </Box>

            <Box className={classes.configItem}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'rgba(6,182,212,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#06b6d4'
                    strokeWidth='2'
                  >
                    <path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' />
                    <path d='M13.73 21a2 2 0 0 1-3.46 0' />
                  </svg>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    Push Notifications
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                    Browser and mobile app push alerts
                  </Typography>
                </Box>
              </Box>
              <Switch
                checked={alertConfig.pushNotifications}
                onChange={(e) =>
                  setAlertConfig({ ...alertConfig, pushNotifications: e.target.checked })
                }
                className={classes.toggleActive}
              />
            </Box>

            <Box className={classes.configItem}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'rgba(245,158,11,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <WarningIcon sx={{ color: '#f59e0b', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    Critical Alerts Only
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                    Only notify for critical severity events
                  </Typography>
                </Box>
              </Box>
              <Switch
                checked={alertConfig.criticalOnly}
                onChange={(e) => setAlertConfig({ ...alertConfig, criticalOnly: e.target.checked })}
                className={classes.toggleActive}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Alert Rules */}
      <Box className={classes.sectionPanel} sx={{ mt: 3 }}>
        <Box className={classes.sectionPanelHeader}>
          <Box className={classes.sectionPanelTitle}>
            <Box
              className={classes.sectionPanelIcon}
              sx={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              <WarningIcon sx={{ fontSize: 18, color: '#ef4444' }} />
            </Box>
            <Box>
              <Typography className={classes.sectionPanelTitleText}>Active Alert Rules</Typography>
              <Typography className={classes.sectionPanelSubtitle}>
                Define conditions that trigger notifications
              </Typography>
            </Box>
          </Box>
          <Button
            variant='outlined'
            size='small'
            startIcon={<EditIcon sx={{ fontSize: '0.9rem' }} />}
            sx={{ fontSize: '0.75rem', textTransform: 'none', borderRadius: 2 }}
          >
            Manage Rules
          </Button>
        </Box>
        <Box className={classes.sectionPanelBody}>
          <Box className={classes.configList}>
            {alertRules.map((rule, i) => (
              <Box key={i} className={classes.configItem}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip
                    label={rule.severity}
                    size='small'
                    sx={{
                      background: `${getSeverityColor(rule.severity)}15`,
                      color: getSeverityColor(rule.severity),
                      border: `1px solid ${getSeverityColor(rule.severity)}30`,
                      fontWeight: 700,
                      fontSize: '0.65rem',
                      minWidth: 60,
                    }}
                  />
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                      {rule.name}
                    </Typography>
                    <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                      Condition: {rule.condition}
                    </Typography>
                  </Box>
                </Box>
                <Switch checked={rule.enabled} size='small' />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Report Settings */}
      <Box className={classes.sectionPanel} sx={{ mt: 3 }}>
        <Box className={classes.sectionPanelHeader}>
          <Box className={classes.sectionPanelTitle}>
            <Box
              className={classes.sectionPanelIcon}
              sx={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}
            >
              <ScheduleIcon sx={{ fontSize: 18, color: '#6366f1' }} />
            </Box>
            <Box>
              <Typography className={classes.sectionPanelTitleText}>Report Scheduling</Typography>
              <Typography className={classes.sectionPanelSubtitle}>
                Automated performance and summary reports
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className={classes.sectionPanelBody}>
          <Box className={classes.configList}>
            <Box className={classes.configItem}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'rgba(139,92,246,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ScheduleIcon sx={{ color: '#8b5cf6', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    Daily Summary
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                    Receive daily generation and status summary
                  </Typography>
                </Box>
              </Box>
              <Switch
                checked={alertConfig.dailySummary}
                onChange={(e) => setAlertConfig({ ...alertConfig, dailySummary: e.target.checked })}
                className={classes.toggleActive}
              />
            </Box>

            <Box className={classes.configItem}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'rgba(16,185,129,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TrendingUpIcon sx={{ color: '#10b981', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    Weekly Performance Report
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                    In-depth analysis with trends and recommendations
                  </Typography>
                </Box>
              </Box>
              <Switch
                checked={alertConfig.weeklyReport}
                onChange={(e) => setAlertConfig({ ...alertConfig, weeklyReport: e.target.checked })}
                className={classes.toggleActive}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// ─── System Tab ────────────────────────────────────────────────────────────────
const SystemTab = ({ classes }: { classes: Record<string, string> }) => {
  const [systemConfig, setSystemConfig] = useState({
    maintenanceMode: false,
    debugMode: false,
    autoBackup: true,
    autoUpdate: false,
  });

  const systemStats = [
    { label: 'Last Backup', value: '2 hours ago', icon: <CloudDoneIcon sx={{ fontSize: 16 }} /> },
    { label: 'Database', value: '45.2 GB', icon: <StorageIcon sx={{ fontSize: 16 }} /> },
    { label: 'API Calls Today', value: '1.2M', icon: <SpeedIcon sx={{ fontSize: 16 }} /> },
    { label: 'Active Sessions', value: '24', icon: <AccessTimeIcon sx={{ fontSize: 16 }} /> },
  ];

  return (
    <Box>
      {/* System Status */}
      <Box className={classes.sectionPanel}>
        <Box className={classes.sectionPanelHeader}>
          <Box className={classes.sectionPanelTitle}>
            <Box
              className={classes.sectionPanelIcon}
              sx={{
                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                boxShadow: '0 4px 14px rgba(16,185,129,0.4)',
              }}
            >
              <DeviceThermostatIcon sx={{ fontSize: 18, color: '#fff' }} />
            </Box>
            <Box>
              <Typography className={classes.sectionPanelTitleText}>System Health</Typography>
              <Typography className={classes.sectionPanelSubtitle}>
                Platform status and resource usage
              </Typography>
            </Box>
          </Box>
          <Box className={classes.statusIndicator}>
            <Box
              className={classes.statusDot}
              sx={{ background: '#10b981', boxShadow: '0 0 8px #10b981' }}
            />
            <Typography className={classes.statusText}>All Systems Operational</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            p: 2.5,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 2,
          }}
        >
          {systemStats.map((stat) => (
            <Box
              key={stat.label}
              sx={{
                p: 2,
                borderRadius: 2.5,
                background: '#f8fafc',
                border: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Box sx={{ color: '#4f46e5' }}>{stat.icon}</Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: '0.68rem',
                    color: 'text.secondary',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                  }}
                >
                  {stat.label}
                </Typography>
                <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: 'text.primary' }}>
                  {stat.value}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Operational Settings */}
      <Box className={classes.sectionPanel} sx={{ mt: 3 }}>
        <Box className={classes.sectionPanelHeader}>
          <Box className={classes.sectionPanelTitle}>
            <Box
              className={classes.sectionPanelIcon}
              sx={{ background: 'rgba(79,70,229,0.12)', border: '1px solid rgba(79,70,229,0.2)' }}
            >
              <SettingsIcon sx={{ fontSize: 18, color: '#4f46e5' }} />
            </Box>
            <Box>
              <Typography className={classes.sectionPanelTitleText}>
                Operational Controls
              </Typography>
              <Typography className={classes.sectionPanelSubtitle}>
                System-wide operational settings
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className={classes.sectionPanelBody}>
          <Box className={classes.configList}>
            <Box
              className={`${classes.configItem} ${systemConfig.maintenanceMode ? classes.configItemActive : ''}`}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: systemConfig.maintenanceMode
                      ? 'rgba(245,158,11,0.15)'
                      : 'rgba(139,92,246,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <WarningIcon
                    sx={{
                      color: systemConfig.maintenanceMode ? '#f59e0b' : '#8b5cf6',
                      fontSize: 20,
                    }}
                  />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    Maintenance Mode
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                    Temporarily disable user access for maintenance
                  </Typography>
                </Box>
              </Box>
              <Switch
                checked={systemConfig.maintenanceMode}
                onChange={(e) =>
                  setSystemConfig({ ...systemConfig, maintenanceMode: e.target.checked })
                }
                className={classes.toggleActive}
              />
            </Box>

            <Box className={classes.configItem}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'rgba(6,182,212,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CloudDoneIcon sx={{ color: '#06b6d4', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Auto Backup</Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                    Automatically backup data daily
                  </Typography>
                </Box>
              </Box>
              <Switch
                checked={systemConfig.autoBackup}
                onChange={(e) => setSystemConfig({ ...systemConfig, autoBackup: e.target.checked })}
                className={classes.toggleActive}
              />
            </Box>

            <Box className={classes.configItem}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'rgba(99,102,241,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <RefreshIcon sx={{ color: '#6366f1', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Auto Update</Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                    Automatically apply system updates
                  </Typography>
                </Box>
              </Box>
              <Switch
                checked={systemConfig.autoUpdate}
                onChange={(e) => setSystemConfig({ ...systemConfig, autoUpdate: e.target.checked })}
                className={classes.toggleActive}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Data Management */}
      <Box className={classes.sectionPanel} sx={{ mt: 3 }}>
        <Box className={classes.sectionPanelHeader}>
          <Box className={classes.sectionPanelTitle}>
            <Box
              className={classes.sectionPanelIcon}
              sx={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              <StorageIcon sx={{ fontSize: 18, color: '#ef4444' }} />
            </Box>
            <Box>
              <Typography className={classes.sectionPanelTitleText}>Data Management</Typography>
              <Typography className={classes.sectionPanelSubtitle}>
                Archive, export and cleanup operations
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className={classes.sectionPanelBody}>
          <Box className={classes.configList}>
            {[
              {
                title: 'Export All Data',
                desc: 'Download complete dataset as CSV',
                icon: '📥',
                color: '#3b82f6',
              },
              {
                title: 'Archive Old Records',
                desc: 'Move data older than 1 year to cold storage',
                icon: '📦',
                color: '#8b5cf6',
              },
              {
                title: 'Clear Cache',
                desc: 'Remove temporary files and cached data',
                icon: '🗑️',
                color: '#f59e0b',
              },
            ].map((action, i) => (
              <Box key={i} className={classes.configItem}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      background: `${action.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                    }}
                  >
                    {action.icon}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                      {action.title}
                    </Typography>
                    <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                      {action.desc}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant='outlined'
                  size='small'
                  sx={{ fontSize: '0.75rem', textTransform: 'none', borderRadius: 2, minWidth: 80 }}
                >
                  Execute
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Info Box */}
      <Box className={classes.infoBox} sx={{ mt: 3 }}>
        <Box className={classes.infoBoxIcon}>
          <InfoIcon sx={{ fontSize: 18, color: '#3b82f6' }} />
        </Box>
        <Box className={classes.infoBoxContent}>
          <Typography className={classes.infoBoxTitle}>System Configuration Note</Typography>
          <Typography className={classes.infoBoxText}>
            Changes to SCADA settings and thresholds take effect immediately. For structural changes
            like data retention periods, a system restart may be required. Contact your system
            administrator for assistance.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Configuration = () => {
  const { classes } = useStyles();
  const [tabValue, setTabValue] = useState(0);

  const tabStats = [
    { label: 'Connected', value: '10/10', color: '#10b981' },
    { label: 'Active Alerts', value: '7', color: '#ef4444' },
    { label: 'Thresholds', value: '24', color: '#f59e0b' },
  ];

  return (
    <Box className={classes.container}>
      {/* ── Page Header ── */}
      <PageHeader
        title='Wind Turbine Configuration'
        description='Configure SCADA monitoring, operational thresholds, alert preferences and system settings for your wind farm'
        icon={SettingsIcon}
        variant='admin'
      >
        <Box className={classes.pageHeaderStats}>
          {tabStats.map((stat) => (
            <Box key={stat.label} className={classes.pageHeaderStat}>
              <Box
                className={classes.pageHeaderStatDot}
                sx={{ background: stat.color, boxShadow: `0 0 6px ${stat.color}` }}
              />
              <Typography className={classes.pageHeaderStatText}>
                <strong style={{ color: '#fff' }}>{stat.value}</strong> {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </PageHeader>

      {/* ── Tab Bar ── */}
      <Box className={classes.tabBar}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} className={classes.tabs}>
          {TABS.map((tab) => (
            <Tab
              key={tab.label}
              icon={tab.icon}
              iconPosition='start'
              label={tab.label}
              sx={{ minWidth: { md: 'auto' }, px: { md: 2.5 } }}
            />
          ))}
        </Tabs>
      </Box>

      {/* ── Tab Content ── */}
      {tabValue === 0 && <SCADASettingsTab classes={classes} />}
      {tabValue === 1 && <ThresholdsTab classes={classes} />}
      {tabValue === 2 && <AlertsTab classes={classes} />}
      {tabValue === 3 && <SystemTab classes={classes} />}

      {/* ── Save Button (Floating) ── */}
      <Box
        sx={{ position: 'fixed', bottom: 24, right: 24, display: 'flex', gap: 1.5, zIndex: 1000 }}
      >
        <Button
          variant='outlined'
          startIcon={<RefreshIcon />}
          sx={{
            borderRadius: 3,
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          Reset
        </Button>
        <Button
          variant='contained'
          startIcon={<SaveIcon />}
          sx={{
            borderRadius: 3,
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            boxShadow: '0 4px 20px rgba(79,70,229,0.4)',
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default Configuration;
