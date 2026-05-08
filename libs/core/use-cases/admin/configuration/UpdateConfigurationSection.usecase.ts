import { IConfiguration, IConfigurationGateway } from '@infyenergy/interfaces';

export interface IUpdateConfigurationSectionInput {
  section: string;
  value: unknown;
  updatedBy?: number;
}

export interface IUpdateConfigurationSectionUseCase {
  execute(input: IUpdateConfigurationSectionInput): Promise<IConfiguration>;
}

export class UpdateConfigurationSectionUseCase implements IUpdateConfigurationSectionUseCase {
  constructor(private readonly configurationGateway: IConfigurationGateway) {}

  async execute(input: IUpdateConfigurationSectionInput): Promise<IConfiguration> {
    // For now, delegate to upsert - full section update logic can be implemented later
    return this.configurationGateway.upsert({}, input.updatedBy);
  }
}