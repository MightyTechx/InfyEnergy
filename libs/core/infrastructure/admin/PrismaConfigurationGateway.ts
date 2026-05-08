import {
  IConfiguration,
  IConfigurationGateway,
  IUpdateConfigurationInput,
  DEFAULT_CONFIGURATION,
} from '@infyenergy/interfaces';

export class PrismaConfigurationGateway implements IConfigurationGateway {
  constructor(private readonly prisma: unknown) {}

  async get(): Promise<IConfiguration> {
    const db = this.prisma as {
      adminConfiguration: {
        findFirst: () => Promise<{
          id: number;
          systemName: string;
          timezone: string;
          dateFormat: string;
          language: string;
          updatedBy: number | null;
          createdAt: Date;
          updatedAt: Date;
        } | null>;
      };
    };

    const row = await db.adminConfiguration.findFirst();
    if (!row) {
      return DEFAULT_CONFIGURATION;
    }

    return {
      id: row.id,
      systemName: row.systemName,
      timezone: row.timezone,
      dateFormat: row.dateFormat,
      language: row.language,
      updatedBy: row.updatedBy,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  async upsert(data: IUpdateConfigurationInput, updatedBy?: number): Promise<IConfiguration> {
    const db = this.prisma as {
      adminConfiguration: {
        findFirst: () => Promise<{ id: number } | null>;
        create: (data: {
          systemName: string;
          timezone: string;
          dateFormat: string;
          language: string;
          updatedBy: number | null;
        }) => Promise<unknown>;
        update: (data: { where: { id: number }; data: object }) => Promise<unknown>;
      };
    };

    const existing = await db.adminConfiguration.findFirst();
    if (!existing) {
      const newConfig: IConfiguration = {
        ...DEFAULT_CONFIGURATION,
        ...data,
        updatedBy: updatedBy ?? null,
        updatedAt: new Date(),
      };
      await db.adminConfiguration.create({
        systemName: newConfig.systemName,
        timezone: newConfig.timezone,
        dateFormat: newConfig.dateFormat,
        language: newConfig.language,
        updatedBy: updatedBy ?? null,
      });
      return newConfig;
    } else {
      const updatedConfig: IConfiguration = {
        ...DEFAULT_CONFIGURATION,
        ...data,
        id: (existing as { id: number }).id,
        updatedBy: updatedBy ?? null,
        updatedAt: new Date(),
      };
      await db.adminConfiguration.update({
        where: { id: (existing as { id: number }).id },
        data: {
          systemName: updatedConfig.systemName,
          timezone: updatedConfig.timezone,
          dateFormat: updatedConfig.dateFormat,
          language: updatedConfig.language,
          updatedBy: updatedBy ?? null,
        },
      });
      return updatedConfig;
    }
  }
}
