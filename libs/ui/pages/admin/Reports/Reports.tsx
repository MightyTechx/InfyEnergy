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
  PageHeader,
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
import AssessmentIcon from '@mui/icons-material/Assessment';

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

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const [reportType, setReportType] = useState<string | null>(null);
  const [turbines, setTurbines] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);
  const [docType, setDocType] = useState('');

  const [kpiSearch, setKpiSearch] = useState('');
  const [dtSearch, setDtSearch] = useState('');

  const downloadEnabled =
    !!reportType && turbines.length > 0 && !!fromDate && !!toDate && !!docType;

  const handleTurbineChange = (e: SelectChangeEvent<typeof turbines>) => {
    const value = typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value;

    if (value.includes('__all__')) {
      setTurbines(turbines.length === TURBINE_LIST.length ? [] : [...TURBINE_LIST]);
    } else {
      setTurbines(value);
    }
  };

  const turbineLabel =
    turbines.length === 0
      ? ''
      : turbines.length === TURBINE_LIST.length
        ? 'All Turbines'
        : turbines.join(', ');

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
        <PageHeader
          title='Generation Reports'
          description='View and manage energy generation reports and analytics across all systems.'
          icon={AssessmentIcon}
          variant='admin'
        />

        {/* FILTER TOOLBAR */}
        <Box className={classes.filterToolbar}>
          <Autocomplete
            className={`${classes.filterAutocomplete} ${classes.filterField}`}
            options={REPORT_TYPES}
            value={reportType}
            onChange={(_, v) => setReportType(v)}
            size='small'
            renderInput={(params) => (
              <TextField {...params} label='Report Type' placeholder='Search report...' />
            )}
          />

          <FormControl className={`${classes.formControl} ${classes.filterField}`} size='small'>
            <Select
              multiple
              value={turbines}
              label='Turbine'
              onChange={handleTurbineChange}
              input={<OutlinedInput label='Turbine' />}
              renderValue={() => turbineLabel}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 280,
                  },
                },
              }}
            >
              <MenuItem value='__all__'>
                <Checkbox
                  checked={turbines.length === TURBINE_LIST.length}
                  indeterminate={turbines.length > 0 && turbines.length < TURBINE_LIST.length}
                  className={classes.filterCheckbox}
                />

                <ListItemText
                  primary='Select All'
                  primaryTypographyProps={{
                    fontWeight: 600,
                  }}
                />
              </MenuItem>

              {TURBINE_LIST.map((t) => (
                <MenuItem key={t} value={t}>
                  <Checkbox checked={turbines.includes(t)} className={classes.filterCheckbox} />

                  <ListItemText primary={t} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DatePicker
            label='From Date'
            value={fromDate}
            onChange={(v) => setFromDate(v)}
            slotProps={{
              textField: {
                size: 'small',
                className: `${classes.datePickerField} ${classes.filterField}`,
                sx: {
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '14px !important',
                  },
                },
              },
            }}
          />

          <DatePicker
            label='To Date'
            value={toDate}
            minDate={fromDate ?? undefined}
            onChange={(v) => setToDate(v)}
            slotProps={{
              textField: {
                size: 'small',
                className: `${classes.datePickerField} ${classes.filterField}`,
                sx: {
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '14px !important',
                  },
                },
              },
            }}
          />

          <FormControl className={`${classes.formControl} ${classes.filterField}`} size='small'>
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

          <Button
            variant='contained'
            disabled={!downloadEnabled}
            startIcon={<DownloadIcon />}
            className={classes.downloadBtn}
          >
            Download
          </Button>
        </Box>

        {/* KPI TABLE */}
        <Box className={classes.tableSection}>
          <Box className={classes.tableSectionHeader}>
            <Box className={classes.tableSectionTitleGroup}>
              <Typography className={classes.tableSectionTitle}>Daily Generation Report</Typography>

              <Typography className={classes.tableSectionDate}>{formatDateTime(now)}</Typography>
            </Box>

            <TextField
              placeholder='Search KPI...'
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

        {/* DOWNTIME TABLE */}
        <Box className={classes.tableSection}>
          <Box className={classes.tableSectionHeader}>
            <Box className={classes.tableSectionTitleGroup}>
              <Typography className={classes.tableSectionTitle}>Detailed Downtime Log</Typography>

              <Typography className={classes.tableSectionDate}>{formatDateTime(now)}</Typography>
            </Box>

            <TextField
              placeholder='Search turbine / status...'
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
