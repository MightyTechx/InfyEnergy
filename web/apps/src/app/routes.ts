import { lazy } from 'react';

// Lazy-loaded pages - only available pages from libs/ui/pages
export const LazyMenuItems = {
  // Admin pages - available components
  AdminDashboardPage: lazy(() => import('@infyenergy/pages/admin/Dashboard')),
  AdminPeopleRequestsPage: lazy(() => import('@infyenergy/pages/admin/People/PeopleRequests')),
  AdminPeopleManagementPage: lazy(() => import('@infyenergy/pages/admin/People/PeopleManagement')),
  AdminProfilePage: lazy(() => import('@infyenergy/pages/shared/Profile')),

  // Auth pages (shared/public)
  IntroPage: lazy(() => import('@infyenergy/pages/shared/Intro')),
  SignInPage: lazy(() => import('@infyenergy/pages/shared/SignIn')),
  SignUpPage: lazy(() => import('@infyenergy/pages/shared/SignUp')),
  ForgotPasswordPage: lazy(() => import('@infyenergy/pages/shared/ForgotPassword')),

  // Layout components
  HeaderPage: lazy(() => import('@infyenergy/pages/shared/Header')),
  SideNavPage: lazy(() => import('@infyenergy/pages/shared/SideNav')),

  // NotFound page (shared component)
  NotFoundPage: lazy(() => import('../../../../libs/ui/components/NotFound')),
};
