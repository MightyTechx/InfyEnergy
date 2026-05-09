import { lazy } from 'react';

export const LazyMenuItems = {
  // Admin pages - available components
  AdminDashboardPage: lazy(() => import('@infyenergy/pages/admin/Dashboard')),
  AdminPeopleManagementPage: lazy(() => import('@infyenergy/pages/admin/People/PeopleManagement')),
  AdminUserDetailPage: lazy(() => import('@infyenergy/pages/admin/People/UserDetail')),
  AdminProfilePage: lazy(() => import('@infyenergy/pages/shared/Profile')),
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
