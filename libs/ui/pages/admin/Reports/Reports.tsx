import { useState, useEffect } from 'react';
import {
  Box,
  DataTable,
  Typography,
  Grid,
  TextField,
  Button,
  PageHeader,
} from '@infygen/component';

import { InputAdornment, Autocomplete } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableChartIcon from '@mui/icons-material/TableChart';
import ImageIcon from '@mui/icons-material/Image';

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
  const [turbine, setTurbine] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);
  const [docType, setDocType] = useState<string | null>(null);

  const [kpiSearch, setKpiSearch] = useState('');
  const [dtSearch, setDtSearch] = useState('');

  const downloadEnabled = !!reportType && !!turbine && !!fromDate && !!toDate && !!docType;

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

        {/* ── Action Buttons & Filters Section ── */}
        <Box className={classes.actionButtonsSection}>
          {/* Report Type Filter */}
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
                placeholder='Select type...'
              />
            )}
          />

          {/* Turbine Filter */}
          <Autocomplete
            className={classes.filterAutocomplete}
            options={TURBINE_LIST}
            value={turbine}
            onChange={(_, v) => setTurbine(v)}
            renderInput={(params) => (
              <TextField {...params} label='Turbine' size='small' placeholder='Select turbine...' />
            )}
          />

          {/* From Date Filter */}
          <DatePicker
            label='From Date'
            value={fromDate}
            onChange={(v) => setFromDate(v)}
            maxDate={toDate || undefined}
            slotProps={{
              textField: {
                size: 'small',
                className: classes.datePickerInput,
              },
            }}
          />

          {/* To Date Filter */}
          <DatePicker
            label='To Date'
            value={toDate}
            onChange={(v) => setToDate(v)}
            minDate={fromDate || undefined}
            slotProps={{
              textField: {
                size: 'small',
                className: classes.datePickerInput,
              },
            }}
          />

          {/* Document Type Filter */}
          <Autocomplete
            className={classes.filterAutocompleteSmall}
            options={DOC_TYPES.map((d) => d.label)}
            value={docType}
            onChange={(_, v) => setDocType(v)}
            renderInput={(params) => (
              <TextField {...params} label='Document Type' size='small' placeholder='Select...' />
            )}
            renderOption={(props, option) => {
              const icon =
                option === 'PDF' ? (
                  <PictureAsPdfIcon sx={{ fontSize: 18, color: '#ef4444' }} />
                ) : option === 'Excel (XLSX)' ? (
                  <TableChartIcon sx={{ fontSize: 18, color: '#10b981' }} />
                ) : (
                  <ImageIcon sx={{ fontSize: 18, color: '#8b5cf6' }} />
                );
              return (
                <li {...props} key={option} className={classes.docOption}>
                  {icon}
                  <Typography sx={{ ml: 1 }}>{option}</Typography>
                </li>
              );
            }}
          />

          {/* Download Button */}
          <Button
            variant='contained'
            startIcon={<DownloadIcon />}
            className={`${classes.actionButtonBase} ${classes.actionButtonAdd}`}
            disabled={!downloadEnabled}
          >
            Download Report
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
              size='small'
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
              size='small'
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
