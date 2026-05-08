import { baseApi } from './baseServices';
import type {
  IConfiguration,
  IConfigurationResponse,
} from '../../entities/interfaces/admin/configuration.interface';

export type { IConfiguration, IConfigurationResponse };

export const configurationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConfiguration: builder.query<IConfigurationResponse, void>({
      query: () => ({
        url: '/api/admin/configuration',
        method: 'GET',
      }),
      transformResponse: (response: IConfigurationResponse) => response,
    }),
  }),
  overrideExisting: false,
});

export const { useGetConfigurationQuery } = configurationApi;
