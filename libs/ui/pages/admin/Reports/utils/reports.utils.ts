import dayjs, { Dayjs } from 'dayjs';

// ─── Types ──────────────────────────────────────────────────────────────────────────

export interface KpiRow {
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

export interface DowntimeRow {
  id: number;
  turbineNo: string;
  from: string;
  to: string;
  duration: string;
  downtimeType: 'Scheduled' | 'Unscheduled' | 'Force Majeure' | 'Grid Fault' | 'Communication Loss';
  faultStatus: string;
  remarks: string;
}

export type DowntimeType = DowntimeRow['downtimeType'];

export interface DowntimeColorConfig {
  bg: string;
  color: string;
  border: string;
}

export const DOWNTIME_COLORS: Record<DowntimeType, DowntimeColorConfig> = {
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

export type DocType = 'pdf' | 'xlsx' | 'svg';

export interface DocTypeOption {
  value: DocType;
  label: string;
}

// ─── Report Types ───────────────────────────────────────────────────────────────

export const REPORT_TYPES = [
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

// ─── Turbines ─────────────────────────────────────────────────────────────────

export const TURBINE_LIST = [
  'T-01',
  'T-02',
  'T-03',
  'T-04',
  'T-05',
  'T-06',
  'T-07',
  'T-08',
  'T-09',
  'T-10',
];

export const TURBINE_IDS = [
  't01',
  't02',
  't03',
  't04',
  't05',
  't06',
  't07',
  't08',
  't09',
  't10',
] as const;

// ─── Document Types ─────────────────────────────────────────────────────────────

export const DOC_TYPES: DocTypeOption[] = [
  { value: 'pdf', label: 'PDF' },
  { value: 'xlsx', label: 'Excel (XLSX)' },
  { value: 'svg', label: 'SVG' },
];

// ─── KPI Data ─────────────────────────────────────────────────────────────────

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
} as const;

export const getKpiRows = (): KpiRow[] =>
  KPI_LABELS.map((kpi, i) => ({
    id: i + 1,
    kpi,
    ...EMPTY_TURBINES,
    total: '-',
  }));

export const KPI_COLUMNS_IDS = TURBINE_IDS;

// ─── Downtime Data ─────────────────────────────────────────────────────────────

export const getDowntimeRows = (): DowntimeRow[] => [
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

// ─── Chart Data Helpers ────────────────────────────────────────────────────────

export const MIN_DATE = dayjs('2026-01-01');
export const MAX_DATE = dayjs().startOf('day');

export const generateDayData = (
  dateStr: string,
  turbineStatuses: Record<string, string>,
): number[] => {
  const [y, m, d] = dateStr.split('-').map(Number);
  const seed = (y % 100) * 10000 + m * 100 + d;
  const base: Record<string, number> = {
    running: 4200,
    standby: 900,
    maintenance: 1600,
    fault: 300,
    stopped: 0,
  };

  return Object.keys(turbineStatuses).map((_, i) => {
    const status = Object.values(turbineStatuses)[i] as string;
    if (status === 'stopped') return 0;
    const variation = ((seed + i * 97 + i * i * 13) % 1600) - 800;
    return Math.max(0, Math.round((base[status] ?? 3000) + variation));
  });
};

export const toDateStr = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export interface ChartDataResult {
  categories: string[];
  series: { name: string; data: number[] }[];
  aggregate: 'daily' | 'weekly' | 'monthly';
  totalDays: number;
  totalEnergy: number;
  peakValue: number;
  avgPerDay: number;
}

export const getChartData = (
  from: Dayjs,
  to: Dayjs,
  turbineNos: string[],
  allTurbines: string[],
  turbineStatuses: Record<string, string>,
): ChartDataResult => {
  const fromDate = from.toDate();
  const toDate = to.toDate();
  const totalDays = Math.round((toDate.getTime() - fromDate.getTime()) / 86_400_000) + 1;

  const turbineIndices = turbineNos.map((no) => allTurbines.indexOf(no));

  const categories: string[] = [];
  const buckets: number[][] = turbineIndices.map(() => []);
  let aggregate: 'daily' | 'weekly' | 'monthly' = 'daily';

  if (totalDays <= 31) {
    aggregate = 'daily';
    for (let d = 0; d < totalDays; d++) {
      const date = new Date(fromDate);
      date.setDate(fromDate.getDate() + d);
      categories.push(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }));
      const vals = generateDayData(toDateStr(date), turbineStatuses);
      turbineIndices.forEach((ti, i) => buckets[i].push(vals[ti] ?? 0));
    }
  } else if (totalDays <= 180) {
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
        const vals = generateDayData(toDateStr(cur), turbineStatuses);
        turbineIndices.forEach((ti, i) => {
          sums[i] += vals[ti] ?? 0;
        });
        cur.setDate(cur.getDate() + 1);
      }
      sums.forEach((s, i) => buckets[i].push(Math.round(s)));
      wStart.setDate(wStart.getDate() + 7);
    }
  } else {
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
        const vals = generateDayData(toDateStr(day), turbineStatuses);
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

// ─── Color Constants ─────────────────────────────────────────────────────────────

export const TURBINE_COLORS = [
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

export const SELECT_ALL_KEY = '__select_all__';
