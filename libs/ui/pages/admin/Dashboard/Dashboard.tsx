import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Typography,
  Chip,
  Paper,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Checkbox,
  Divider,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { DataTable, Column } from '@infyenergy/component';
import ReactApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import BuildIcon from '@mui/icons-material/Build';
import WarningIcon from '@mui/icons-material/Warning';
import RefreshIcon from '@mui/icons-material/Refresh';
import SpeedIcon from '@mui/icons-material/Speed';
import AirIcon from '@mui/icons-material/Air';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SettingsIcon from '@mui/icons-material/Settings';
import TableChartIcon from '@mui/icons-material/TableChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SearchIcon from '@mui/icons-material/Search';
import BoltIcon from '@mui/icons-material/Bolt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RouterIcon from '@mui/icons-material/Router';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { useAdminKeyframes, useAuth, useLiveDateTime } from '../../../hooks';
import { useStyles } from './styles';
import { TurbineData, MOCK_TURBINE_DATA, STATUS_CONFIG } from './types/turbineData.types';
import { constants } from '@infyenergy/utils';

// ─── Constants ────────────────────────────────────────────────────────────────

type ChartType = 'bar' | 'line';

const ALL_TURBINES = MOCK_TURBINE_DATA.map((t) => t.turbineNo);
const SELECT_ALL = '__select_all__';

const TURBINE_COLORS = [
  '#6366f1',
  '#06b6d4',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#f97316',
  '#0d9488',
  '#3b82f6',
  '#ec4899',
];

const MIN_DATE = dayjs('2026-01-01');
const MAX_DATE = dayjs().startOf('day');

// ─── Data helpers ─────────────────────────────────────────────────────────────

const generateDayData = (dateStr: string): number[] => {
  const [y, m, d] = dateStr.split('-').map(Number);
  const seed = (y % 100) * 10000 + m * 100 + d;
  const base: Record<string, number> = {
    running: 4200,
    standby: 900,
    maintenance: 1600,
    fault: 300,
    stopped: 0,
  };
  return MOCK_TURBINE_DATA.map((t, i) => {
    if (t.status === 'stopped') return 0;
    const variation = ((seed + i * 97 + i * i * 13) % 1600) - 800;
    return Math.max(0, Math.round((base[t.status] ?? 3000) + variation));
  });
};

const toDateStr = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const getChartData = (from: Dayjs, to: Dayjs, turbineNos: string[]) => {
  const fromDate = from.toDate();
  const toDate = to.toDate();
  const totalDays = Math.round((toDate.getTime() - fromDate.getTime()) / 86_400_000) + 1;

  const turbineIndices = turbineNos.map((no) => ALL_TURBINES.indexOf(no));

  const categories: string[] = [];
  const buckets: number[][] = turbineIndices.map(() => []);
  let aggregate: 'daily' | 'weekly' | 'monthly' = 'daily';

  if (totalDays <= 31) {
    // ── Daily ──
    aggregate = 'daily';
    for (let d = 0; d < totalDays; d++) {
      const date = new Date(fromDate);
      date.setDate(fromDate.getDate() + d);
      categories.push(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }));
      const vals = generateDayData(toDateStr(date));
      turbineIndices.forEach((ti, i) => buckets[i].push(vals[ti] ?? 0));
    }
  } else if (totalDays <= 180) {
    // ── Weekly ──
    aggregate = 'weekly';
    const wStart = new Date(fromDate);
    while (wStart <= toDate) {
      const wEnd = new Date(wStart);
      wEnd.setDate(wStart.getDate() + 6);
      if (wEnd > toDate) wEnd.setTime(toDate.getTime());
      categories.push(wStart.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }));
      const sums = turbineIndices.map(() => 0);
      const cur = new Date(wStart);
      while (cur <= wEnd) {
        const vals = generateDayData(toDateStr(cur));
        turbineIndices.forEach((ti, i) => {
          sums[i] += vals[ti] ?? 0;
        });
        cur.setDate(cur.getDate() + 1);
      }
      sums.forEach((s, i) => buckets[i].push(Math.round(s)));
      wStart.setDate(wStart.getDate() + 7);
    }
  } else {
    // ── Monthly ──
    aggregate = 'monthly';
    const cur = new Date(fromDate.getFullYear(), fromDate.getMonth(), 1);
    const end = new Date(toDate.getFullYear(), toDate.getMonth(), 1);
    while (cur <= end) {
      const yr = cur.getFullYear();
      const mo = cur.getMonth();
      const dim = new Date(yr, mo + 1, 0).getDate();
      categories.push(cur.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }));
      const sums = turbineIndices.map(() => 0);
      for (let d = 1; d <= dim; d++) {
        const day = new Date(yr, mo, d);
        if (day < fromDate || day > toDate) continue;
        const vals = generateDayData(toDateStr(day));
        turbineIndices.forEach((ti, i) => {
          sums[i] += vals[ti] ?? 0;
        });
      }
      sums.forEach((s, i) => buckets[i].push(Math.round(s)));
      cur.setMonth(cur.getMonth() + 1);
    }
  }

  const series = turbineNos.map((name, i) => ({ name, data: buckets[i] }));
  const allVals = buckets.flat();
  const totalEnergy = allVals.reduce((a, b) => a + b, 0);
  const peakValue = allVals.length ? Math.max(...allVals) : 0;
  const avgPerDay = totalDays > 0 ? Math.round(totalEnergy / totalDays) : 0;

  return { categories, series, aggregate, totalDays, totalEnergy, peakValue, avgPerDay };
};

const fmtEnergy = (kwh: number) => {
  if (kwh >= 1_000_000) return `${(kwh / 1_000_000).toFixed(2)} GWh`;
  if (kwh >= 1_000) return `${(kwh / 1_000).toFixed(1)} MWh`;
  return `${kwh.toLocaleString()} kWh`;
};

const fmtYAxis = (val: number) => {
  if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}G`;
  if (val >= 1_000) return `${(val / 1_000).toFixed(0)}k`;
  return `${Math.round(val)}`;
};

const TOGGLE_BTN_BASE = {
  fontSize: '0.8rem',
  fontWeight: 600,
  textTransform: 'none' as const,
  borderRadius: '8px',
  padding: '6px 18px',
  minWidth: 148,
  transition: 'all 0.18s ease',
  boxShadow: 'none',
};

const FIELD_W = 220;

const FIELD_SX = {
  width: FIELD_W,
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    height: '40px',
    fontSize: '0.85rem',
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#6366f1' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#6366f1',
      borderWidth: '2px',
    },
  },
  '& fieldset': { borderRadius: '10px' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1' },
};

// ─── Component ────────────────────────────────────────────────────────────────

const Dashboard = () => {
  const { classes } = useStyles();
  const { AdminPath } = constants;
  const navigate = useNavigate();
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
  const [view, setView] = useState<'table' | 'chart'>('table');
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [fromDate, setFromDate] = useState<Dayjs>(MIN_DATE);
  const [toDate, setToDate] = useState<Dayjs>(MAX_DATE);
  const [selectedTurbines, setSelectedTurbines] = useState<string[]>(ALL_TURBINES);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const id = setInterval(() => {
      setTurbineData((prev) =>
        prev.map((t) => {
          if (t.status === 'running') {
            return {
              ...t,
              time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
              activePower: Math.max(0, t.activePower + (Math.random() - 0.5) * 100),
              windSpeed: Math.max(3, Math.min(25, t.windSpeed + (Math.random() - 0.5) * 0.5)),
              todayGeneration: t.todayGeneration + t.activePower / 3600,
            };
          }
          return { ...t, time: new Date().toLocaleTimeString('en-GB', { hour12: false }) };
        }),
      );
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // ── Fleet stats ───────────────────────────────────────────────────────────────
  const runningCount = turbineData.filter((t) => t.status === 'running').length;
  const totalPower = turbineData
    .filter((t) => t.status === 'running')
    .reduce((s, t) => s + t.activePower, 0);
  const avgWindSpeed = (
    turbineData.filter((t) => t.status === 'running').reduce((s, t) => s + t.windSpeed, 0) /
    (runningCount || 1)
  ).toFixed(1);
  const totalGeneration = turbineData.reduce((s, t) => s + t.todayGeneration, 0);
  const faultCount = turbineData.filter((t) => t.status === 'fault').length;
  const maintCount = turbineData.filter((t) => t.status === 'maintenance').length;
  const fmtVal = (v: number, dec = 1) => v.toFixed(dec);

  const filteredTurbines = turbineData.filter((t) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return t.turbineNo.toLowerCase().includes(q) || t.status.toLowerCase().includes(q);
  });

  // ── Chart data ────────────────────────────────────────────────────────────────
  const chartData = useMemo(
    () => getChartData(fromDate, toDate, selectedTurbines.length ? selectedTurbines : ALL_TURBINES),
    [fromDate, toDate, selectedTurbines],
  );

  const seriesColors = (selectedTurbines.length ? selectedTurbines : ALL_TURBINES).map(
    (t) => TURBINE_COLORS[ALL_TURBINES.indexOf(t)] ?? '#6366f1',
  );

  const axisLabelCount = Math.min(chartData.categories.length, 20);
  const rotateLabels = chartData.categories.length > 15;

  const commonAxisX: ApexOptions['xaxis'] = {
    categories: chartData.categories,
    tickAmount: axisLabelCount,
    title: {
      text: `${chartData.aggregate === 'daily' ? 'Day' : chartData.aggregate === 'weekly' ? 'Week starting' : 'Month'} · ${fromDate.format('DD MMM YYYY')} – ${toDate.format('DD MMM YYYY')}`,
      style: { color: '#94a3b8', fontSize: '11px', fontWeight: '500' },
      offsetY: 4,
    },
    labels: {
      rotate: rotateLabels ? -45 : 0,
      rotateAlways: rotateLabels,
      style: {
        colors: Array(chartData.categories.length).fill('#64748b'),
        fontSize: '10px',
        fontWeight: '500',
      },
      trim: false,
    },
    axisBorder: { show: false },
    axisTicks: { color: '#e2e8f0' },
    crosshairs: { show: true, stroke: { color: '#e2e8f0', width: 1, dashArray: 4 } },
  };

  const commonAxisY: ApexOptions['yaxis'] = {
    title: {
      text: 'Energy (kWh)',
      style: { color: '#94a3b8', fontSize: '11px', fontWeight: '500' },
    },
    labels: {
      formatter: fmtYAxis,
      style: { colors: ['#64748b'], fontSize: '11px' },
    },
    min: 0,
  };

  const commonGrid: ApexOptions['grid'] = {
    borderColor: '#f1f5f9',
    strokeDashArray: 4,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } },
    padding: { left: 8, right: 8 },
  };

  const commonLegend: ApexOptions['legend'] = {
    show: true,
    position: 'bottom',
    horizontalAlign: 'center',
    fontSize: '12px',
    fontWeight: 600,
    fontFamily: 'inherit',
    labels: { colors: Array(10).fill('#475569') },
    markers: { size: 8 },
    itemMargin: { horizontal: 10, vertical: 8 },
    onItemClick: { toggleDataSeries: true },
    onItemHover: { highlightDataSeries: true },
  };

  const commonTooltip: ApexOptions['tooltip'] = {
    theme: 'light',
    shared: true,
    intersect: false,
    style: { fontSize: '12px', fontFamily: 'inherit' },
    y: { formatter: (val: number) => `${val.toLocaleString()} kWh` },
  };

  const barOptions: ApexOptions = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: { show: false },
      background: 'transparent',
      fontFamily: 'inherit',
      animations: { enabled: true, speed: 600, animateGradually: { enabled: true, delay: 20 } },
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        columnWidth: '78%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },
    },
    dataLabels: { enabled: false },
    fill: { opacity: 0.92 },
    colors: seriesColors,
    xaxis: commonAxisX,
    yaxis: commonAxisY,
    grid: commonGrid,
    legend: commonLegend,
    tooltip: { ...commonTooltip, shared: true },
  };

  const lineOptions: ApexOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      background: 'transparent',
      fontFamily: 'inherit',
      animations: { enabled: true, speed: 800 },
    },
    stroke: { curve: 'smooth', width: Array(selectedTurbines.length).fill(2.5) },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.4,
        opacityFrom: 0.3,
        opacityTo: 0.02,
        stops: [0, 90],
      },
    },
    markers: { size: 0, hover: { size: 5, sizeOffset: 2 } },
    colors: seriesColors,
    xaxis: commonAxisX,
    yaxis: commonAxisY,
    grid: commonGrid,
    legend: commonLegend,
    tooltip: commonTooltip,
    dataLabels: { enabled: false },
  };

  // ── Dynamic KPI cards ─────────────────────────────────────────────────────────
  const aggLabel =
    chartData.aggregate === 'daily' ? 'day' : chartData.aggregate === 'weekly' ? 'week' : 'month';

  const kpiCards = [
    {
      label: 'Total Energy',
      value: fmtEnergy(chartData.totalEnergy),
      sub: `${fromDate.format('DD MMM')} – ${toDate.format('DD MMM YYYY')}`,
      color: '#6366f1',
      Icon: BoltIcon,
    },
    {
      label: 'Peak Output',
      value: fmtEnergy(chartData.peakValue),
      sub: `Highest single ${aggLabel}`,
      color: '#10b981',
      Icon: TrendingUpIcon,
    },
    {
      label: `Avg / Day`,
      value: fmtEnergy(chartData.avgPerDay),
      sub: `Across ${chartData.totalDays} days`,
      color: '#0891b2',
      Icon: CalendarMonthIcon,
    },
    {
      label: 'Turbines',
      value: `${selectedTurbines.length || ALL_TURBINES.length}`,
      sub: selectedTurbines.length === ALL_TURBINES.length ? 'All turbines' : 'Selected',
      color: '#f59e0b',
      Icon: RouterIcon,
    },
  ];

  // ── Table columns ─────────────────────────────────────────────────────────────
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
            navigate(AdminPath.TURBINE_DETAIL.replace(':id', String((row as TurbineData).id)));
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
        const cfg = STATUS_CONFIG[v as TurbineData['status']];
        return (
          <Chip
            size='small'
            icon={getStatusIcon(v as TurbineData['status'])}
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
          {fmtVal(v as number)}
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
          {fmtVal(v as number)}
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
        {/* ── Hero Header ── */}
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

        {/* ── Stat Cards ── */}
        <Box className={classes.statsRow}>
          {[
            {
              icon: <SettingsIcon sx={{ color: '#4f46e5', fontSize: 20 }} />,
              bg: 'rgba(79,70,229,0.12)',
              border: 'rgba(79,70,229,0.3)',
              value: turbineData.length,
              label: 'Total Turbines',
            },
            {
              icon: <PlayArrowIcon sx={{ color: '#10b981', fontSize: 20 }} />,
              bg: 'rgba(16,185,129,0.12)',
              border: 'rgba(16,185,129,0.3)',
              value: runningCount,
              label: 'Running',
            },
            {
              icon: <FlashOnIcon sx={{ color: '#f59e0b', fontSize: 20 }} />,
              bg: 'rgba(245,158,11,0.12)',
              border: 'rgba(245,158,11,0.3)',
              value: fmtVal(totalPower),
              label: 'Active Power (kW)',
            },
            {
              icon: <SpeedIcon sx={{ color: '#8b5cf6', fontSize: 20 }} />,
              bg: 'rgba(139,92,246,0.12)',
              border: 'rgba(139,92,246,0.3)',
              value: fmtVal(totalGeneration, 0),
              label: 'Today Gen (kWh)',
            },
            {
              icon: <AirIcon sx={{ color: '#3b82f6', fontSize: 20 }} />,
              bg: 'rgba(59,130,246,0.12)',
              border: 'rgba(59,130,246,0.3)',
              value: avgWindSpeed,
              label: 'Avg Wind (m/s)',
            },
            {
              icon: (
                <WarningIcon sx={{ color: faultCount > 0 ? '#ef4444' : '#10b981', fontSize: 20 }} />
              ),
              bg: faultCount > 0 ? 'rgba(239,68,68,0.12)' : 'rgba(16,185,129,0.12)',
              border: faultCount > 0 ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)',
              value: faultCount,
              label: 'Faults',
              valueColor: faultCount > 0 ? '#ef4444' : '#10b981',
            },
            {
              icon: (
                <BuildIcon sx={{ color: maintCount > 0 ? '#f59e0b' : '#6b7280', fontSize: 20 }} />
              ),
              bg: maintCount > 0 ? 'rgba(245,158,11,0.12)' : 'rgba(107,114,128,0.12)',
              border: maintCount > 0 ? 'rgba(245,158,11,0.3)' : 'rgba(107,114,128,0.3)',
              value: maintCount,
              label: 'Maintenance',
              valueColor: maintCount > 0 ? '#f59e0b' : '#6b7280',
            },
          ].map(({ icon, bg, border, value, label, valueColor }) => (
            <Paper key={label} className={classes.statCard} elevation={0}>
              <Box
                className={classes.statCardIconWrap}
                sx={{ background: bg, border: `1px solid ${border}` }}
              >
                {icon}
              </Box>
              <Box>
                <Typography
                  className={classes.statCardValue}
                  sx={valueColor ? { color: valueColor } : {}}
                >
                  {value}
                </Typography>
                <Typography className={classes.statCardLabel}>{label}</Typography>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* ── Toolbar ── */}
        <Box className={classes.tableToolbar}>
          <Box className={classes.viewToggleGroup}>
            <Button
              variant={view === 'table' ? 'contained' : 'outlined'}
              startIcon={<TableChartIcon sx={{ fontSize: 18 }} />}
              onClick={() => setView('table')}
              sx={
                view === 'table'
                  ? {
                      ...TOGGLE_BTN_BASE,
                      background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
                      '&:hover': {
                        background: 'linear-gradient(135deg,#4338ca,#6d28d9)',
                        boxShadow: '0 4px 12px rgba(79,70,229,0.35)',
                        transform: 'translateY(-1px)',
                      },
                    }
                  : {
                      ...TOGGLE_BTN_BASE,
                      color: '#64748b',
                      borderColor: '#e2e8f0',
                      background: '#f8fafc',
                      '&:hover': { background: '#f1f5f9', borderColor: '#cbd5e1' },
                    }
              }
            >
              Fleet Overview
            </Button>

            <Button
              variant={view === 'chart' ? 'contained' : 'outlined'}
              startIcon={
                chartType === 'bar' ? (
                  <BarChartIcon sx={{ fontSize: 18 }} />
                ) : (
                  <ShowChartIcon sx={{ fontSize: 18 }} />
                )
              }
              onClick={() => setView('chart')}
              sx={
                view === 'chart'
                  ? {
                      ...TOGGLE_BTN_BASE,
                      background: 'linear-gradient(135deg,#f97316 0%,#ec4899 55%,#8b5cf6 100%)',
                      boxShadow: '0 4px 18px rgba(249,115,22,0.4)',
                      '&:hover': {
                        boxShadow: '0 6px 24px rgba(249,115,22,0.55)',
                        transform: 'translateY(-1px)',
                        background: 'linear-gradient(135deg,#ea580c 0%,#db2777 55%,#7c3aed 100%)',
                      },
                    }
                  : {
                      ...TOGGLE_BTN_BASE,
                      color: '#64748b',
                      borderColor: '#e2e8f0',
                      background: '#f8fafc',
                      '&:hover': { background: '#f1f5f9', borderColor: '#cbd5e1' },
                    }
              }
            >
              Power Analytics
            </Button>
          </Box>

          <TextField
            placeholder='Search turbines…'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size='small'
            className={classes.toolbarSearch}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position='end'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {/* ── Analytics Filter Panel ── */}
        {view === 'chart' && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
              background: '#ffffff',
              borderRadius: '14px',
              p: '14px 20px',
              mb: 2,
              border: '1px solid #e8eaf0',
              borderLeft: '4px solid #6366f1',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}
          >
            {/* Label */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 1 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '9px',
                  background: 'linear-gradient(135deg,#f97316,#ec4899)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 3px 10px rgba(249,115,22,0.35)',
                }}
              >
                <BarChartIcon sx={{ fontSize: 17, color: '#fff' }} />
              </Box>
              <Typography
                sx={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#4338ca',
                  letterSpacing: '0.03em',
                }}
              >
                Filters
              </Typography>
            </Box>

            <Divider
              orientation='vertical'
              flexItem
              sx={{ borderColor: 'rgba(99,102,241,0.15)', mx: 0.5 }}
            />

            {/* Chart Type */}
            <FormControl size='small' sx={FIELD_SX}>
              <InputLabel>Chart Type</InputLabel>
              <Select
                value={chartType}
                label='Chart Type'
                onChange={(e) => setChartType(e.target.value as ChartType)}
              >
                <MenuItem value='bar'>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BarChartIcon sx={{ fontSize: 17, color: '#6366f1' }} />
                    <Typography sx={{ fontSize: '0.85rem' }}>Bar Chart</Typography>
                  </Box>
                </MenuItem>
                <MenuItem value='line'>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ShowChartIcon sx={{ fontSize: 17, color: '#06b6d4' }} />
                    <Typography sx={{ fontSize: '0.85rem' }}>Line Chart</Typography>
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>

            {/* Turbines */}
            <Autocomplete
              multiple
              disableCloseOnSelect
              size='small'
              options={[SELECT_ALL, ...ALL_TURBINES]}
              value={selectedTurbines}
              onChange={(_, v) => {
                if (v.includes(SELECT_ALL)) {
                  setSelectedTurbines(
                    selectedTurbines.length === ALL_TURBINES.length ? [] : [...ALL_TURBINES],
                  );
                } else {
                  setSelectedTurbines(v as string[]);
                }
              }}
              getOptionLabel={(o) => (o === SELECT_ALL ? 'Select All' : o)}
              isOptionEqualToValue={(opt, val) => opt === val}
              renderOption={(props, option, { selected }) => {
                if (option === SELECT_ALL) {
                  const allSelected = selectedTurbines.length === ALL_TURBINES.length;
                  const indeterminate = selectedTurbines.length > 0 && !allSelected;
                  return (
                    <li {...props} key={SELECT_ALL}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon sx={{ fontSize: 16 }} />}
                        checkedIcon={<CheckBoxIcon sx={{ fontSize: 16 }} />}
                        indeterminateIcon={<IndeterminateCheckBoxIcon sx={{ fontSize: 16 }} />}
                        checked={allSelected}
                        indeterminate={indeterminate}
                        size='small'
                        sx={{
                          mr: 0.5,
                          color: '#6366f1',
                          '&.Mui-checked': { color: '#6366f1' },
                          '&.MuiCheckbox-indeterminate': { color: '#6366f1' },
                        }}
                      />
                      <Typography sx={{ fontSize: '0.84rem', fontWeight: 700, color: '#4338ca' }}>
                        Select All
                      </Typography>
                    </li>
                  );
                }
                const colorIdx = ALL_TURBINES.indexOf(option);
                return (
                  <li {...props} key={option}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon sx={{ fontSize: 16 }} />}
                      checkedIcon={<CheckBoxIcon sx={{ fontSize: 16 }} />}
                      checked={selected}
                      size='small'
                      sx={{
                        mr: 0.5,
                        color: TURBINE_COLORS[colorIdx],
                        '&.Mui-checked': { color: TURBINE_COLORS[colorIdx] },
                      }}
                    />
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: TURBINE_COLORS[colorIdx],
                        mr: 1,
                        flexShrink: 0,
                        boxShadow: `0 0 6px ${TURBINE_COLORS[colorIdx]}88`,
                      }}
                    />
                    <Typography sx={{ fontSize: '0.84rem', fontWeight: 600 }}>{option}</Typography>
                  </li>
                );
              }}
              renderTags={(value) => (
                <Chip
                  label={
                    value.length === ALL_TURBINES.length
                      ? `All (${value.length})`
                      : `${value.length} selected`
                  }
                  size='small'
                  sx={{
                    background: 'rgba(99,102,241,0.12)',
                    color: '#4338ca',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    height: 22,
                    borderRadius: '6px',
                  }}
                />
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Turbines'
                  placeholder={selectedTurbines.length ? '' : 'Select…'}
                  sx={FIELD_SX}
                />
              )}
              sx={{ width: FIELD_W }}
              ListboxProps={{ sx: { maxHeight: 280 } }}
            />

            {/* From Date */}
            <DatePicker
              label='From Date'
              value={fromDate}
              onChange={(v) => {
                if (v && v.isValid()) setFromDate(v);
              }}
              minDate={MIN_DATE}
              maxDate={toDate}
              slotProps={{
                textField: { size: 'small', sx: FIELD_SX },
              }}
            />

            {/* To Date */}
            <DatePicker
              label='To Date'
              value={toDate}
              onChange={(v) => {
                if (v && v.isValid()) setToDate(v);
              }}
              minDate={fromDate}
              maxDate={MAX_DATE}
              slotProps={{
                textField: { size: 'small', sx: FIELD_SX },
              }}
            />

            {/* Range info chip */}
            <Box sx={{ ml: 'auto' }}>
              <Chip
                label={`${chartData.totalDays}d · ${chartData.aggregate}`}
                size='small'
                sx={{
                  background: 'rgba(99,102,241,0.1)',
                  color: '#4338ca',
                  fontWeight: 600,
                  fontSize: '0.72rem',
                  border: '1px solid rgba(99,102,241,0.25)',
                  height: 26,
                }}
              />
            </Box>
          </Box>
        )}

        {/* ── Content ── */}
        {view === 'table' ? (
          <DataTable
            columns={columns}
            data={filteredTurbines}
            rowKey='id'
            searchable={false}
            initialRowsPerPage={10}
            onRowClick={(row) => {
              const t = row as TurbineData;
              navigate(AdminPath.TURBINE_DETAIL.replace(':id', String(t.id)));
            }}
          />
        ) : (
          /* ── Power Analytics Card ── */
          <Box className={classes.chartCard}>
            {/* Card Header */}
            <Box className={classes.chartCardHeader}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg,#f97316,#ec4899)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(249,115,22,0.35)',
                    flexShrink: 0,
                  }}
                >
                  {chartType === 'bar' ? (
                    <BarChartIcon sx={{ color: '#fff', fontSize: 20 }} />
                  ) : (
                    <ShowChartIcon sx={{ color: '#fff', fontSize: 20 }} />
                  )}
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: '#1e293b',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Power Analytics
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', mt: 0.2 }}>
                    {chartType === 'bar' ? 'Stacked Energy Generation' : 'Generation Trend'} ·{' '}
                    {chartData.aggregate.charAt(0).toUpperCase() + chartData.aggregate.slice(1)} ·{' '}
                    {fromDate.format('DD MMM')} – {toDate.format('DD MMM YYYY')}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  icon={
                    chartType === 'bar' ? (
                      <BarChartIcon style={{ fontSize: 13, color: '#6366f1' }} />
                    ) : (
                      <ShowChartIcon style={{ fontSize: 13, color: '#06b6d4' }} />
                    )
                  }
                  label={chartType === 'bar' ? 'Bar Chart' : 'Line Chart'}
                  size='small'
                  sx={{
                    background: 'rgba(99,102,241,0.08)',
                    border: '1px solid rgba(99,102,241,0.2)',
                    color: '#4f46e5',
                    fontWeight: 600,
                    fontSize: '0.72rem',
                    height: 26,
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                    background: 'rgba(16,185,129,0.08)',
                    borderRadius: '8px',
                    px: 1.5,
                    py: 0.625,
                    border: '1px solid rgba(16,185,129,0.2)',
                  }}
                >
                  <Box
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: '#10b981',
                      animation: 'livePulse 2s ease-in-out infinite',
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '0.68rem',
                      color: '#10b981',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                    }}
                  >
                    LIVE
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Card Body */}
            <Box className={classes.chartCardBody}>
              {/* KPI cards */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: 'repeat(2,1fr)', sm: 'repeat(4,1fr)' },
                  gap: 1.5,
                  mb: 2.5,
                }}
              >
                {kpiCards.map(({ label, value, sub, color, Icon }) => (
                  <Paper
                    key={label}
                    elevation={0}
                    sx={{
                      borderRadius: '10px',
                      border: '1px solid #e8eaf0',
                      p: 1.75,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 0.75,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '0.6rem',
                          fontWeight: 700,
                          color: '#94a3b8',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {label}
                      </Typography>
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: '8px',
                          background: `${color}14`,
                          border: `1px solid ${color}28`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon sx={{ fontSize: 14, color }} />
                      </Box>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: { xs: '1.1rem', md: '1.3rem' },
                        fontWeight: 800,
                        color,
                        lineHeight: 1,
                        mb: 0.35,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {value}
                    </Typography>
                    <Typography sx={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 500 }}>
                      {sub}
                    </Typography>
                  </Paper>
                ))}
              </Box>

              {/* Chart */}
              <ReactApexChart
                key={`${chartType}-${fromDate.valueOf()}-${toDate.valueOf()}-${selectedTurbines.join(',')}`}
                type={chartType === 'bar' ? 'bar' : 'area'}
                options={chartType === 'bar' ? barOptions : lineOptions}
                series={chartData.series}
                height={400}
              />
            </Box>
          </Box>
        )}
      </Box>
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
