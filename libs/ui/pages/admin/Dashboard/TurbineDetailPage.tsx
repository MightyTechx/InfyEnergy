import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { constants } from '@infygen/utils';
import { Typography, Box, IconButton, Chip, Paper, Loader } from '@infygen/component';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTurbineDetailStyles } from './styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import BuildIcon from '@mui/icons-material/Build';
import WarningIcon from '@mui/icons-material/Warning';
import RefreshIcon from '@mui/icons-material/Refresh';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AirIcon from '@mui/icons-material/Air';
import SettingsIcon from '@mui/icons-material/Settings';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import SpeedIcon from '@mui/icons-material/Speed';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SensorsIcon from '@mui/icons-material/Sensors';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import BoltIcon from '@mui/icons-material/Bolt';
import WindPowerIcon from '@mui/icons-material/WindPower';
import TuneIcon from '@mui/icons-material/Tune';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { TurbineData, STATUS_CONFIG, getTurbineById } from './types/turbineData.types';
import { useAdminKeyframes } from '@infygen/hooks';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(v: number, d = 1) {
  return v.toFixed(d);
}

function statusIcon(status: TurbineData['status']) {
  const sz = { fontSize: 16 };
  switch (status) {
    case 'running':
      return <PlayArrowIcon sx={sz} />;
    case 'stopped':
      return <StopIcon sx={sz} />;
    case 'maintenance':
      return <BuildIcon sx={sz} />;
    case 'fault':
      return <WarningIcon sx={sz} />;
    case 'standby':
      return <RefreshIcon sx={sz} />;
  }
}

type Alert = 'normal' | 'warn' | 'alert';

function tempAlert(v: number, warn = 75, alert = 90): Alert {
  if (v >= alert) return 'alert';
  if (v >= warn) return 'warn';
  return 'normal';
}

function pressAlert(v: number, low = 1.5, high = 3.5): Alert {
  if (v < low || v > high) return 'warn';
  return 'normal';
}

function oscAlert(v: number): Alert {
  if (v > 0.5) return 'alert';
  if (v > 0.3) return 'warn';
  return 'normal';
}

const ALERT_COLOR: Record<Alert, string> = {
  normal: '#10b981',
  warn: '#f59e0b',
  alert: '#ef4444',
};

const SECTION_ACCENT: Record<string, string> = {
  performance: '#4f46e5',
  wind: '#0ea5e9',
  electrical: '#8b5cf6',
  rotor: '#06b6d4',
  nacelle: '#f59e0b',
  temperature: '#ef4444',
  pressure: '#10b981',
  hydraulic: '#14b8a6',
  cabinet: '#6366f1',
};

// ─── Components ────────────────────────────────────────────────────────────────

interface ParamCardProps {
  label: string;
  value: string | number;
  unit: string;
  alert?: Alert;
  icon?: React.ReactNode;
  accent?: string;
}

const ParamCard: React.FC<ParamCardProps> = ({
  label,
  value,
  unit,
  alert = 'normal',
  icon,
  accent = '#4f46e5',
}) => (
  <Paper
    elevation={0}
    sx={{
      p: 1.5,
      borderRadius: 2,
      border: '1px solid',
      borderColor: `${alert !== 'normal' ? ALERT_COLOR[alert] : 'divider'}22`,
      background: alert !== 'normal' ? `${ALERT_COLOR[alert]}08` : 'background.paper',
      transition: 'all 0.2s ease',
      '&:hover': {
        borderColor: `${accent}44`,
        boxShadow: `0 4px 12px ${accent}12`,
      },
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.75 }}>
      {icon && (
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: '6px',
            background: `${accent}14`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& svg': { fontSize: 14, color: accent },
          }}
        >
          {icon}
        </Box>
      )}
      <Typography
        sx={{
          fontSize: '0.65rem',
          fontWeight: 600,
          color: 'text.secondary',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          lineHeight: 1.2,
        }}
      >
        {label}
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
      <Typography
        sx={{
          fontSize: '1.25rem',
          fontWeight: 800,
          color: alert !== 'normal' ? ALERT_COLOR[alert] : 'text.primary',
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>
      <Typography sx={{ fontSize: '0.7rem', color: 'text.disabled', fontWeight: 500 }}>
        {unit}
      </Typography>
      {alert !== 'normal' && (
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: ALERT_COLOR[alert],
            ml: 'auto',
            boxShadow: `0 0 6px ${ALERT_COLOR[alert]}`,
          }}
        />
      )}
    </Box>
  </Paper>
);

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  accent: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title, subtitle, accent }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      mb: 2,
      pb: 1.5,
      borderBottom: '2px solid',
      borderColor: `${accent}22`,
    }}
  >
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: '10px',
        background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 4px 14px ${accent}44`,
        '& svg': { fontSize: 20, color: '#fff' },
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography
        sx={{ fontWeight: 800, fontSize: '1rem', color: 'text.primary', letterSpacing: '-0.01em' }}
      >
        {title}
      </Typography>
      <Typography sx={{ fontSize: '0.72rem', color: 'text.disabled' }}>{subtitle}</Typography>
    </Box>
  </Box>
);

const ParamGrid: React.FC<{ children: React.ReactNode; cols?: number }> = ({
  children,
  cols = 3,
}) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: {
        xs: 'repeat(2, 1fr)',
        sm: 'repeat(3, 1fr)',
        md: `repeat(${Math.min(cols, 6)}, 1fr)`,
        lg: `repeat(${Math.min(cols, 6)}, 1fr)`,
      },
      gap: 1.5,
    }}
  >
    {children}
  </Box>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const TurbineDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { AdminPath } = constants;
  const { classes } = useTurbineDetailStyles();
  const keyframes = useAdminKeyframes();

  const [turbine, setTurbine] = useState<TurbineData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = getTurbineById(Number(id));
      setTurbine(found || null);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    if (!turbine) return;
    const interval = setInterval(() => {
      setTurbine((prev) => {
        if (!prev) return prev;
        if (prev.status === 'running') {
          const powerVariation = (Math.random() - 0.5) * 100;
          const windVariation = (Math.random() - 0.5) * 0.5;
          return {
            ...prev,
            time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
            activePower: Math.max(0, prev.activePower + powerVariation),
            windSpeed: Math.max(3, Math.min(25, prev.windSpeed + windVariation)),
            todayGeneration: prev.todayGeneration + prev.activePower / 3600,
          };
        }
        return { ...prev, time: new Date().toLocaleTimeString('en-GB', { hour12: false }) };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [turbine?.id]);

  if (loading) {
    return (
      <>
        {keyframes}
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}
        >
          <Loader />
        </Box>
      </>
    );
  }

  if (!turbine) {
    return (
      <>
        {keyframes}
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant='h6' color='error'>
            Turbine not found
          </Typography>
          <IconButton onClick={() => navigate(AdminPath.DASHBOARD)} sx={{ mt: 2 }}>
            <ArrowBackIcon /> Back to Dashboard
          </IconButton>
        </Box>
      </>
    );
  }

  const cfg = STATUS_CONFIG[turbine.status];
  const isActive = turbine.status === 'running' || turbine.status === 'standby';

  return (
    <>
      {keyframes}
      <Box className={classes.container}>
        {/* ── Page Header ── */}
        <Box className={classes.pageHeader}>
          <Box className={classes.headerOrb} />

          {isActive && (
            <Box className={classes.liveDataBadge}>
              <Box className={classes.liveDataDot} />
              <Typography className={classes.liveDataText}>LIVE DATA</Typography>
            </Box>
          )}

          <Box className={classes.pageHeaderContent}>
            <Box className={classes.turbineIdBox}>
              <Typography className={classes.turbineIdLabel}>WTG</Typography>
              <Typography className={classes.turbineIdNumber}>{turbine.turbineNo}</Typography>
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography className={classes.headerTitle}>SCADA Live Parameters</Typography>
              <Box className={classes.headerMetaRow}>
                <Chip
                  size='small'
                  icon={statusIcon(turbine.status) as React.ReactElement}
                  label={cfg.label}
                  sx={{
                    background: `${cfg.color}22`,
                    border: `1px solid ${cfg.color}55`,
                    color: cfg.color,
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    '& .MuiChip-icon': { color: cfg.color },
                  }}
                />
                <Chip
                  size='small'
                  label={turbine.operatingMode}
                  sx={{
                    background: 'rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                  }}
                />
                <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)' }}>
                  Last Update: {turbine.time}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ── Key Performance Indicators ── */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader
            icon={<BoltIcon />}
            title='Key Performance Indicators'
            subtitle='Real-time operational metrics'
            accent={SECTION_ACCENT.performance}
          />
          <ParamGrid cols={6}>
            <ParamCard
              label='Active Power'
              value={fmt(turbine.activePower, 0)}
              unit='kW'
              icon={<FlashOnIcon sx={{ fontSize: 14, color: '#4f46e5' }} />}
              accent='#4f46e5'
            />
            <ParamCard
              label='Wind Speed'
              value={fmt(turbine.windSpeed)}
              unit='m/s'
              icon={<AirIcon sx={{ fontSize: 14, color: '#0ea5e9' }} />}
              accent='#0ea5e9'
            />
            <ParamCard
              label='Brake Programme'
              value={turbine.breakProgramme}
              unit=''
              icon={
                <StopIcon
                  sx={{
                    fontSize: 14,
                    color: turbine.breakProgramme === 'Released' ? '#10b981' : '#f59e0b',
                  }}
                />
              }
              accent={turbine.breakProgramme === 'Released' ? '#10b981' : '#f59e0b'}
              alert={turbine.breakProgramme === 'Emergency' ? 'warn' : 'normal'}
            />
            <ParamCard
              label='Operation Mode'
              value={turbine.operatingMode}
              unit=''
              icon={<SettingsIcon sx={{ fontSize: 14, color: '#8b5cf6' }} />}
              accent='#8b5cf6'
            />
            <ParamCard
              label='Today Production'
              value={fmt(turbine.todayGeneration, 0)}
              unit='kWh'
              icon={<BoltIcon sx={{ fontSize: 14, color: '#f59e0b' }} />}
              accent='#f59e0b'
            />
            <ParamCard
              label='Total Production'
              value={fmt(turbine.totalProduction, 0)}
              unit='MWh'
              icon={<BoltIcon sx={{ fontSize: 14, color: '#10b981' }} />}
              accent='#10b981'
            />
            <ParamCard
              label='Total Op. Hours'
              value={fmt(turbine.totalOperatingHours, 0)}
              unit='h'
              icon={<SpeedIcon sx={{ fontSize: 14, color: '#6366f1' }} />}
              accent='#6366f1'
            />
            <ParamCard
              label='Production Hours'
              value={fmt(turbine.totalProductionHours, 0)}
              unit='h'
              icon={<SpeedIcon sx={{ fontSize: 14, color: '#14b8a6' }} />}
              accent='#14b8a6'
            />
            <ParamCard
              label='Op. Hours Today'
              value={fmt(turbine.operationHoursToday)}
              unit='h'
              icon={<SpeedIcon sx={{ fontSize: 14, color: '#ec4899' }} />}
              accent='#ec4899'
            />
          </ParamGrid>
        </Box>

        {/* ── Wind & Environmental ── */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader
            icon={<WindPowerIcon />}
            title='Wind & Environmental Conditions'
            subtitle='Wind resource and meteorological parameters'
            accent={SECTION_ACCENT.wind}
          />
          <ParamGrid cols={4}>
            <ParamCard
              label='Wind Speed'
              value={fmt(turbine.windSpeed)}
              unit='m/s'
              icon={<AirIcon sx={{ fontSize: 14, color: '#0ea5e9' }} />}
              accent='#0ea5e9'
            />
            <ParamCard
              label='Wind Direction'
              value={fmt(turbine.windDirection, 0)}
              unit='°'
              icon={<WindPowerIcon sx={{ fontSize: 14, color: '#0ea5e9' }} />}
              accent='#0ea5e9'
            />
            <ParamCard
              label='Relative Wind Dir.'
              value={fmt(turbine.relativeWindDirection, 0)}
              unit='°'
              icon={<WindPowerIcon sx={{ fontSize: 14, color: '#0ea5e9' }} />}
              accent='#0ea5e9'
              alert={Math.abs(turbine.relativeWindDirection) > 15 ? 'warn' : 'normal'}
            />
            <ParamCard
              label='Outdoor Temp.'
              value={fmt(turbine.outdoorTemp, 0)}
              unit='°C'
              icon={<ThermostatIcon sx={{ fontSize: 14, color: '#0ea5e9' }} />}
              accent='#0ea5e9'
              alert={tempAlert(turbine.outdoorTemp, 40, 50)}
            />
          </ParamGrid>
        </Box>

        {/* ── Electrical Parameters MFR300 ── */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader
            icon={<ElectricMeterIcon />}
            title='Electrical Parameters — MFR300'
            subtitle='Grid connection and power quality metrics'
            accent={SECTION_ACCENT.electrical}
          />
          <ParamGrid cols={5}>
            <ParamCard
              label='Current L1'
              value={fmt(turbine.currentL1, 0)}
              unit='A'
              icon={<ElectricMeterIcon sx={{ fontSize: 14, color: '#8b5cf6' }} />}
              accent='#8b5cf6'
            />
            <ParamCard
              label='Current L2'
              value={fmt(turbine.currentL2, 0)}
              unit='A'
              icon={<ElectricMeterIcon sx={{ fontSize: 14, color: '#8b5cf6' }} />}
              accent='#8b5cf6'
            />
            <ParamCard
              label='Current L3'
              value={fmt(turbine.currentL3, 0)}
              unit='A'
              icon={<ElectricMeterIcon sx={{ fontSize: 14, color: '#8b5cf6' }} />}
              accent='#8b5cf6'
            />
            <ParamCard
              label='Power Frequency'
              value={isActive ? fmt(turbine.powerFrequency, 2) : '—'}
              unit='Hz'
              icon={<SensorsIcon sx={{ fontSize: 14, color: '#8b5cf6' }} />}
              accent='#8b5cf6'
              alert={
                isActive && (turbine.powerFrequency < 49.5 || turbine.powerFrequency > 50.5)
                  ? 'warn'
                  : 'normal'
              }
            />
            <ParamCard
              label='Voltage L1'
              value={fmt(turbine.voltageL1, 0)}
              unit='V'
              icon={<ElectricMeterIcon sx={{ fontSize: 14, color: '#8b5cf6' }} />}
              accent='#8b5cf6'
            />
            <ParamCard
              label='Voltage L2'
              value={fmt(turbine.voltageL2, 0)}
              unit='V'
              icon={<ElectricMeterIcon sx={{ fontSize: 14, color: '#8b5cf6' }} />}
              accent='#8b5cf6'
            />
            <ParamCard
              label='Voltage L3'
              value={fmt(turbine.voltageL3, 0)}
              unit='V'
              icon={<ElectricMeterIcon sx={{ fontSize: 14, color: '#8b5cf6' }} />}
              accent='#8b5cf6'
            />
            <ParamCard
              label='Apparent Power'
              value={fmt(turbine.apparentPower, 0)}
              unit='kVA'
              icon={<ElectricMeterIcon sx={{ fontSize: 14, color: '#8b5cf6' }} />}
              accent='#8b5cf6'
            />
            <ParamCard
              label='Reactive Power'
              value={fmt(turbine.reactivePower, 0)}
              unit='kVAR'
              icon={<ElectricMeterIcon sx={{ fontSize: 14, color: '#8b5cf6' }} />}
              accent='#8b5cf6'
            />
            <ParamCard
              label='Power Factor'
              value={isActive ? fmt(turbine.powerFactor, 3) : '—'}
              unit=''
              icon={<SensorsIcon sx={{ fontSize: 14, color: '#8b5cf6' }} />}
              accent='#8b5cf6'
              alert={isActive && turbine.powerFactor < 0.9 ? 'warn' : 'normal'}
            />
          </ParamGrid>
        </Box>

        {/* ── Rotor & Drive Train ── */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader
            icon={<TuneIcon />}
            title='Rotor & Drive Train'
            subtitle='Mechanical rotation and transmission parameters'
            accent={SECTION_ACCENT.rotor}
          />
          <ParamGrid cols={4}>
            <ParamCard
              label='Rotor Speed'
              value={fmt(turbine.rotorRpm, 1)}
              unit='rpm'
              icon={<SpeedIcon sx={{ fontSize: 14, color: '#06b6d4' }} />}
              accent='#06b6d4'
            />
            <ParamCard
              label='Gear Speed'
              value={fmt(turbine.gearSpeed, 0)}
              unit='rpm'
              icon={<TuneIcon sx={{ fontSize: 14, color: '#06b6d4' }} />}
              accent='#06b6d4'
            />
            <ParamCard
              label='Generator Speed'
              value={fmt(turbine.generatorRpm, 0)}
              unit='rpm'
              icon={<SpeedIcon sx={{ fontSize: 14, color: '#06b6d4' }} />}
              accent='#06b6d4'
            />
            <ParamCard
              label='Nacelle Position'
              value={fmt(turbine.nacellePosition, 1)}
              unit='°'
              icon={<AcUnitIcon sx={{ fontSize: 14, color: '#06b6d4' }} />}
              accent='#06b6d4'
            />
          </ParamGrid>
        </Box>

        {/* ── Pitch & Yaw Control ── */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader
            icon={<SettingsIcon />}
            title='Pitch & Yaw Control'
            subtitle='Blade pitch and nacelle orientation systems'
            accent={SECTION_ACCENT.nacelle}
          />
          <ParamGrid cols={4}>
            <ParamCard
              label='Blade Angle (Pitch)'
              value={fmt(turbine.pitchAngle, 1)}
              unit='°'
              icon={<SettingsIcon sx={{ fontSize: 14, color: '#f59e0b' }} />}
              accent='#f59e0b'
            />
            <ParamCard
              label='Pitch Cylinder 1'
              value={fmt(turbine.pitchCylinder1, 0)}
              unit='mm'
              icon={<TuneIcon sx={{ fontSize: 14, color: '#f59e0b' }} />}
              accent='#f59e0b'
            />
            <ParamCard
              label='Pitch Cylinder 2'
              value={fmt(turbine.pitchCylinder2, 0)}
              unit='mm'
              icon={<TuneIcon sx={{ fontSize: 14, color: '#f59e0b' }} />}
              accent='#f59e0b'
            />
            <ParamCard
              label='Pitch Cylinder 3'
              value={fmt(turbine.pitchCylinder3, 0)}
              unit='mm'
              icon={<TuneIcon sx={{ fontSize: 14, color: '#f59e0b' }} />}
              accent='#f59e0b'
            />
            <ParamCard
              label='Cable Winding'
              value={fmt(turbine.cableWinding, 0)}
              unit='°'
              icon={<AcUnitIcon sx={{ fontSize: 14, color: '#f59e0b' }} />}
              accent='#f59e0b'
              alert={Math.abs(turbine.cableWinding) > 300 ? 'warn' : 'normal'}
            />
            <ParamCard
              label='Nacelle Orientation'
              value={fmt(turbine.nacellePosition, 1)}
              unit='°'
              icon={<AcUnitIcon sx={{ fontSize: 14, color: '#f59e0b' }} />}
              accent='#f59e0b'
            />
          </ParamGrid>
        </Box>

        {/* ── Structural Monitoring ── */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader
            icon={<ArchitectureIcon />}
            title='Structural Monitoring'
            subtitle='Tower oscillation and vibration analysis'
            accent='#f59e0b'
          />
          <ParamGrid cols={2}>
            <ParamCard
              label='Tower Oscillation X'
              value={fmt(turbine.towerOscillationX, 3)}
              unit='mm/s'
              icon={<ArchitectureIcon sx={{ fontSize: 14, color: '#f59e0b' }} />}
              accent='#f59e0b'
              alert={oscAlert(turbine.towerOscillationX)}
            />
            <ParamCard
              label='Tower Oscillation Y'
              value={fmt(turbine.towerOscillationY, 3)}
              unit='mm/s'
              icon={<ArchitectureIcon sx={{ fontSize: 14, color: '#f59e0b' }} />}
              accent='#f59e0b'
              alert={oscAlert(turbine.towerOscillationY)}
            />
          </ParamGrid>
        </Box>

        {/* ── Temperature Monitoring ── */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader
            icon={<ThermostatIcon />}
            title='Temperature Monitoring'
            subtitle='Thermal status of major components'
            accent={SECTION_ACCENT.temperature}
          />
          <ParamGrid cols={4}>
            <ParamCard
              label='Nacelle Temp.'
              value={fmt(turbine.nacelleTemp, 0)}
              unit='°C'
              icon={<ThermostatIcon sx={{ fontSize: 14, color: '#ef4444' }} />}
              accent='#ef4444'
              alert={tempAlert(turbine.nacelleTemp, 50, 65)}
            />
            <ParamCard
              label='Outdoor Temp.'
              value={fmt(turbine.outdoorTemp, 0)}
              unit='°C'
              icon={<ThermostatIcon sx={{ fontSize: 14, color: '#ef4444' }} />}
              accent='#ef4444'
            />
            <ParamCard
              label='Gear Oil Sump Temp.'
              value={fmt(turbine.gearOilSumpTemp, 0)}
              unit='°C'
              icon={<ThermostatIcon sx={{ fontSize: 14, color: '#ef4444' }} />}
              accent='#ef4444'
              alert={tempAlert(turbine.gearOilSumpTemp, 70, 85)}
            />
            <ParamCard
              label='Gearbox Temp.'
              value={fmt(turbine.gearboxTemp, 0)}
              unit='°C'
              icon={<ThermostatIcon sx={{ fontSize: 14, color: '#ef4444' }} />}
              accent='#ef4444'
              alert={tempAlert(turbine.gearboxTemp, 70, 85)}
            />
            <ParamCard
              label='Generator Temp.'
              value={fmt(turbine.generatorTemp, 0)}
              unit='°C'
              icon={<ThermostatIcon sx={{ fontSize: 14, color: '#ef4444' }} />}
              accent='#ef4444'
              alert={tempAlert(turbine.generatorTemp, 90, 110)}
            />
            <ParamCard
              label='Transformer Temp.'
              value={fmt(turbine.transformerTemp, 0)}
              unit='°C'
              icon={<ThermostatIcon sx={{ fontSize: 14, color: '#ef4444' }} />}
              accent='#ef4444'
              alert={tempAlert(turbine.transformerTemp, 50, 65)}
            />
            <ParamCard
              label='Hub Exhaust Temp.'
              value={fmt(turbine.hubExhaustTemp, 0)}
              unit='°C'
              icon={<ThermostatIcon sx={{ fontSize: 14, color: '#ef4444' }} />}
              accent='#ef4444'
            />
            <ParamCard
              label='CNV Heat Ex. In'
              value={fmt(turbine.coolCnvHeatExIn, 0)}
              unit='°C'
              icon={<ThermostatIcon sx={{ fontSize: 14, color: '#ef4444' }} />}
              accent='#ef4444'
              alert={tempAlert(turbine.coolCnvHeatExIn, 65, 80)}
            />
            <ParamCard
              label='CNV Heat Ex. Out'
              value={fmt(turbine.coolCnvHeatExOut, 0)}
              unit='°C'
              icon={<ThermostatIcon sx={{ fontSize: 14, color: '#ef4444' }} />}
              accent='#ef4444'
              alert={tempAlert(turbine.coolCnvHeatExOut, 50, 65)}
            />
            <ParamCard
              label='TRF Heat Ex. In'
              value={fmt(turbine.coolTrfHeatExIn, 0)}
              unit='°C'
              icon={<ThermostatIcon sx={{ fontSize: 14, color: '#ef4444' }} />}
              accent='#ef4444'
              alert={tempAlert(turbine.coolTrfHeatExIn, 60, 75)}
            />
            <ParamCard
              label='Generator Winding U'
              value={fmt(turbine.generatorWindingTempU, 0)}
              unit='°C'
              icon={<ThermostatIcon sx={{ fontSize: 14, color: '#ef4444' }} />}
              accent='#ef4444'
              alert={tempAlert(turbine.generatorWindingTempU, 90, 110)}
            />
            <ParamCard
              label='Generator Winding V'
              value={fmt(turbine.generatorWindingTempV, 0)}
              unit='°C'
              icon={<ThermostatIcon sx={{ fontSize: 14, color: '#ef4444' }} />}
              accent='#ef4444'
              alert={tempAlert(turbine.generatorWindingTempV, 90, 110)}
            />
            <ParamCard
              label='Generator Winding W'
              value={fmt(turbine.generatorWindingTempW, 0)}
              unit='°C'
              icon={<ThermostatIcon sx={{ fontSize: 14, color: '#ef4444' }} />}
              accent='#ef4444'
              alert={tempAlert(turbine.generatorWindingTempW, 90, 110)}
            />
            <ParamCard
              label='TRF Winding U'
              value={fmt(turbine.trfWindingTempU, 0)}
              unit='°C'
              icon={<ThermostatIcon sx={{ fontSize: 14, color: '#ef4444' }} />}
              accent='#ef4444'
              alert={tempAlert(turbine.trfWindingTempU)}
            />
            <ParamCard
              label='TRF Winding V'
              value={fmt(turbine.trfWindingTempV, 0)}
              unit='°C'
              icon={<ThermostatIcon sx={{ fontSize: 14, color: '#ef4444' }} />}
              accent='#ef4444'
              alert={tempAlert(turbine.trfWindingTempV)}
            />
            <ParamCard
              label='TRF Winding W'
              value={fmt(turbine.trfWindingTempW, 0)}
              unit='°C'
              icon={<ThermostatIcon sx={{ fontSize: 14, color: '#ef4444' }} />}
              accent='#ef4444'
              alert={tempAlert(turbine.trfWindingTempW)}
            />
          </ParamGrid>
        </Box>

        {/* ── Hydraulic System ── */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader
            icon={<WaterDropIcon />}
            title='Hydraulic System'
            subtitle='Pressure and fluid management parameters'
            accent={SECTION_ACCENT.hydraulic}
          />
          <ParamGrid cols={4}>
            <ParamCard
              label='Hydraulic Pressure'
              value={fmt(turbine.hydraulicPressure, 0)}
              unit='bar'
              icon={<WaterDropIcon sx={{ fontSize: 14, color: '#14b8a6' }} />}
              accent='#14b8a6'
              alert={pressAlert(turbine.hydraulicPressure, 160, 200)}
            />
            <ParamCard
              label='Gear Oil Pressure'
              value={fmt(turbine.gearOilPressure, 1)}
              unit='bar'
              icon={<WaterDropIcon sx={{ fontSize: 14, color: '#14b8a6' }} />}
              accent='#14b8a6'
              alert={pressAlert(turbine.gearOilPressure, 2.5, 3.8)}
            />
            <ParamCard
              label='Coolant Inlet Pressure'
              value={fmt(turbine.coolantInletPressure, 1)}
              unit='bar'
              icon={<WaterDropIcon sx={{ fontSize: 14, color: '#14b8a6' }} />}
              accent='#14b8a6'
              alert={pressAlert(turbine.coolantInletPressure, 1.2, 2.2)}
            />
            <ParamCard
              label='Coolant Outlet Pressure'
              value={fmt(turbine.coolantOutletPressure, 1)}
              unit='bar'
              icon={<WaterDropIcon sx={{ fontSize: 14, color: '#14b8a6' }} />}
              accent='#14b8a6'
              alert={pressAlert(turbine.coolantOutletPressure, 0.8, 1.8)}
            />
          </ParamGrid>
        </Box>

        {/* ── Control Cabinet Temperatures ── */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader
            icon={<SensorsIcon />}
            title='Control Cabinet Temperatures'
            subtitle='Switchgear and electronics thermal monitoring'
            accent={SECTION_ACCENT.cabinet}
          />
          <ParamGrid cols={3}>
            <ParamCard
              label='Tower Cabinet Temp.'
              value={fmt(turbine.tempSwCabTower, 0)}
              unit='°C'
              icon={<SensorsIcon sx={{ fontSize: 14, color: '#6366f1' }} />}
              accent='#6366f1'
              alert={tempAlert(turbine.tempSwCabTower, 45, 55)}
            />
            <ParamCard
              label='Nacelle Cabinet Temp.'
              value={fmt(turbine.tempSwCabNacelle, 0)}
              unit='°C'
              icon={<SensorsIcon sx={{ fontSize: 14, color: '#6366f1' }} />}
              accent='#6366f1'
              alert={tempAlert(turbine.tempSwCabNacelle, 45, 55)}
            />
            <ParamCard
              label='Hub Cabinet Temp.'
              value={fmt(turbine.tempSwCabHub, 0)}
              unit='°C'
              icon={<SensorsIcon sx={{ fontSize: 14, color: '#6366f1' }} />}
              accent='#6366f1'
              alert={tempAlert(turbine.tempSwCabHub, 45, 55)}
            />
          </ParamGrid>
        </Box>

        {/* ── Legend ── */}
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            justifyContent: 'center',
            pt: 2,
            pb: 4,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          {(['normal', 'warn', 'alert'] as Alert[]).map((a) => (
            <Box key={a} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: ALERT_COLOR[a],
                  boxShadow: a !== 'normal' ? `0 0 8px ${ALERT_COLOR[a]}` : 'none',
                }}
              />
              <Typography
                sx={{ fontSize: '0.72rem', color: 'text.secondary', textTransform: 'capitalize' }}
              >
                {a === 'warn' ? 'Warning' : a.charAt(0).toUpperCase() + a.slice(1)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default TurbineDetailPage;
