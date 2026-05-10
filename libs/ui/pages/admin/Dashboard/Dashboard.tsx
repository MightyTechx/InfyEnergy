import { useState, useEffect } from 'react';
import { Avatar, Box, Typography, Chip, Paper } from '@mui/material';
import TurbineDetailDialog from './TurbineDetailDialog';
import { DataTable, Column } from '@infyenergy/component';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import BuildIcon from '@mui/icons-material/Build';
import WarningIcon from '@mui/icons-material/Warning';
import RefreshIcon from '@mui/icons-material/Refresh';
import SpeedIcon from '@mui/icons-material/Speed';
import AirIcon from '@mui/icons-material/Air';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAdminKeyframes, useAuth, useLiveDateTime } from '../../../hooks';
import { useStyles } from './styles';
import { TurbineData, MOCK_TURBINE_DATA, STATUS_CONFIG } from './types/turbineData.types';

const Dashboard = () => {
  const { classes } = useStyles();
  const keyframes = useAdminKeyframes();
  const { user } = useAuth();
  const userName =
    user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Admin';
  const userInitials = userName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  const { hours, minutes, seconds, dateStr, tzAbbr, tzRegion, utcOffset } = useLiveDateTime();

  const [turbineData, setTurbineData] = useState<TurbineData[]>(MOCK_TURBINE_DATA);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedTurbine, setSelectedTurbine] = useState<TurbineData | null>(null);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTurbineData((prev) =>
        prev.map((turbine) => {
          if (turbine.status === 'running') {
            const powerVariation = (Math.random() - 0.5) * 100;
            const windVariation = (Math.random() - 0.5) * 0.5;
            return {
              ...turbine,
              time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
              activePower: Math.max(0, turbine.activePower + powerVariation),
              windSpeed: Math.max(3, Math.min(25, turbine.windSpeed + windVariation)),
              todayGeneration: turbine.todayGeneration + turbine.activePower / 3600,
            };
          }
          if (turbine.status === 'standby') {
            return {
              ...turbine,
              time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
            };
          }
          return {
            ...turbine,
            time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
          };
        }),
      );
      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Summary stats
  const runningCount = turbineData.filter((t) => t.status === 'running').length;
  const totalPower = turbineData
    .filter((t) => t.status === 'running')
    .reduce((sum, t) => sum + t.activePower, 0);
  const avgWindSpeed = (
    turbineData.filter((t) => t.status === 'running').reduce((sum, t) => sum + t.windSpeed, 0) /
    (runningCount || 1)
  ).toFixed(1);
  const totalGeneration = turbineData.reduce((sum, t) => sum + t.todayGeneration, 0);
  const faultCount = turbineData.filter((t) => t.status === 'fault').length;

  const formatValue = (value: number, decimals = 1) => {
    return value.toFixed(decimals);
  };

  // Define columns with format functions
  const columns: Column<TurbineData>[] = [
    {
      id: 'turbineNo',
      label: 'Turbine No',
      minWidth: 70,
      align: 'center',
      format: (v, row) => (
        <Typography
          onClick={(e) => {
            e.stopPropagation();
            setSelectedTurbine(row as TurbineData);
          }}
          sx={{
            fontWeight: 700,
            color: '#4f46e5',
            fontSize: '0.75rem',
            cursor: 'pointer',
            textDecoration: 'underline',
            textDecorationStyle: 'dotted',
            '&:hover': { color: '#7c3aed' },
          }}
        >
          {String(v)}
        </Typography>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 90,
      align: 'center',
      format: (v) => {
        const status = v as TurbineData['status'];
        const cfg = STATUS_CONFIG[status];
        return (
          <Chip
            size='small'
            icon={getStatusIcon(status)}
            label={cfg.label}
            sx={{
              background: cfg.bgColor,
              border: `1px solid ${cfg.borderColor}`,
              color: cfg.color,
              fontWeight: 600,
              fontSize: '0.65rem',
              height: 22,
              '& .MuiChip-icon': { color: cfg.color },
            }}
          />
        );
      },
    },
    { id: 'time', label: 'Time', minWidth: 70, align: 'center' },
    {
      id: 'activePower',
      label: 'AP (kW)',
      minWidth: 85,
      align: 'center',
      format: (v) => (
        <Typography
          sx={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', fontSize: '0.75rem' }}
        >
          {formatValue(v as number)}
        </Typography>
      ),
    },
    {
      id: 'windSpeed',
      label: 'WS (m/s)',
      minWidth: 85,
      align: 'center',
      format: (v) => (
        <Typography sx={{ fontVariantNumeric: 'tabular-nums', fontSize: '0.75rem' }}>
          {formatValue(v as number)}
        </Typography>
      ),
    },
    {
      id: 'windDirection',
      label: 'Wdir (°)',
      minWidth: 80,
      align: 'center',
      format: (v) => (
        <Typography sx={{ fontVariantNumeric: 'tabular-nums', fontSize: '0.75rem' }}>
          {(v as number).toFixed(0)}°
        </Typography>
      ),
    },
    {
      id: 'nacellePosition',
      label: 'Nac (°)',
      minWidth: 75,
      align: 'center',
      format: (v) => (
        <Typography sx={{ fontVariantNumeric: 'tabular-nums', fontSize: '0.75rem' }}>
          {(v as number).toFixed(1)}°
        </Typography>
      ),
    },
    {
      id: 'pitchAngle',
      label: 'Pitch (°)',
      minWidth: 75,
      align: 'center',
      format: (v) => (
        <Typography sx={{ fontVariantNumeric: 'tabular-nums', fontSize: '0.75rem' }}>
          {(v as number).toFixed(1)}°
        </Typography>
      ),
    },
    {
      id: 'rotorRpm',
      label: 'RRPM',
      minWidth: 65,
      align: 'center',
      format: (v) => (
        <Typography sx={{ fontVariantNumeric: 'tabular-nums', fontSize: '0.75rem' }}>
          {(v as number).toFixed(1)}
        </Typography>
      ),
    },
    {
      id: 'generatorRpm',
      label: 'GRPM',
      minWidth: 65,
      align: 'center',
      format: (v) => (
        <Typography sx={{ fontVariantNumeric: 'tabular-nums', fontSize: '0.75rem' }}>
          {(v as number).toFixed(0)}
        </Typography>
      ),
    },
    {
      id: 'hydraulicPressure',
      label: 'HydPre (bar)',
      minWidth: 90,
      align: 'center',
      format: (v) => (
        <Typography sx={{ fontVariantNumeric: 'tabular-nums', fontSize: '0.75rem' }}>
          {(v as number).toFixed(0)}
        </Typography>
      ),
    },
    {
      id: 'todayGeneration',
      label: 'TodayGen (kWh)',
      minWidth: 100,
      align: 'center',
      format: (v) => (
        <Typography
          sx={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', fontSize: '0.75rem' }}
        >
          {(v as number).toFixed(0)}
        </Typography>
      ),
    },
    {
      id: 'outdoorTemp',
      label: 'OutDoor (°C)',
      minWidth: 90,
      align: 'center',
      format: (v) => (
        <Typography sx={{ fontVariantNumeric: 'tabular-nums', fontSize: '0.75rem' }}>
          {(v as number).toFixed(0)}°C
        </Typography>
      ),
    },
    {
      id: 'gearboxTemp',
      label: 'Gearbox (°C)',
      minWidth: 90,
      align: 'center',
      format: (v) => (
        <Typography sx={{ fontVariantNumeric: 'tabular-nums', fontSize: '0.75rem' }}>
          {(v as number).toFixed(0)}°C
        </Typography>
      ),
    },
    {
      id: 'generatorTemp',
      label: 'Generator (°C)',
      minWidth: 95,
      align: 'center',
      format: (v) => (
        <Typography sx={{ fontVariantNumeric: 'tabular-nums', fontSize: '0.75rem' }}>
          {(v as number).toFixed(0)}°C
        </Typography>
      ),
    },
    {
      id: 'transformerTemp',
      label: 'Trafo (°C)',
      minWidth: 85,
      align: 'center',
      format: (v) => (
        <Typography sx={{ fontVariantNumeric: 'tabular-nums', fontSize: '0.75rem' }}>
          {(v as number).toFixed(0)}°C
        </Typography>
      ),
    },
    {
      id: 'hubExhaustTemp',
      label: 'H.Ex Out (°C)',
      minWidth: 90,
      align: 'center',
      format: (v) => (
        <Typography sx={{ fontVariantNumeric: 'tabular-nums', fontSize: '0.75rem' }}>
          {(v as number).toFixed(0)}°C
        </Typography>
      ),
    },
    {
      id: 'operatingMode',
      label: 'OP Mode',
      minWidth: 110,
      align: 'center',
      format: (v) => (
        <Typography sx={{ fontSize: '0.7rem', color: '#475569' }}>{String(v)}</Typography>
      ),
    },
  ];

  return (
    <>
      {keyframes}
      <Box className={classes.container}>
        {/* Hero Header */}
        <Box className={classes.heroHeader}>
          <Box className={classes.heroLeft}>
            <Avatar className={classes.heroAvatar} src={user?.profilePicture || undefined}>
              {!user?.profilePicture && userInitials}
            </Avatar>
            <Box>
              <Typography className={classes.heroGreeting}>Welcome back</Typography>
              <Typography className={classes.heroTitle}>{userName}</Typography>
            </Box>
          </Box>

          <Box className={classes.heroCenterMobile}>
            <Typography className={classes.heroCenterMobileTitle}>OPERATIONS HUB</Typography>
            <Box className={classes.heroCenterMobileBadge}>
              <Box className={classes.heroCenterMobileDot} />
              <Typography className={classes.heroCenterMobileLive}>LIVE</Typography>
            </Box>
          </Box>

          <Box className={classes.heroCenter}>
            <Typography className={classes.heroCenterTitle}>OPERATIONS HUB</Typography>
            <Box className={classes.heroCenterBadge}>
              <Box className={classes.heroCenterDot} />
              <Typography className={classes.heroCenterLive}>Live Tracking Activity</Typography>
            </Box>
            <Typography className={classes.heroCenterFacilities}>
              WTG Turbines · Sub Stations · Transmission Lines
            </Typography>
          </Box>

          <Box className={classes.heroRight}>
            <Box className={classes.heroClockWidget}>
              <Box className={classes.heroClockRow}>
                <Typography className={classes.heroClockHM}>
                  {hours}:{minutes}
                </Typography>
                <Typography className={classes.heroClockSec}>{seconds}</Typography>
              </Box>
              <Typography className={classes.heroClockDate}>{dateStr}</Typography>
              <Box className={classes.heroClockTz}>
                <Box className={classes.heroClockTzDot} />
                <Typography className={classes.heroClockTzText}>
                  {tzAbbr} · {tzRegion} · {utcOffset}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Stats Overview Cards - Wind Farm Operations */}
        <Box className={classes.statsRow}>
          <Paper className={classes.statCard} elevation={0}>
            <Box
              className={classes.statCardIconWrap}
              sx={{ background: 'rgba(79,70,229,0.12)', border: '1px solid rgba(79,70,229,0.3)' }}
            >
              <SettingsIcon sx={{ color: '#4f46e5', fontSize: 20 }} />
            </Box>
            <Box>
              <Typography className={classes.statCardValue}>{turbineData.length}</Typography>
              <Typography className={classes.statCardLabel}>Total Turbines</Typography>
            </Box>
          </Paper>

          <Paper className={classes.statCard} elevation={0}>
            <Box
              className={classes.statCardIconWrap}
              sx={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)' }}
            >
              <PlayArrowIcon sx={{ color: '#10b981', fontSize: 20 }} />
            </Box>
            <Box>
              <Typography className={classes.statCardValue}>{runningCount}</Typography>
              <Typography className={classes.statCardLabel}>Running</Typography>
            </Box>
          </Paper>

          <Paper className={classes.statCard} elevation={0}>
            <Box
              className={classes.statCardIconWrap}
              sx={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)' }}
            >
              <FlashOnIcon sx={{ color: '#f59e0b', fontSize: 20 }} />
            </Box>
            <Box>
              <Typography className={classes.statCardValue}>{formatValue(totalPower)}</Typography>
              <Typography className={classes.statCardLabel}>Active Power (kW)</Typography>
            </Box>
          </Paper>

          <Paper className={classes.statCard} elevation={0}>
            <Box
              className={classes.statCardIconWrap}
              sx={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)' }}
            >
              <SpeedIcon sx={{ color: '#8b5cf6', fontSize: 20 }} />
            </Box>
            <Box>
              <Typography className={classes.statCardValue}>
                {formatValue(totalGeneration, 0)}
              </Typography>
              <Typography className={classes.statCardLabel}>Today Generation (kWh)</Typography>
            </Box>
          </Paper>

          <Paper className={classes.statCard} elevation={0}>
            <Box
              className={classes.statCardIconWrap}
              sx={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)' }}
            >
              <AirIcon sx={{ color: '#3b82f6', fontSize: 20 }} />
            </Box>
            <Box>
              <Typography className={classes.statCardValue}>{avgWindSpeed}</Typography>
              <Typography className={classes.statCardLabel}>Avg Wind (m/s)</Typography>
            </Box>
          </Paper>

          <Paper className={classes.statCard} elevation={0}>
            <Box
              className={classes.statCardIconWrap}
              sx={{
                background: faultCount > 0 ? 'rgba(239,68,68,0.12)' : 'rgba(16,185,129,0.12)',
                border:
                  faultCount > 0
                    ? '1px solid rgba(239,68,68,0.3)'
                    : '1px solid rgba(16,185,129,0.3)',
              }}
            >
              <WarningIcon sx={{ color: faultCount > 0 ? '#ef4444' : '#10b981', fontSize: 20 }} />
            </Box>
            <Box>
              <Typography
                className={classes.statCardValue}
                sx={{ color: faultCount > 0 ? '#ef4444' : '#10b981' }}
              >
                {faultCount}
              </Typography>
              <Typography className={classes.statCardLabel}>Faults</Typography>
            </Box>
          </Paper>

          <Paper className={classes.statCard} elevation={0}>
            <Box
              className={classes.statCardIconWrap}
              sx={{
                background:
                  turbineData.filter((t) => t.status === 'maintenance').length > 0
                    ? 'rgba(245,158,11,0.12)'
                    : 'rgba(107,114,128,0.12)',
                border:
                  turbineData.filter((t) => t.status === 'maintenance').length > 0
                    ? '1px solid rgba(245,158,11,0.3)'
                    : '1px solid rgba(107,114,128,0.3)',
              }}
            >
              <BuildIcon
                sx={{
                  color:
                    turbineData.filter((t) => t.status === 'maintenance').length > 0
                      ? '#f59e0b'
                      : '#6b7280',
                  fontSize: 20,
                }}
              />
            </Box>
            <Box>
              <Typography
                className={classes.statCardValue}
                sx={{
                  color:
                    turbineData.filter((t) => t.status === 'maintenance').length > 0
                      ? '#f59e0b'
                      : '#6b7280',
                }}
              >
                {turbineData.filter((t) => t.status === 'maintenance').length}
              </Typography>
              <Typography className={classes.statCardLabel}>Maintenance</Typography>
            </Box>
          </Paper>
        </Box>

        {/* Live Turbine Data Table */}
        <DataTable
          columns={columns}
          data={turbineData}
          rowKey='id'
          searchable={false}
          initialRowsPerPage={10}
          onRowClick={(row) => setSelectedTurbine(row as TurbineData)}
        />
      </Box>

      <TurbineDetailDialog
        open={Boolean(selectedTurbine)}
        turbine={selectedTurbine}
        onClose={() => setSelectedTurbine(null)}
      />
    </>
  );
};

function getStatusIcon(status: TurbineData['status']) {
  switch (status) {
    case 'running':
      return <PlayArrowIcon sx={{ fontSize: 12 }} />;
    case 'stopped':
      return <StopIcon sx={{ fontSize: 12 }} />;
    case 'maintenance':
      return <BuildIcon sx={{ fontSize: 12 }} />;
    case 'fault':
      return <WarningIcon sx={{ fontSize: 12 }} />;
    case 'standby':
      return <RefreshIcon sx={{ fontSize: 12 }} />;
  }
}

export default Dashboard;
