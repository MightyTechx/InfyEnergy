/**
 * Base metadata for the Intro page — shared across all tenants and roles.
 * Tenant-specific overrides live in metadata.{partner}.ts files.
 * Role-specific overrides are passed via createAppMetadata's appConfig param.
 */
export const getBaseMetadata = () => ({
  tenet: 'Infy Energy',
  title: 'Infy Energy — Wind Service Matrix',
  description:
    'A next-generation centralized platform for real-time wind turbine monitoring, substation control, predictive maintenance, and full grid lifecycle management.',
  keywords: 'SCADA, wind turbine, renewable energy, monitoring, grid control',
});
