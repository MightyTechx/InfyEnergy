import { useState, useEffect } from 'react';
import { Box, Column, DataTable } from '@infyenergy/component';
import {
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Chip,
  Autocomplete,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  Button,
  OutlinedInput,
  SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { Dayjs } from 'dayjs';
import { useAdminKeyframes } from 'libs/ui/hooks/useAdminKeyframes';
import { useStyles } from './styles';

// ─── Filter bar constants ─────────────────────────────────────────────────────

const REPORT_TYPES = [
  'Daily Generation Report',
  'Weekly Generation Report',
  'Monthly Generation Report',
  'Temperature Alerts',
  'Time Series',
  'Multi-Time Analysis (Time Series)',
  'Multi-Scatter 2×2 Pairwise',
  'Heat Map',
  'Day-Wise Maximum',
  'Day-Wise Average',
  'Power Curve',
  'Wind Rose',
  'Generation',
  'Status Timeline',
  'Event Log',
  'Downtime Analysis (MTBF & MTTR)',
  'Machine Availability',
  'Trace Files',
];

const TURBINES = ['T-01', 'T-02', 'T-03', 'T-04', 'T-05', 'T-06', 'T-07', 'T-08', 'T-09', 'T-10'];

const DOC_TYPES = [
  { value: 'pdf', label: 'PDF' },
  { value: 'xlsx', label: 'Excel (XLSX)' },
  { value: 'svg', label: 'SVG' },
];

// ─── Daily Generation Report ──────────────────────────────────────────────────

interface KpiRow {
  id: number;
  kpi: string;
  t01: string;
  t02: string;
  t03: string;
  t04: string;
  t05: string;
  t06: string;
  t07: string;
  t08: string;
  t09: string;
  t10: string;
  total: string;
}

const TURBINE_IDS = ['t01', 't02', 't03', 't04', 't05', 't06', 't07', 't08', 't09', 't10'] as const;

const KPI_LABELS = [
  'Generation (kWh)',
  'Up Time (hh:mm)',
  'Unscheduled Down Time (hh:mm)',
  'Scheduled Down Time (hh:mm)',
  'Machine Availability (%)',
  'Average Wind Speed (m/s)',
  'Capacity Utilization Factor (CUF %)',
];

const EMPTY_TURBINES = {
  t01: '-',
  t02: '-',
  t03: '-',
  t04: '-',
  t05: '-',
  t06: '-',
  t07: '-',
  t08: '-',
  t09: '-',
  t10: '-',
} satisfies Pick<KpiRow, (typeof TURBINE_IDS)[number]>;

const kpiRows: KpiRow[] = KPI_LABELS.map((kpi, i) => ({
  id: i + 1,
  kpi,
  ...EMPTY_TURBINES,
  total: '-',
}));

const kpiColumns: Column<KpiRow>[] = [
  {
    id: 'kpi',
    label: 'Key Performance Indicator (KPI)',
    minWidth: 270,
    sortable: false,
    align: 'left',
    format: (v) => (
      <Typography
        sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#1e293b', whiteSpace: 'nowrap' }}
      >
        {String(v)}
      </Typography>
    ),
  },
  ...TURBINE_IDS.map((id, i) => ({
    id,
    label: `T-${String(i + 1).padStart(2, '0')}`,
    minWidth: 72,
    sortable: false,
    align: 'center' as const,
  })),
  {
    id: 'total',
    label: 'Total',
    minWidth: 90,
    sortable: false,
    align: 'center',
    format: (v) => (
      <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#4f46e5' }}>
        {String(v ?? '-')}
      </Typography>
    ),
  },
];

// ─── Detailed Downtime Log ────────────────────────────────────────────────────

type DowntimeType =
  | 'Scheduled'
  | 'Unscheduled'
  | 'Force Majeure'
  | 'Grid Fault'
  | 'Communication Loss';

interface DowntimeRow {
  id: number;
  turbineNo: string;
  from: string;
  to: string;
  duration: string;
  downtimeType: DowntimeType;
  faultStatus: string;
  remarks: string;
}

const DOWNTIME_COLORS: Record<DowntimeType, { bg: string; color: string; border: string }> = {
  Scheduled: { bg: 'rgba(16,185,129,0.1)', color: '#059669', border: 'rgba(16,185,129,0.35)' },
  Unscheduled: { bg: 'rgba(239,68,68,0.1)', color: '#dc2626', border: 'rgba(239,68,68,0.35)' },
  'Force Majeure': {
    bg: 'rgba(245,158,11,0.1)',
    color: '#d97706',
    border: 'rgba(245,158,11,0.35)',
  },
  'Grid Fault': { bg: 'rgba(14,165,233,0.1)', color: '#0284c7', border: 'rgba(14,165,233,0.35)' },
  'Communication Loss': {
    bg: 'rgba(124,58,237,0.1)',
    color: '#7c3aed',
    border: 'rgba(124,58,237,0.35)',
  },
};

const downtimeRows: DowntimeRow[] = [
  {
    id: 1,
    turbineNo: 'T-01',
    from: '-',
    to: '-',
    duration: '-',
    downtimeType: 'Scheduled',
    faultStatus: '-',
    remarks: '-',
  },
  {
    id: 2,
    turbineNo: 'T-02',
    from: '-',
    to: '-',
    duration: '-',
    downtimeType: 'Unscheduled',
    faultStatus: '-',
    remarks: '-',
  },
  {
    id: 3,
    turbineNo: 'T-03',
    from: '-',
    to: '-',
    duration: '-',
    downtimeType: 'Grid Fault',
    faultStatus: '-',
    remarks: '-',
  },
  {
    id: 4,
    turbineNo: 'T-04',
    from: '-',
    to: '-',
    duration: '-',
    downtimeType: 'Scheduled',
    faultStatus: '-',
    remarks: '-',
  },
  {
    id: 5,
    turbineNo: 'T-05',
    from: '-',
    to: '-',
    duration: '-',
    downtimeType: 'Force Majeure',
    faultStatus: '-',
    remarks: '-',
  },
  {
    id: 6,
    turbineNo: 'T-06',
    from: '-',
    to: '-',
    duration: '-',
    downtimeType: 'Unscheduled',
    faultStatus: '-',
    remarks: '-',
  },
  {
    id: 7,
    turbineNo: 'T-07',
    from: '-',
    to: '-',
    duration: '-',
    downtimeType: 'Communication Loss',
    faultStatus: '-',
    remarks: '-',
  },
  {
    id: 8,
    turbineNo: 'T-08',
    from: '-',
    to: '-',
    duration: '-',
    downtimeType: 'Grid Fault',
    faultStatus: '-',
    remarks: '-',
  },
  {
    id: 9,
    turbineNo: 'T-09',
    from: '-',
    to: '-',
    duration: '-',
    downtimeType: 'Scheduled',
    faultStatus: '-',
    remarks: '-',
  },
  {
    id: 10,
    turbineNo: 'T-10',
    from: '-',
    to: '-',
    duration: '-',
    downtimeType: 'Unscheduled',
    faultStatus: '-',
    remarks: '-',
  },
];

const downtimeColumns: Column<DowntimeRow>[] = [
  {
    id: 'turbineNo',
    label: 'Turbine No',
    minWidth: 110,
    sortable: true,
    align: 'center',
    format: (v) => (
      <Typography
        sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#4f46e5', letterSpacing: '0.03em' }}
      >
        {String(v)}
      </Typography>
    ),
  },
  { id: 'from', label: 'From (Date & Time)', minWidth: 150, sortable: true, align: 'center' },
  { id: 'to', label: 'To (Date & Time)', minWidth: 150, sortable: true, align: 'center' },
  { id: 'duration', label: 'Duration (hh:mm)', minWidth: 130, sortable: true, align: 'center' },
  {
    id: 'downtimeType',
    label: 'Downtime Type',
    minWidth: 165,
    sortable: true,
    align: 'center',
    format: (v) => {
      const type = v as DowntimeType;
      const s = DOWNTIME_COLORS[type] ?? {
        bg: 'rgba(100,116,139,0.1)',
        color: '#475569',
        border: 'rgba(100,116,139,0.3)',
      };
      return (
        <Chip
          label={type}
          size='small'
          sx={{
            background: s.bg,
            color: s.color,
            border: `1px solid ${s.border}`,
            fontWeight: 600,
            fontSize: '0.72rem',
            height: 24,
          }}
        />
      );
    },
  },
  {
    id: 'faultStatus',
    label: 'Fault / Status Description',
    minWidth: 200,
    sortable: false,
    align: 'left',
  },
  { id: 'remarks', label: 'Remarks', minWidth: 160, sortable: false, align: 'left' },
];

// ─── Helper ───────────────────────────────────────────────────────────────────

function formatDateTime(date: Date): string {
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

// ─── Shared filter field sx (matches CreateUserDialog TextField style) ────────

const FIELD_SX = {
  flex: '1 1 180px',
  minWidth: 0,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '& fieldset': { borderRadius: '8px' },
    '&:hover fieldset': { borderColor: '#4f46e5' },
    '&.Mui-focused fieldset': { borderColor: '#4f46e5', borderWidth: '2px' },
  },
  '& .MuiInputLabel-root': { fontSize: '0.95rem' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#4f46e5' },
} as const;

const FIELD_SX_WIDE = { ...FIELD_SX, flex: '2 1 220px' } as const;

const DATE_FIELD_SX = {
  flex: '1 1 180px',
  minWidth: 0,
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    '& fieldset': { borderRadius: '10px' },
    '&:hover fieldset': { borderColor: '#4f46e5' },
    '&.Mui-focused fieldset': { borderColor: '#4f46e5', borderWidth: '2px' },
  },
  '& fieldset': { borderRadius: '10px' },
  '& .MuiInputLabel-root': { fontSize: '0.95rem' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#4f46e5' },
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

const Reports = () => {
  const { classes } = useStyles();
  const keyframes = useAdminKeyframes();

  // live clock
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  // filter bar state
  const [reportType, setReportType] = useState<string | null>(null);
  const [turbines, setTurbines] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);
  const [docType, setDocType] = useState('');

  const downloadEnabled =
    !!reportType && turbines.length > 0 && !!fromDate && !!toDate && !!docType;

  const handleTurbineChange = (e: SelectChangeEvent<string[]>) => {
    const val = e.target.value as string[];
    if (val.includes('__all__')) {
      setTurbines(turbines.length === TURBINES.length ? [] : [...TURBINES]);
    } else {
      setTurbines(val);
    }
  };

  const turbineLabel =
    turbines.length === 0
      ? ''
      : turbines.length === TURBINES.length
        ? 'All Turbines'
        : turbines.join(', ');

  // table search state
  const [kpiSearch, setKpiSearch] = useState('');
  const [dtSearch, setDtSearch] = useState('');

  const filteredKpi = kpiSearch
    ? kpiRows.filter((r) => r.kpi.toLowerCase().includes(kpiSearch.toLowerCase()))
    : kpiRows;

  const filteredDt = dtSearch
    ? downtimeRows.filter((r) =>
        Object.values(r).some((v) => String(v).toLowerCase().includes(dtSearch.toLowerCase())),
      )
    : downtimeRows;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {keyframes}
      <Grid className={classes.container}>
        {/* ── Page Header ── */}
        <Box className={classes.pageHeader}>
          <Box className={classes.headerOrb3} />
          <Box className={classes.pageHeaderRow}>
            <Typography variant='h5' className={classes.title}>
              Generation Reports
            </Typography>
          </Box>
          <Typography variant='body2' className={classes.description}>
            View and manage energy generation reports and analytics across all systems.
          </Typography>
        </Box>

        {/* ── Filter Bar ── */}
        <Box className={classes.filterBar}>
          {/* Report Type — searchable autocomplete */}
          <Autocomplete
            sx={FIELD_SX_WIDE}
            options={REPORT_TYPES}
            value={reportType}
            onChange={(_, v) => setReportType(v)}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Report Type'
                size='small'
                placeholder='Search report…'
              />
            )}
          />

          {/* Turbine — multi-select with checkboxes */}
          <FormControl sx={FIELD_SX} size='small'>
            <InputLabel>Turbine</InputLabel>
            <Select
              multiple
              value={turbines}
              onChange={handleTurbineChange}
              input={<OutlinedInput label='Turbine' />}
              renderValue={() => turbineLabel}
              MenuProps={{ PaperProps: { style: { maxHeight: 280 } } }}
            >
              <MenuItem value='__all__'>
                <Checkbox
                  checked={turbines.length === TURBINES.length}
                  indeterminate={turbines.length > 0 && turbines.length < TURBINES.length}
                  sx={{ color: '#4f46e5', '&.Mui-checked': { color: '#4f46e5' } }}
                />
                <ListItemText primary='Select All' primaryTypographyProps={{ fontWeight: 600 }} />
              </MenuItem>
              {TURBINES.map((t) => (
                <MenuItem key={t} value={t}>
                  <Checkbox
                    checked={turbines.includes(t)}
                    sx={{ color: '#4f46e5', '&.Mui-checked': { color: '#4f46e5' } }}
                  />
                  <ListItemText primary={t} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* From Date */}
          <DatePicker
            label='From Date'
            value={fromDate}
            onChange={(v) => setFromDate(v)}
            slotProps={{
              textField: { size: 'small', sx: DATE_FIELD_SX },
              desktopPaper: { sx: { borderRadius: '10px', mt: 0.5 } },
            }}
          />

          {/* To Date */}
          <DatePicker
            label='To Date'
            value={toDate}
            minDate={fromDate ?? undefined}
            onChange={(v) => setToDate(v)}
            slotProps={{
              textField: { size: 'small', sx: DATE_FIELD_SX },
              desktopPaper: { sx: { borderRadius: '10px', mt: 0.5 } },
            }}
          />

          {/* Document Type */}
          <FormControl sx={FIELD_SX} size='small'>
            <InputLabel>Document Type</InputLabel>
            <Select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              label='Document Type'
            >
              {DOC_TYPES.map((d) => (
                <MenuItem key={d.value} value={d.value}>
                  {d.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Download Button */}
          <Button
            variant='contained'
            disabled={!downloadEnabled}
            startIcon={<DownloadIcon />}
            className={classes.downloadBtn}
          >
            Download
          </Button>
        </Box>

        {/* ── Daily Generation Report ── */}
        <Box className={classes.tableSection}>
          <Box className={classes.tableSectionHeader}>
            <Box className={classes.tableSectionTitleGroup}>
              <Typography className={classes.tableSectionTitle}>Daily Generation Report</Typography>
              <Typography className={classes.tableSectionDate}>{formatDateTime(now)}</Typography>
            </Box>
            <TextField
              placeholder='Search KPI…'
              value={kpiSearch}
              onChange={(e) => setKpiSearch(e.target.value)}
              className={classes.searchField}
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
          <Box className={classes.tableWrapper}>
            <DataTable
              columns={kpiColumns}
              data={filteredKpi}
              rowKey='id'
              searchable={false}
              initialRowsPerPage={10}
              elevation={0}
            />
          </Box>
        </Box>

        {/* ── Detailed Downtime Log ── */}
        <Box className={classes.tableSection}>
          <Box className={classes.tableSectionHeader}>
            <Box className={classes.tableSectionTitleGroup}>
              <Typography className={classes.tableSectionTitle}>Detailed Downtime Log</Typography>
              <Typography className={classes.tableSectionDate}>{formatDateTime(now)}</Typography>
            </Box>
            <TextField
              placeholder='Search turbine / status…'
              value={dtSearch}
              onChange={(e) => setDtSearch(e.target.value)}
              className={classes.searchField}
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
          <Box className={classes.tableWrapper}>
            <DataTable
              columns={downtimeColumns}
              data={filteredDt}
              rowKey='id'
              searchable={false}
              initialRowsPerPage={10}
              elevation={0}
            />
          </Box>
        </Box>
      </Grid>
    </LocalizationProvider>
  );
};

export default Reports;
