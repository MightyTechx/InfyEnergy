import { useAppRole } from './AppRoleContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const __PARTNER_CONFIG__: any;

/**
 * App-specific metadata configuration type
 */
export interface AppMetadataConfig<T = Record<string, unknown>> {
  admin?: T;
  user?: T;
  consultant?: T;
}

/**
 * Tenant-specific metadata configuration type
 * (For pages like Intro that render outside AppRoleContext)
 */
export interface TenantMetadataConfig<T = Record<string, unknown>> {
  [tenant: string]: T;
}

/**
 * Creates a metadata hook that works across all apps with app-specific and tenant-specific overrides.
 *
 * Priority order:
 * 1. Tenant-specific override (read from __PARTNER_CONFIG__, set at build time by vite)
 *    → Used for public pages like Intro that render before AppRoleContext is available
 * 2. Role-specific override (read from AppRoleContext at runtime)
 *    → Used for authenticated pages inside the app shell
 *
 * @param baseMetadata - Base metadata object
 * @param appConfig - App-specific metadata overrides (by role: admin/user/consultant)
 * @param tenantConfig - Tenant-specific metadata overrides (by partner name)
 *
 * @example
 * const useMetadata = createAppMetadata(
 *   { tenet: 'Infy Energy', title: 'Welcome' },
 *   {
 *     admin: { tenet: 'Admin Dashboard' },
 *     user: { tenet: 'User Dashboard' },
 *   },
 *   {
 *     'wind-tree': { tenet: 'Wind Tree' },
 *   }
 * );
 *
 * // In component:
 * const metadata = useMetadata();
 */
export const createAppMetadata = <T extends Record<string, unknown>>(
  baseMetadata: T,
  appConfig?: AppMetadataConfig<Partial<T>>,
  tenantConfig?: TenantMetadataConfig<Partial<T>>,
) => {
  return (): T => {
    // Start with base metadata
    let merged = { ...baseMetadata } as Record<string, unknown>;

    // 1. Apply tenant-specific override first (higher priority for public pages)
    // Reads PARTNER from __PARTNER_CONFIG__ which is injected at build time by vite
    if (tenantConfig) {
      try {
        const partner = (window as unknown as { __PARTNER_CONFIG__?: { partner?: string } })
          .__PARTNER_CONFIG__?.partner;
        if (partner && partner in tenantConfig) {
          merged = { ...merged, ...tenantConfig[partner] };
        }
      } catch {
        // __PARTNER_CONFIG__ not available at runtime — skip tenant overrides
      }
    }

    // 2. Apply role-specific override (for authenticated pages inside AppRoleContext)
    const appRole = useAppRole();
    const appOverrides = appConfig?.[appRole] || {};
    merged = { ...merged, ...appOverrides };

    return merged as T;
  };
};

/**
 * Simplified hook for metadata that doesn't need tenant overrides
 * Useful for pages that only need role-specific metadata
 *
 * @deprecated Use createAppMetadata with empty tenantConfig instead
 */
export const createAppMetadataSimple = <T extends Record<string, unknown>>(
  baseMetadata: T,
  appConfig?: AppMetadataConfig<Partial<T>>,
) => {
  return (): T => {
    const appRole = useAppRole();
    const overrides = appConfig?.[appRole] || {};
    return { ...baseMetadata, ...overrides } as T;
  };
};
