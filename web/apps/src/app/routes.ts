import { lazy } from 'react';

export const LazyMenuItems = {
  // Admin pages - available components
  AdminDashboardPage: lazy(() => import('@infygen/pages/admin/Dashboard')),
  AdminTurbineDetailPage: lazy(() =>
    import('@infygen/pages/admin/Dashboard').then((m) => ({ default: m.TurbineDetailPage })),
  ),
  AdminFleetStatusMatrixPage: lazy(() =>
    import('@infygen/pages/admin/Dashboard').then((m) => ({ default: m.FleetStatusMatrixPage })),
  ),
  AdminPeopleManagementPage: lazy(() => import('@infygen/pages/admin/People/PeopleManagement')),
  AdminUserDetailPage: lazy(() => import('@infygen/pages/admin/People/UserDetail')),
  AdminProfilePage: lazy(() => import('@infygen/pages/shared/Profile')),
  AdminReportsPage: lazy(() => import('@infygen/pages/admin/Reports')),
  AdminInventoryPage: lazy(() => import('@infygen/pages/admin/Inventory')),
  AdminTechnicalDocumentsPage: lazy(() => import('@infygen/pages/admin/TechnicalDocuments')),
  AdminFeatureFlagsPage: lazy(() => import('@infygen/pages/admin/FeatureFlags')),
  AdminTurbineConfigPage: lazy(() => import('@infygen/pages/admin/TurbineConfig')),
  SettingsPage: lazy(() => import('@infygen/pages/shared/Settings')),
  HelpSupportPage: lazy(() => import('@infygen/pages/shared/HelpSupport')),
  AdminConfigurationPage: lazy(() => import('@infygen/pages/admin/Configuration')),
  AdminOperationsPage: lazy(() => import('@infygen/pages/admin/Operations')),
  AdminCreateOperationsPage: lazy(
    () => import('@infygen/pages/admin/Operations/components/CreateOperations'),
  ),
  AdminPermitDetailsPage: lazy(() =>
    import('@infygen/pages/admin/Operations/components/PermitDetails').then((m) => ({
      default: m.PermitDetailsPage,
    })),
  ),

  // Auth pages (shared/public)
  SignInPage: lazy(() => import('@infygen/pages/shared/SignIn')),
  SignUpPage: lazy(() => import('@infygen/pages/shared/SignUp')),
  ForgotPasswordPage: lazy(() => import('@infygen/pages/shared/ForgotPassword')),

  // Layout components
  HeaderPage: lazy(() => import('@infygen/pages/shared/Header')),
  SideNavPage: lazy(() => import('@infygen/pages/shared/SideNav')),

  // NotFound page (shared component)
  NotFoundPage: lazy(() => import('../../../../libs/ui/components/NotFound')),
};
