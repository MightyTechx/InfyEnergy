import dayjs, { Dayjs } from 'dayjs';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export type TurbineStatus = 'running' | 'stopped' | 'maintenance' | 'fault' | 'standby';

export interface TurbineData {
  id: number;
  turbineNo: string;
  status: TurbineStatus;
  time: string;

  activePower: number;
  windSpeed: number;
  breakProgramme: string;
  operatingMode: string;
  todayGeneration: number;
  totalProduction: number;
  totalOperatingHours: number;
  totalProductionHours: number;
  operationHoursToday: number;
}

export interface StatusConfig {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface ChartDataResult {
  categories: string[];
  series: { name: string; data: number[] }[];
  aggregate: 'daily' | 'weekly' | 'monthly';
  totalDays: number;
  totalEnergy: number;
  peakValue: number;
  avgPerDay: number;
}

// ─────────────────────────────────────────────────────────────
// Status Config
// ─────────────────────────────────────────────────────────────

export const STATUS_CONFIG: Record<TurbineStatus, StatusConfig> = {
  running: {
    label: 'Running',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },

  stopped: {
    label: 'Stopped',
    color: '#6b7280',
    bgColor: 'rgba(107, 114, 128, 0.12)',
    borderColor: 'rgba(107, 114, 128, 0.4)',
  },

  maintenance: {
    label: 'Maintenance',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.12)',
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },

  fault: {
    label: 'Fault',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.12)',
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },

  standby: {
    label: 'Standby',
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.12)',
    borderColor: 'rgba(59, 130, 246, 0.4)',
  },
};

// ─────────────────────────────────────────────────────────────
// Turbine List
// ─────────────────────────────────────────────────────────────

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

export const ALL_TURBINE_NOS = TURBINE_LIST;

// ─────────────────────────────────────────────────────────────
// Mock Data
// ─────────────────────────────────────────────────────────────

export const MOCK_TURBINE_DATA: TurbineData[] = [
  {
    id: 1,
    turbineNo: 'T-01',
    status: 'running',
    time: '14:32:15',
    activePower: 1850,
    windSpeed: 8.5,
    breakProgramme: 'Released',
    operatingMode: 'Grid Connected',
    todayGeneration: 4285,
    totalProduction: 12450,
    totalOperatingHours: 14820,
    totalProductionHours: 13540,
    operationHoursToday: 11.2,
  },

  {
    id: 2,
    turbineNo: 'T-02',
    status: 'running',
    time: '14:32:18',
    activePower: 1920,
    windSpeed: 9.2,
    breakProgramme: 'Released',
    operatingMode: 'Grid Connected',
    todayGeneration: 4510,
    totalProduction: 11820,
    totalOperatingHours: 14210,
    totalProductionHours: 13020,
    operationHoursToday: 11.8,
  },

  {
    id: 3,
    turbineNo: 'T-03',
    status: 'maintenance',
    time: '14:30:00',
    activePower: 0,
    windSpeed: 7.1,
    breakProgramme: 'Applied',
    operatingMode: 'Service Mode',
    todayGeneration: 3892,
    totalProduction: 9870,
    totalOperatingHours: 12400,
    totalProductionHours: 11200,
    operationHoursToday: 6.5,
  },

  {
    id: 4,
    turbineNo: 'T-04',
    status: 'running',
    time: '14:32:22',
    activePower: 1650,
    windSpeed: 7.8,
    breakProgramme: 'Released',
    operatingMode: 'Grid Connected',
    todayGeneration: 3950,
    totalProduction: 10920,
    totalOperatingHours: 13650,
    totalProductionHours: 12480,
    operationHoursToday: 10.8,
  },

  {
    id: 5,
    turbineNo: 'T-05',
    status: 'fault',
    time: '14:25:45',
    activePower: 0,
    windSpeed: 6.5,
    breakProgramme: 'Emergency',
    operatingMode: 'Fault Stop',
    todayGeneration: 3125,
    totalProduction: 8540,
    totalOperatingHours: 11200,
    totalProductionHours: 10100,
    operationHoursToday: 4.2,
  },
];

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

export const MIN_DATE = dayjs('2026-01-01');

export const MAX_DATE = dayjs().startOf('day');

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

export const getTurbineById = (id: number): TurbineData | undefined => {
  return MOCK_TURBINE_DATA.find((t) => t.id === id);
};

export const getTurbineStatuses = (turbines: TurbineData[]): Record<string, string> => {
  const result: Record<string, string> = {};

  turbines.forEach((t) => {
    result[t.turbineNo] = t.status;
  });

  return result;
};

export const toDateStr = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(
    2,
    '0',
  )}`;

// ─────────────────────────────────────────────────────────────
// Generate Day Data
// ─────────────────────────────────────────────────────────────

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

  return ALL_TURBINE_NOS.map((turbineNo, i) => {
    const status = turbineStatuses[turbineNo] ?? 'running';

    if (status === 'stopped') {
      return 0;
    }

    const variation = ((seed + i * 97 + i * i * 13) % 1600) - 800;

    return Math.max(0, Math.round((base[status] ?? 3000) + variation));
  });
};

// ─────────────────────────────────────────────────────────────
// Chart Data
// ─────────────────────────────────────────────────────────────

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

  // ─── Daily ─────────────────────────

  if (totalDays <= 31) {
    aggregate = 'daily';

    for (let d = 0; d < totalDays; d++) {
      const date = new Date(fromDate);

      date.setDate(fromDate.getDate() + d);

      categories.push(
        date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
        }),
      );

      const vals = generateDayData(toDateStr(date), turbineStatuses);

      turbineIndices.forEach((ti, i) => {
        buckets[i].push(vals[ti] ?? 0);
      });
    }
  }

  // ─── Weekly ────────────────────────
  else if (totalDays <= 180) {
    aggregate = 'weekly';

    const wStart = new Date(fromDate);

    while (wStart <= toDate) {
      const wEnd = new Date(wStart);

      wEnd.setDate(wStart.getDate() + 6);

      if (wEnd > toDate) {
        wEnd.setTime(toDate.getTime());
      }

      categories.push(
        wStart.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
        }),
      );

      const sums = turbineIndices.map(() => 0);

      const cur = new Date(wStart);

      while (cur <= wEnd) {
        const vals = generateDayData(toDateStr(cur), turbineStatuses);

        turbineIndices.forEach((ti, i) => {
          sums[i] += vals[ti] ?? 0;
        });

        cur.setDate(cur.getDate() + 1);
      }

      sums.forEach((s, i) => {
        buckets[i].push(Math.round(s));
      });

      wStart.setDate(wStart.getDate() + 7);
    }
  }

  // ─── Monthly ───────────────────────
  else {
    aggregate = 'monthly';

    const cur = new Date(fromDate.getFullYear(), fromDate.getMonth(), 1);

    const end = new Date(toDate.getFullYear(), toDate.getMonth(), 1);

    while (cur <= end) {
      const yr = cur.getFullYear();

      const mo = cur.getMonth();

      const dim = new Date(yr, mo + 1, 0).getDate();

      categories.push(
        cur.toLocaleDateString('en-GB', {
          month: 'short',
          year: '2-digit',
        }),
      );

      const sums = turbineIndices.map(() => 0);

      for (let d = 1; d <= dim; d++) {
        const day = new Date(yr, mo, d);

        if (day < fromDate || day > toDate) {
          continue;
        }

        const vals = generateDayData(toDateStr(day), turbineStatuses);

        turbineIndices.forEach((ti, i) => {
          sums[i] += vals[ti] ?? 0;
        });
      }

      sums.forEach((s, i) => {
        buckets[i].push(Math.round(s));
      });

      cur.setMonth(cur.getMonth() + 1);
    }
  }

  const series = turbineNos.map((name, i) => ({
    name,
    data: buckets[i],
  }));

  const allVals = buckets.flat();

  const totalEnergy = allVals.reduce((a, b) => a + b, 0);

  const peakValue = allVals.length ? Math.max(...allVals) : 0;

  const avgPerDay = totalDays > 0 ? Math.round(totalEnergy / totalDays) : 0;

  return {
    categories,
    series,
    aggregate,
    totalDays,
    totalEnergy,
    peakValue,
    avgPerDay,
  };
};
