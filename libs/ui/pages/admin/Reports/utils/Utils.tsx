import { Column, Typography, Chip } from '@infygen/component';
import { Dayjs } from 'dayjs';
import {
  getKpiRows,
  KPI_COLUMNS_IDS,
  getDowntimeRows,
  KpiRow,
  DowntimeRow,
  DOWNTIME_COLORS,
  getMonthlyKpiRows,
  getScheduledDowntimeRows,
  getUnscheduledDowntimeRows,
  calculateTotalDuration,
  MonthlyKpiRow,
  ScheduledDowntimeRow,
  UnscheduledDowntimeRow,
} from './reports.utils';

export const Utils = () => {
  // ─── Daily Generation Report ──────────────────────────────────────────────────

  const kpiRows = getKpiRows();

  const kpiColumns: Column<KpiRow>[] = [
    {
      id: 'kpi',
      label: 'Key Performance Indicator (KPI)',
      minWidth: 270,
      sortable: false,
      align: 'left',
      format: (v) => (
        <Typography
          sx={{ fontWeight: 600, fontSize: '13px', color: '#1e293b', whiteSpace: 'nowrap' }}
        >
          {String(v)}
        </Typography>
      ),
    },
    ...KPI_COLUMNS_IDS.map((id, i) => ({
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
        <Typography sx={{ fontWeight: 700, fontSize: '13px', color: '#4f46e5' }}>
          {String(v ?? '-')}
        </Typography>
      ),
    },
  ];

  // ─── Detailed Downtime Log ────────────────────────────────────────────────────

  const downtimeRows = getDowntimeRows();

  const downtimeColumns: Column<DowntimeRow>[] = [
    {
      id: 'turbineNo',
      label: 'Turbine No',
      minWidth: 110,
      sortable: true,
      align: 'center',
      format: (v) => (
        <Typography
          sx={{ fontWeight: 700, fontSize: '13px', color: '#4f46e5', letterSpacing: '0.03em' }}
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
        const type = v as DowntimeRow['downtimeType'];
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
              fontSize: '12px',
              height: 22,
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

  // ─── Monthly Report Data ─────────────────────────────────────────────────────

  const getMonthlyReportData = (
    fromDate: Dayjs,
    toDate: Dayjs,
    turbines: string[],
  ): {
    monthlyKpiRows: MonthlyKpiRow[];
    monthlyKpiColumns: Column<MonthlyKpiRow>[];
    scheduledRows: ScheduledDowntimeRow[];
    scheduledColumns: Column<ScheduledDowntimeRow>[];
    unscheduledRows: UnscheduledDowntimeRow[];
    unscheduledColumns: Column<UnscheduledDowntimeRow>[];
    totalScheduledDuration: string;
    totalUnscheduledDuration: string;
  } => {
    const monthlyKpiRows = getMonthlyKpiRows(turbines);

    const monthlyKpiColumns: Column<MonthlyKpiRow>[] = [
      {
        id: 'kpi',
        label: 'Key Performance Indicator (KPI)',
        minWidth: 270,
        sortable: false,
        align: 'left',
        format: (v) => (
          <Typography
            sx={{ fontWeight: 600, fontSize: '13px', color: '#1e293b', whiteSpace: 'nowrap' }}
          >
            {String(v)}
          </Typography>
        ),
      },
      ...KPI_COLUMNS_IDS.map((id, i) => ({
        id,
        label: `T-${String(i + 1).padStart(2, '0')}`,
        minWidth: 72,
        sortable: false,
        align: 'center' as const,
        format: (v: unknown, _row: MonthlyKpiRow) => (
          <Typography sx={{ fontSize: '13px', color: '#334155' }}>{String(v)}</Typography>
        ),
      })),
      {
        id: 'total',
        label: 'Total / Avg',
        minWidth: 100,
        sortable: false,
        align: 'center',
        format: (v: unknown, _row: MonthlyKpiRow) => (
          <Typography sx={{ fontWeight: 700, fontSize: '13px', color: '#4f46e5' }}>
            {String(v ?? '-')}
          </Typography>
        ),
      },
    ];

    const scheduledRows = getScheduledDowntimeRows(fromDate, toDate, turbines);
    const scheduledColumns: Column<ScheduledDowntimeRow>[] = [
      {
        id: 'id',
        label: '#',
        minWidth: 50,
        sortable: false,
        align: 'center',
      },
      {
        id: 'turbineNo',
        label: 'Turbine',
        minWidth: 80,
        sortable: false,
        align: 'center',
        format: (v: unknown, _row: UnscheduledDowntimeRow) => (
          <Typography sx={{ fontWeight: 700, fontSize: '13px', color: '#4f46e5' }}>
            {String(v)}
          </Typography>
        ),
      },
      { id: 'from', label: 'From', minWidth: 150, sortable: false, align: 'center' },
      { id: 'to', label: 'To', minWidth: 150, sortable: false, align: 'center' },
      {
        id: 'status',
        label: 'Status',
        minWidth: 150,
        sortable: false,
        align: 'center',
        format: (v: unknown, _row: UnscheduledDowntimeRow) => (
          <Chip
            label={String(v)}
            size='small'
            sx={{
              background: 'rgba(16,185,129,0.1)',
              color: '#059669',
              border: '1px solid rgba(16,185,129,0.35)',
              fontWeight: 600,
              fontSize: '11px',
              height: 22,
            }}
          />
        ),
      },
      {
        id: 'duration',
        label: 'Duration',
        minWidth: 100,
        sortable: false,
        align: 'center',
        format: (v: unknown, _row: UnscheduledDowntimeRow) => (
          <Typography sx={{ fontWeight: 600, fontSize: '13px', color: '#059669' }}>
            {String(v)}
          </Typography>
        ),
      },
    ];

    const unscheduledRows = getUnscheduledDowntimeRows(fromDate, toDate, turbines);
    const unscheduledColumns: Column<UnscheduledDowntimeRow>[] = [
      {
        id: 'id',
        label: '#',
        minWidth: 50,
        sortable: false,
        align: 'center',
      },
      {
        id: 'turbineNo',
        label: 'Turbine',
        minWidth: 80,
        sortable: false,
        align: 'center',
        format: (v: unknown, _row: UnscheduledDowntimeRow) => (
          <Typography sx={{ fontWeight: 700, fontSize: '13px', color: '#4f46e5' }}>
            {String(v)}
          </Typography>
        ),
      },
      { id: 'from', label: 'From', minWidth: 150, sortable: false, align: 'center' },
      { id: 'to', label: 'To', minWidth: 150, sortable: false, align: 'center' },
      {
        id: 'status',
        label: 'Status',
        minWidth: 220,
        sortable: false,
        align: 'left',
        format: (v: unknown, _row: UnscheduledDowntimeRow) => (
          <Typography sx={{ fontSize: '12px', color: '#dc2626' }}>{String(v)}</Typography>
        ),
      },
      {
        id: 'duration',
        label: 'Duration',
        minWidth: 100,
        sortable: false,
        align: 'center',
        format: (v: unknown, _row: UnscheduledDowntimeRow) => (
          <Typography sx={{ fontWeight: 600, fontSize: '13px', color: '#dc2626' }}>
            {String(v)}
          </Typography>
        ),
      },
    ];

    return {
      monthlyKpiRows,
      monthlyKpiColumns,
      scheduledRows,
      scheduledColumns,
      unscheduledRows,
      unscheduledColumns,
      totalScheduledDuration: calculateTotalDuration(scheduledRows),
      totalUnscheduledDuration: calculateTotalDuration(unscheduledRows),
    };
  };

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

  return {
    kpiRows,
    kpiColumns,
    downtimeRows,
    downtimeColumns,
    formatDateTime,
    getMonthlyReportData,
  };
};
