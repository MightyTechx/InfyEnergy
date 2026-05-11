/// <reference types="vite/client" />

// baseApi.ts
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

// API URL priority: VITE_API_URL env var (for custom deployments) > window.API_URL (from Render env vars)
const getApiBaseUrl = (): string => {
  // 1. VITE_API_URL — use this if set (e.g. in .env for local dev or production deployments)
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  // 2. window.API_URL — injected by Render with the live backend URL
  if (typeof window !== 'undefined' && (window as any).API_URL) return (window as any).API_URL;
  // 3. Fallback for local dev
  return 'http://localhost:3001';
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: getApiBaseUrl(),
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('infygen_token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const token = localStorage.getItem('infygen_token');
    if (token) {
      localStorage.removeItem('infygen_token');
      localStorage.removeItem('infygen_user');
      window.location.href = '/signin';
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['FeatureFlags'],
  endpoints: () => ({}), // intentionally empty - endpoints added by injectEndpoints
});
