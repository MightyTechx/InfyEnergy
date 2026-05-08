export interface IConfiguration {
  id: number;
  systemName: string;
  timezone: string;
  dateFormat: string;
  language: string;
  updatedBy?: number | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IConfigurationResponse {
  message: string;
  data: IConfiguration;
}

export interface IUpdateConfigurationInput {
  systemName?: string;
  timezone?: string;
  dateFormat?: string;
  language?: string;
  updatedBy?: number;
}

export interface IConfigurationGateway {
  get(): Promise<IConfiguration>;
  upsert(data: IUpdateConfigurationInput, updatedBy?: number): Promise<IConfiguration>;
}

export interface IGetConfigurationUseCase {
  execute(): Promise<IConfiguration>;
}

export interface IUpdateConfigurationUseCase {
  execute(input: IUpdateConfigurationInput): Promise<IConfiguration>;
}

export const DEFAULT_CONFIGURATION: IConfiguration = {
  id: 1,
  systemName: 'Infy Energy',
  timezone: 'UTC',
  dateFormat: 'MM/DD/YYYY',
  language: 'en',
  createdAt: new Date(),
  updatedAt: new Date(),
};
