import React from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Chip,
  IconButton,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableRow,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AirIcon from '@mui/icons-material/Air';
import SettingsIcon from '@mui/icons-material/Settings';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import SpeedIcon from '@mui/icons-material/Speed';
import WaterIcon from '@mui/icons-material/Water';
import SensorsIcon from '@mui/icons-material/Sensors';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import BoltIcon from '@mui/icons-material/Bolt';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import BuildIcon from '@mui/icons-material/Build';
import WarningIcon from '@mui/icons-material/Warning';
import RefreshIcon from '@mui/icons-material/Refresh';
import { TurbineData, STATUS_CONFIG } from './types/turbineData.types';

const SlideUp = React.forwardRef(
  (props: TransitionProps & { children: React.ReactElement }, ref: React.Ref<unknown>) => (
    <Slide direction='up' ref={ref} {...props} />
  ),
);

interface Props {
  open: boolean;
  turbine: TurbineData | null;
  onClose: () => void;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function fmt(v: number, d = 1) {
  return v.toFixed(d);
}

function statusIcon(status: TurbineData['status']) {
  const sz = { fontSize: 14 };
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

// ─── Sub-components ──────────────────────────────────────────────────────────

const KpiCard = ({
  label,
  value,
  unit,
  icon,
  color,
}: {
  label: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  color: string;
}) => (
  <Box
    sx={{
      flex: '1 1 140px',
      minWidth: 0,
      background: '#fff',
      borderRadius: 3,
      border: `1px solid ${color}22`,
      borderTop: `3px solid ${color}`,
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: 0.5,
      boxShadow: `0 2px 12px ${color}10`,
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.25 }}>
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: '8px',
          background: `${color}14`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {React.cloneElement(icon as React.ReactElement<{ sx?: object }>, {
          sx: { fontSize: 16, color },
        })}
      </Box>
      <Typography
        sx={{
          fontSize: '0.68rem',
          fontWeight: 600,
          color: '#94a3b8',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {label}
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
      <Typography
        sx={{
          fontSize: '1.55rem',
          fontWeight: 800,
          color: '#1e293b',
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>
      <Typography sx={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500 }}>
        {unit}
      </Typography>
    </Box>
  </Box>
);

interface ParamRow {
  label: string;
  value: string;
  unit: string;
  alert: Alert;
}

const SectionTable = ({ rows, accent }: { rows: ParamRow[]; accent: string }) => (
  <Table
    size='small'
    sx={{ '& .MuiTableCell-root': { borderColor: `${accent}14`, py: 0.9, px: 1.5 } }}
  >
    <TableBody>
      {rows.map((row, i) => (
        <TableRow
          key={i}
          sx={{
            background: i % 2 === 0 ? '#fafbff' : '#fff',
            '&:hover': { background: `${accent}08` },
            transition: 'background 0.15s ease',
          }}
        >
          <TableCell sx={{ width: '46%' }}>
            <Typography sx={{ fontSize: '0.78rem', color: '#475569', fontWeight: 500 }}>
              {row.label}
            </Typography>
          </TableCell>
          <TableCell align='right' sx={{ width: '30%' }}>
            <Typography
              sx={{
                fontSize: '0.85rem',
                fontWeight: 700,
                fontVariantNumeric: 'tabular-nums',
                color: row.alert === 'normal' ? '#1e293b' : ALERT_COLOR[row.alert],
              }}
            >
              {row.value}
            </Typography>
          </TableCell>
          <TableCell sx={{ width: '12%' }}>
            <Typography sx={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 400 }}>
              {row.unit}
            </Typography>
          </TableCell>
          <TableCell align='center' sx={{ width: '12%' }}>
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                mx: 'auto',
                background: ALERT_COLOR[row.alert],
                boxShadow: row.alert !== 'normal' ? `0 0 6px ${ALERT_COLOR[row.alert]}` : 'none',
              }}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const Section = ({
  title,
  icon,
  accent,
  rows,
}: {
  title: string;
  icon: React.ReactNode;
  accent: string;
  rows: ParamRow[];
}) => (
  <Box
    sx={{
      borderRadius: 3,
      overflow: 'hidden',
      border: '1px solid rgba(0,0,0,0.06)',
      boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
    }}
  >
    {/* Section Header */}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.25,
        px: 2,
        py: 1.25,
        background: `linear-gradient(135deg, ${accent}18 0%, ${accent}08 100%)`,
        borderBottom: `1px solid ${accent}22`,
      }}
    >
      <Box
        sx={{
          width: 30,
          height: 30,
          borderRadius: '8px',
          background: `linear-gradient(135deg, ${accent}cc, ${accent})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 3px 10px ${accent}44`,
        }}
      >
        {React.cloneElement(icon as React.ReactElement<{ sx?: object }>, {
          sx: { fontSize: 16, color: '#fff' },
        })}
      </Box>
      <Typography
        sx={{ fontWeight: 700, fontSize: '0.88rem', color: '#1e293b', letterSpacing: '-0.01em' }}
      >
        {title}
      </Typography>
    </Box>

    {/* Two-column parameter layout */}
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
        background: '#fff',
      }}
    >
      {[rows.slice(0, Math.ceil(rows.length / 2)), rows.slice(Math.ceil(rows.length / 2))].map(
        (half, hi) => (
          <Box key={hi} sx={{ borderRight: hi === 0 ? { sm: `1px solid ${accent}14` } : 'none' }}>
            <SectionTable rows={half} accent={accent} />
          </Box>
        ),
      )}
    </Box>
  </Box>
);

// ─── Main Dialog ─────────────────────────────────────────────────────────────

const TurbineDetailDialog: React.FC<Props> = ({ open, turbine, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (!turbine) return null;

  const cfg = STATUS_CONFIG[turbine.status];
  const isActive = turbine.status === 'running' || turbine.status === 'standby';

  // ── KPI cards ────────────────────────────────────────────────────────────
  const kpis = [
    {
      label: 'Active Power',
      value: fmt(turbine.activePower, 0),
      unit: 'kW',
      icon: <FlashOnIcon />,
      color: '#4f46e5',
    },
    {
      label: 'Wind Speed',
      value: fmt(turbine.windSpeed),
      unit: 'm/s',
      icon: <AirIcon />,
      color: '#0ea5e9',
    },
    {
      label: 'Brake Programme',
      value: turbine.breakProgramme,
      unit: '',
      icon: <StopIcon />,
      color:
        turbine.breakProgramme === 'Released'
          ? '#10b981'
          : turbine.breakProgramme === 'Emergency'
            ? '#ef4444'
            : '#f59e0b',
    },
    {
      label: 'Operation Mode',
      value: turbine.operatingMode,
      unit: '',
      icon: <SettingsIcon />,
      color: '#8b5cf6',
    },
    {
      label: 'Today Generation',
      value: fmt(turbine.todayGeneration, 0),
      unit: 'kWh',
      icon: <BoltIcon />,
      color: '#f59e0b',
    },
    {
      label: 'Op. Hours Today',
      value: fmt(turbine.operationHoursToday),
      unit: 'h',
      icon: <SpeedIcon />,
      color: '#10b981',
    },
  ];

  // ── Section data ─────────────────────────────────────────────────────────

  const performanceRows: ParamRow[] = [
    {
      label: 'Daily Production Today',
      value: fmt(turbine.todayGeneration, 0),
      unit: 'kWh',
      alert: 'normal',
    },
    {
      label: 'Total Production',
      value: fmt(turbine.totalProduction, 0),
      unit: 'MWh',
      alert: 'normal',
    },
    {
      label: 'Total Operating Hours',
      value: fmt(turbine.totalOperatingHours, 0),
      unit: 'h',
      alert: 'normal',
    },
    {
      label: 'Total Production Hours',
      value: fmt(turbine.totalProductionHours, 0),
      unit: 'h',
      alert: 'normal',
    },
    {
      label: 'Operation Hours Today',
      value: fmt(turbine.operationHoursToday),
      unit: 'h',
      alert: 'normal',
    },
  ];

  const electricalRows: ParamRow[] = [
    { label: 'Current L1 — MFR300', value: fmt(turbine.currentL1, 0), unit: 'A', alert: 'normal' },
    { label: 'Current L2 — MFR300', value: fmt(turbine.currentL2, 0), unit: 'A', alert: 'normal' },
    { label: 'Current L3 — MFR300', value: fmt(turbine.currentL3, 0), unit: 'A', alert: 'normal' },
    {
      label: 'Power Frequency',
      value: isActive ? fmt(turbine.powerFrequency, 2) : '—',
      unit: 'Hz',
      alert:
        isActive && (turbine.powerFrequency < 49.5 || turbine.powerFrequency > 50.5)
          ? 'warn'
          : 'normal',
    },
    { label: 'Voltage L1 — MFR300', value: fmt(turbine.voltageL1, 0), unit: 'V', alert: 'normal' },
    { label: 'Voltage L2 — MFR300', value: fmt(turbine.voltageL2, 0), unit: 'V', alert: 'normal' },
    { label: 'Voltage L3 — MFR300', value: fmt(turbine.voltageL3, 0), unit: 'V', alert: 'normal' },
    {
      label: 'Apparent Power — MFR300',
      value: fmt(turbine.apparentPower, 0),
      unit: 'kVA',
      alert: 'normal',
    },
    {
      label: 'Reactive Power — MFR300',
      value: fmt(turbine.reactivePower, 0),
      unit: 'kVAR',
      alert: 'normal',
    },
    {
      label: 'Power Factor — MFR300',
      value: isActive ? fmt(turbine.powerFactor, 3) : '—',
      unit: '',
      alert: isActive && turbine.powerFactor < 0.9 ? 'warn' : 'normal',
    },
  ];

  const driveTrainRows: ParamRow[] = [
    { label: 'Rotor Speed', value: fmt(turbine.rotorRpm, 1), unit: 'rpm', alert: 'normal' },
    { label: 'Gear Speed', value: fmt(turbine.gearSpeed, 0), unit: 'rpm', alert: 'normal' },
    { label: 'Generator Speed', value: fmt(turbine.generatorRpm, 0), unit: 'rpm', alert: 'normal' },
    {
      label: 'Nacelle Position',
      value: fmt(turbine.nacellePosition, 1),
      unit: '°',
      alert: 'normal',
    },
    {
      label: 'Cable Winding',
      value: fmt(turbine.cableWinding, 0),
      unit: '°',
      alert: Math.abs(turbine.cableWinding) > 300 ? 'warn' : 'normal',
    },
    { label: 'Wind Direction', value: fmt(turbine.windDirection, 0), unit: '°', alert: 'normal' },
    {
      label: 'Relative Wind Direction',
      value: fmt(turbine.relativeWindDirection, 0),
      unit: '°',
      alert: Math.abs(turbine.relativeWindDirection) > 15 ? 'warn' : 'normal',
    },
    { label: 'Blade Angle (Pitch)', value: fmt(turbine.pitchAngle, 1), unit: '°', alert: 'normal' },
    {
      label: 'Pitch Cylinder Position 1',
      value: fmt(turbine.pitchCylinder1, 0),
      unit: 'mm',
      alert: 'normal',
    },
    {
      label: 'Pitch Cylinder Position 2',
      value: fmt(turbine.pitchCylinder2, 0),
      unit: 'mm',
      alert: 'normal',
    },
    {
      label: 'Pitch Cylinder Position 3',
      value: fmt(turbine.pitchCylinder3, 0),
      unit: 'mm',
      alert: 'normal',
    },
  ];

  const structuralRows: ParamRow[] = [
    {
      label: 'Tower Oscillation — X Direction',
      value: fmt(turbine.towerOscillationX, 3),
      unit: 'mm/s',
      alert: oscAlert(turbine.towerOscillationX),
    },
    {
      label: 'Tower Oscillation — Y Direction',
      value: fmt(turbine.towerOscillationY, 3),
      unit: 'mm/s',
      alert: oscAlert(turbine.towerOscillationY),
    },
  ];

  const temperatureRows: ParamRow[] = [
    {
      label: 'Outdoor Temperature',
      value: fmt(turbine.outdoorTemp, 0),
      unit: '°C',
      alert: tempAlert(turbine.outdoorTemp, 40, 50),
    },
    {
      label: 'TRF Winding Temp — U',
      value: fmt(turbine.trfWindingTempU, 0),
      unit: '°C',
      alert: tempAlert(turbine.trfWindingTempU),
    },
    {
      label: 'TRF Winding Temp — V',
      value: fmt(turbine.trfWindingTempV, 0),
      unit: '°C',
      alert: tempAlert(turbine.trfWindingTempV),
    },
    {
      label: 'TRF Winding Temp — W',
      value: fmt(turbine.trfWindingTempW, 0),
      unit: '°C',
      alert: tempAlert(turbine.trfWindingTempW),
    },
    {
      label: 'Nacelle Temperature',
      value: fmt(turbine.nacelleTemp, 0),
      unit: '°C',
      alert: tempAlert(turbine.nacelleTemp, 50, 65),
    },
    {
      label: 'Cool CNV Heat Ex. Inlet Temp',
      value: fmt(turbine.coolCnvHeatExIn, 0),
      unit: '°C',
      alert: tempAlert(turbine.coolCnvHeatExIn, 65, 80),
    },
    {
      label: 'Cool CNV Heat Ex. Outlet Temp',
      value: fmt(turbine.coolCnvHeatExOut, 0),
      unit: '°C',
      alert: tempAlert(turbine.coolCnvHeatExOut, 50, 65),
    },
    {
      label: 'Cool TRF Heat Ex. Inlet Temp',
      value: fmt(turbine.coolTrfHeatExIn, 0),
      unit: '°C',
      alert: tempAlert(turbine.coolTrfHeatExIn, 60, 75),
    },
    {
      label: 'Gear Oil Sump Temp',
      value: fmt(turbine.gearOilSumpTemp, 0),
      unit: '°C',
      alert: tempAlert(turbine.gearOilSumpTemp, 70, 85),
    },
    {
      label: 'Generator Winding Temp — U',
      value: fmt(turbine.generatorWindingTempU, 0),
      unit: '°C',
      alert: tempAlert(turbine.generatorWindingTempU, 90, 110),
    },
    {
      label: 'Generator Winding Temp — V',
      value: fmt(turbine.generatorWindingTempV, 0),
      unit: '°C',
      alert: tempAlert(turbine.generatorWindingTempV, 90, 110),
    },
    {
      label: 'Generator Winding Temp — W',
      value: fmt(turbine.generatorWindingTempW, 0),
      unit: '°C',
      alert: tempAlert(turbine.generatorWindingTempW, 90, 110),
    },
  ];

  const pressureRows: ParamRow[] = [
    {
      label: 'Hydraulic System Pressure',
      value: fmt(turbine.hydraulicPressure, 0),
      unit: 'bar',
      alert: pressAlert(turbine.hydraulicPressure, 160, 200),
    },
    {
      label: 'Gear Oil Pressure',
      value: fmt(turbine.gearOilPressure, 1),
      unit: 'bar',
      alert: pressAlert(turbine.gearOilPressure, 2.5, 3.8),
    },
    {
      label: 'Coolant Inlet Pressure',
      value: fmt(turbine.coolantInletPressure, 1),
      unit: 'bar',
      alert: pressAlert(turbine.coolantInletPressure, 1.2, 2.2),
    },
    {
      label: 'Coolant Outlet Pressure',
      value: fmt(turbine.coolantOutletPressure, 1),
      unit: 'bar',
      alert: pressAlert(turbine.coolantOutletPressure, 0.8, 1.8),
    },
  ];

  const cabinetRows: ParamRow[] = [
    {
      label: 'Temp. Switch Cabinet — Tower',
      value: fmt(turbine.tempSwCabTower, 0),
      unit: '°C',
      alert: tempAlert(turbine.tempSwCabTower, 45, 55),
    },
    {
      label: 'Temp. Switch Cabinet — Nacelle',
      value: fmt(turbine.tempSwCabNacelle, 0),
      unit: '°C',
      alert: tempAlert(turbine.tempSwCabNacelle, 45, 55),
    },
    {
      label: 'Temp. Switch Cabinet — Hub',
      value: fmt(turbine.tempSwCabHub, 0),
      unit: '°C',
      alert: tempAlert(turbine.tempSwCabHub, 45, 55),
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={SlideUp}
      fullWidth
      maxWidth='lg'
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : 3,
          overflow: 'hidden',
          maxHeight: '92vh',
          background: '#f0f4ff',
        },
      }}
    >
      {/* ── Hero Header ─────────────────────────────────────────────────── */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 35%, #4f46e5 70%, #0ea5e9 100%)',
          px: { xs: 2, sm: 3 },
          py: { xs: 1.75, sm: 2.25 },
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -80,
            right: -80,
            width: 260,
            height: 260,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167,139,250,0.3) 0%, transparent 70%)',
            pointerEvents: 'none',
          },
        }}
      >
        {/* Turbine ID badge */}
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: '14px',
            flexShrink: 0,
            background: 'rgba(255,255,255,0.15)',
            border: '1.5px solid rgba(255,255,255,0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography
            sx={{
              fontSize: '0.55rem',
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              lineHeight: 1,
            }}
          >
            WTG
          </Typography>
          <Typography sx={{ fontSize: '1rem', color: '#fff', fontWeight: 800, lineHeight: 1.2 }}>
            {turbine.turbineNo.replace('T-', '')}
          </Typography>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.4 }}>
            <Typography
              sx={{
                fontSize: { xs: '1rem', sm: '1.2rem' },
                fontWeight: 800,
                color: '#fff',
                letterSpacing: '-0.02em',
              }}
            >
              {turbine.turbineNo} — Live SCADA Parameters
            </Typography>
            {/* Live pulse */}
            {isActive && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  background: 'rgba(16,185,129,0.2)',
                  border: '1px solid rgba(16,185,129,0.5)',
                  borderRadius: 10,
                  px: 1,
                  py: 0.25,
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#4ade80',
                    boxShadow: '0 0 8px #4ade80',
                    animation: 'pulse 1.4s ease-in-out infinite',
                    '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } },
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    color: '#4ade80',
                    letterSpacing: '0.1em',
                  }}
                >
                  LIVE
                </Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              size='small'
              icon={statusIcon(turbine.status) as React.ReactElement}
              label={cfg.label}
              sx={{
                background: `${cfg.color}22`,
                border: `1px solid ${cfg.color}55`,
                color: cfg.color,
                fontWeight: 700,
                fontSize: '0.68rem',
                height: 22,
                '& .MuiChip-icon': { color: cfg.color },
              }}
            />
            <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)' }}>
              {turbine.operatingMode} · Last update: {turbine.time}
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={onClose}
          sx={{
            color: 'rgba(255,255,255,0.7)',
            flexShrink: 0,
            '&:hover': { color: '#fff', background: 'rgba(255,255,255,0.12)' },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* ── Scrollable content ───────────────────────────────────────────── */}
      <DialogContent
        sx={{
          p: { xs: 1.5, sm: 2.5 },
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* KPI Row */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {kpis.map((k) => (
            <KpiCard key={k.label} {...k} />
          ))}
        </Box>

        {/* ── Performance & Production */}
        <Section
          title='Performance & Production'
          icon={<BoltIcon />}
          accent='#4f46e5'
          rows={performanceRows}
        />

        {/* ── Electrical Parameters — MFR300 */}
        <Section
          title='Electrical Parameters — MFR300'
          icon={<ElectricMeterIcon />}
          accent='#0ea5e9'
          rows={electricalRows}
        />

        {/* ── Drive Train & Rotor Control */}
        <Section
          title='Drive Train & Rotor Control'
          icon={<SettingsIcon />}
          accent='#8b5cf6'
          rows={driveTrainRows}
        />

        {/* ── Structural Monitoring */}
        <Section
          title='Structural Monitoring'
          icon={<ArchitectureIcon />}
          accent='#f59e0b'
          rows={structuralRows}
        />

        {/* ── Temperature Monitoring */}
        <Section
          title='Temperature Monitoring'
          icon={<ThermostatIcon />}
          accent='#ef4444'
          rows={temperatureRows}
        />

        {/* ── Pressure & Hydraulics */}
        <Section
          title='Pressure & Hydraulics'
          icon={<WaterIcon />}
          accent='#10b981'
          rows={pressureRows}
        />

        {/* ── Control Cabinet Temperatures */}
        <Section
          title='Control Cabinet Temperatures'
          icon={<SensorsIcon />}
          accent='#0d9488'
          rows={cabinetRows}
        />

        {/* Legend */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', pt: 0.5 }}>
          {(['normal', 'warn', 'alert'] as Alert[]).map((a) => (
            <Box key={a} sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: ALERT_COLOR[a],
                  boxShadow: a !== 'normal' ? `0 0 5px ${ALERT_COLOR[a]}` : 'none',
                }}
              />
              <Typography
                sx={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'capitalize' }}
              >
                {a === 'warn' ? 'Warning' : a.charAt(0).toUpperCase() + a.slice(1)}
              </Typography>
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TurbineDetailDialog;
