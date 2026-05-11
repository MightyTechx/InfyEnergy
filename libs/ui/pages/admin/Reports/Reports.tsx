import { useState, useEffect } from 'react';
import {
  Box,
  DataTable,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
} from '@infygen/component';
import {
  InputAdornment,
  Autocomplete,
  FormControl,
  InputLabel,
  OutlinedInput,
  SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { Dayjs } from 'dayjs';
import { useStyles } from './styles';
import { REPORT_TYPES, TURBINE_LIST, DOC_TYPES } from './utils/reports.utils';
import { Utils } from './utils/Utils';
import { useAdminKeyframes } from '@infygen/hooks';

const Reports = () => {
  const { classes } = useStyles();
  const keyframes = useAdminKeyframes();
  const { kpiRows, kpiColumns, downtimeRows, downtimeColumns, formatDateTime } = Utils();

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
      setTurbines(turbines.length === TURBINE_LIST.length ? [] : [...TURBINE_LIST]);
    } else {
      setTurbines(val);
    }
  };

  const turbineLabel =
    turbines.length === 0
      ? ''
      : turbines.length === TURBINE_LIST.length
        ? 'All Turbines'
        : turbines.join(', ');

  // table search state
  const [kpiSearch, setKpiSearch] = useState('');
  const [dtSearch, setDtSearch] = useState('');

  const filteredKpi = kpiSearch
    ? kpiRows.filter((r: any) => r.kpi.toLowerCase().includes(kpiSearch.toLowerCase()))
    : kpiRows;

  const filteredDt = dtSearch
    ? downtimeRows.filter((r: any) =>
        Object.values(r).some((v: any) => String(v).toLowerCase().includes(dtSearch.toLowerCase())),
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
            className={classes.filterAutocomplete}
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
          <FormControl className={classes.filterFormControl} size='small'>
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
                  checked={turbines.length === TURBINE_LIST.length}
                  indeterminate={turbines.length > 0 && turbines.length < TURBINE_LIST.length}
                  className={classes.filterCheckbox}
                />
                <ListItemText primary='Select All' primaryTypographyProps={{ fontWeight: 600 }} />
              </MenuItem>
              {TURBINE_LIST.map((t) => (
                <MenuItem key={t} value={t}>
                  <Checkbox checked={turbines.includes(t)} className={classes.filterCheckbox} />
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
              textField: {
                size: 'small',
                className: classes.datePickerField,
              },
              desktopPaper: { className: classes.datePickerPaper },
            }}
          />

          {/* To Date */}
          <DatePicker
            label='To Date'
            value={toDate}
            minDate={fromDate ?? undefined}
            onChange={(v) => setToDate(v)}
            slotProps={{
              textField: {
                size: 'small',
                className: classes.datePickerField,
              },
              desktopPaper: { className: classes.datePickerPaper },
            }}
          />

          {/* Document Type */}
          <FormControl className={classes.filterFormControl} size='small'>
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
