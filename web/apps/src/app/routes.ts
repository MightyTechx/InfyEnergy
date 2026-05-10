import { lazy } from 'react';

export const LazyMenuItems = {
  // Admin pages - available components
  AdminDashboardPage: lazy(() => import('@infyenergy/pages/admin/Dashboard')),
  AdminTurbineDetailPage: lazy(() =>
    import('@infyenergy/pages/admin/Dashboard').then((m) => ({ default: m.TurbineDetailPage })),
  ),
  AdminPeopleManagementPage: lazy(() => import('@infyenergy/pages/admin/People/PeopleManagement')),
  AdminUserDetailPage: lazy(() => import('@infyenergy/pages/admin/People/UserDetail')),
  AdminProfilePage: lazy(() => import('@infyenergy/pages/shared/Profile')),
  AdminReportsPage: lazy(() => import('@infyenergy/pages/admin/Reports')),
  AdminInventoryPage: lazy(() => import('@infyenergy/pages/admin/Inventory')),
  AdminTechnicalDocumentsPage: lazy(() => import('@infyenergy/pages/admin/TechnicalDocuments')),
  AdminFeatureFlagsPage: lazy(() => import('@infyenergy/pages/admin/FeatureFlags')),
  SettingsPage: lazy(() => import('@infyenergy/pages/shared/Settings')),

  // Auth pages (shared/public)
  SignInPage: lazy(() => import('@infyenergy/pages/shared/SignIn')),
  SignUpPage: lazy(() => import('@infyenergy/pages/shared/SignUp')),
  ForgotPasswordPage: lazy(() => import('@infyenergy/pages/shared/ForgotPassword')),

  // Layout components
  HeaderPage: lazy(() => import('@infyenergy/pages/shared/Header')),
  SideNavPage: lazy(() => import('@infyenergy/pages/shared/SideNav')),

  // NotFound page (shared component)
  NotFoundPage: lazy(() => import('../../../../libs/ui/components/NotFound')),
};
