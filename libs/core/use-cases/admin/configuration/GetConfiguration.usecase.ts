import {
  IConfiguration,
  IConfigurationGateway,
  IGetConfigurationUseCase,
} from '@infyenergy/interfaces';

export class GetConfigurationUseCase implements IGetConfigurationUseCase {
  constructor(private readonly configurationGateway: IConfigurationGateway) {}

  async execute(): Promise<IConfiguration> {
    return this.configurationGateway.get();
  }
}
