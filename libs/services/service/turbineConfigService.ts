import { baseApi } from './baseServices';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TurbineType {
  id: string;
  name: string;
  manufacturer: string;
  ratedPower: number;
  rotorDiameter: number | null;
  hubHeight: number | null;
  createdAt: string;
  updatedAt: string;
  _count?: { parameters: number };
}

export interface TurbineParameter {
  id: string;
  turbineTypeId: string;
  key: string;
  label: string;
  category: 'electrical' | 'mechanical' | 'environmental' | 'operational';
  unit: string;
  dataType: 'number' | 'boolean' | 'enum';
  minValue: number | null;
  maxValue: number | null;
  warningMin: number | null;
  warningMax: number | null;
  criticalMin: number | null;
  criticalMax: number | null;
  chartEnabled: boolean;
  dashboardVisible: boolean;
  alertEnabled: boolean;
  alertSeverity: 'warning' | 'critical';
  color: string | null;
  scadaMapping: string | null;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTurbineTypePayload {
  name: string;
  manufacturer: string;
  ratedPower: number;
  rotorDiameter?: number | null;
  hubHeight?: number | null;
}

export interface UpdateTurbineTypePayload {
  id: string;
  name?: string;
  manufacturer?: string;
  ratedPower?: number;
  rotorDiameter?: number | null;
  hubHeight?: number | null;
}

export interface CreateParameterPayload {
  turbineTypeId: string;
  key: string;
  label: string;
  category: string;
  unit: string;
  dataType?: 'number' | 'boolean' | 'enum';
  minValue?: number | null;
  maxValue?: number | null;
  warningMin?: number | null;
  warningMax?: number | null;
  criticalMin?: number | null;
  criticalMax?: number | null;
  chartEnabled?: boolean;
  dashboardVisible?: boolean;
  alertEnabled?: boolean;
  alertSeverity?: 'warning' | 'critical';
  color?: string | null;
  scadaMapping?: string | null;
  displayOrder?: number;
}

export interface UpdateParameterPayload {
  id: string;
  key?: string;
  label?: string;
  category?: string;
  unit?: string;
  dataType?: 'number' | 'boolean' | 'enum';
  minValue?: number | null;
  maxValue?: number | null;
  warningMin?: number | null;
  warningMax?: number | null;
  criticalMin?: number | null;
  criticalMax?: number | null;
  chartEnabled?: boolean;
  dashboardVisible?: boolean;
  alertEnabled?: boolean;
  alertSeverity?: 'warning' | 'critical';
  color?: string | null;
  scadaMapping?: string | null;
  displayOrder?: number;
}

export interface TurbineConfigSchema {
  categories: string[];
  dataTypes: string[];
  alertSeverities: string[];
}

// ─── API ──────────────────────────────────────────────────────────────────────

export const turbineConfigApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Turbine Types
    getTurbineTypes: builder.query<TurbineType[], void>({
      query: () => ({ url: '/api/admin/turbine-config/turbine-types', method: 'GET' }),
      transformResponse: (res: { data: TurbineType[] }) => res.data,
    }),

    getTurbineType: builder.query<TurbineType, string>({
      query: (id) => ({ url: `/api/admin/turbine-config/turbine-types/${id}`, method: 'GET' }),
      transformResponse: (res: { data: TurbineType }) => res.data,
    }),

    createTurbineType: builder.mutation<TurbineType, CreateTurbineTypePayload>({
      query: (body) => ({ url: '/api/admin/turbine-config/turbine-types', method: 'POST', body }),
      transformResponse: (res: { data: TurbineType }) => res.data,
    }),

    updateTurbineType: builder.mutation<TurbineType, UpdateTurbineTypePayload>({
      query: ({ id, ...body }) => ({ url: `/api/admin/turbine-config/turbine-types/${id}`, method: 'PUT', body }),
      transformResponse: (res: { data: TurbineType }) => res.data,
    }),

    deleteTurbineType: builder.mutation<void, string>({
      query: (id) => ({ url: `/api/admin/turbine-config/turbine-types/${id}`, method: 'DELETE' }),
    }),

    // Parameters
    getParameters: builder.query<TurbineParameter[], { typeId: string; category?: string }>({
      query: ({ typeId, category }) => ({
        url: `/api/admin/turbine-config/turbine-types/${typeId}/parameters${category ? `?category=${category}` : ''}`,
        method: 'GET',
      }),
      transformResponse: (res: { data: TurbineParameter[] }) => res.data,
    }),

    createParameter: builder.mutation<TurbineParameter, CreateParameterPayload>({
      query: ({ turbineTypeId, ...body }) => ({
        url: `/api/admin/turbine-config/turbine-types/${turbineTypeId}/parameters`,
        method: 'POST',
        body,
      }),
      transformResponse: (res: { data: TurbineParameter }) => res.data,
    }),

    updateParameter: builder.mutation<TurbineParameter, UpdateParameterPayload>({
      query: ({ id, ...body }) => ({ url: `/api/admin/turbine-config/parameters/${id}`, method: 'PUT', body }),
      transformResponse: (res: { data: TurbineParameter }) => res.data,
    }),

    deleteParameter: builder.mutation<void, string>({
      query: (id) => ({ url: `/api/admin/turbine-config/parameters/${id}`, method: 'DELETE' }),
    }),

    // Schema
    getTurbineConfigSchema: builder.query<TurbineConfigSchema, void>({
      query: () => ({ url: '/api/admin/turbine-config/turbine-config/schema', method: 'GET' }),
      transformResponse: (res: { data: TurbineConfigSchema }) => res.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTurbineTypesQuery,
  useGetTurbineTypeQuery,
  useCreateTurbineTypeMutation,
  useUpdateTurbineTypeMutation,
  useDeleteTurbineTypeMutation,
  useGetParametersQuery,
  useCreateParameterMutation,
  useUpdateParameterMutation,
  useDeleteParameterMutation,
  useGetTurbineConfigSchemaQuery,
} = turbineConfigApi;