import { Dayjs } from 'dayjs';
import {
  MOCK_TURBINE_DATA,
  STATUS_CONFIG,
  TURBINE_LIST,
  MIN_DATE,
  MAX_DATE,
  TURBINE_COLORS,
  SELECT_ALL_KEY,
} from '../../../../utils/mockData';

// Re-export for Dashboard
export { MOCK_TURBINE_DATA };

export type TurbineStatus = 'running' | 'stopped' | 'maintenance' | 'fault' | 'standby';

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
// Turbine List (re-export)
// ─────────────────────────────────────────────────────────────

export const ALL_TURBINE_NOS = TURBINE_LIST;

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

export { MIN_DATE, MAX_DATE, TURBINE_COLORS, SELECT_ALL_KEY };

export const getTurbineStatuses = (turbines: typeof MOCK_TURBINE_DATA): Record<string, string> => {
  const result: Record<string, string> = {};
  turbines.forEach((t: any) => {
    result[t.turbineNo] = t.status;
  });
  return result;
};

// Re-export for convenience
export { STATUS_CONFIG };

// ─────────────────────────────────────────────────────────────
// Chart Data Generation
// ─────────────────────────────────────────────────────────────

const toDateStr = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const generateDayData = (dateStr: string, turbineStatuses: Record<string, string>): number[] => {
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

export const getChartData = (
  from: Dayjs,
  to: Dayjs,
  turbineNos: string[],
  turbineStatuses: Record<string, string>,
): ChartDataResult => {
  const fromDate = from.toDate();
  const toDate = to.toDate();

  const totalDays = Math.round((toDate.getTime() - fromDate.getTime()) / 86_400_000) + 1;

  const turbineIndices = turbineNos.map((no) => ALL_TURBINE_NOS.indexOf(no));

  const categories: string[] = [];
  const buckets: number[][] = turbineIndices.map(() => []);
  let aggregate: 'daily' | 'weekly' | 'monthly' = 'daily';

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
  } else if (totalDays <= 180) {
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
  } else {
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
