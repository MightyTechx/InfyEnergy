import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { LazyMenuItems } from './routes';
import { constants } from '@infyenergy/utils';
import { ErrorBoundary, MainContent } from '@infyenergy/component';
import { useAuth } from '@infyenergy/hooks';
import { AppRoleContext } from '@infyenergy/theme';

const {
  // Admin pages
  AdminDashboardPage,
  AdminPeopleRequestsPage,
  AdminPeopleManagementPage,
  AdminProfilePage,

  // Auth pages
  IntroPage,
  SignInPage,
  SignUpPage,
  ForgotPasswordPage,
  NotFoundPage,

  // Service pages
  ServiceCreatePage,
  ServiceCreateManagementPage,
  ServiceCreateManagementFormPage,
  ServiceCreateCustomerFormPage,
  ServiceReviewModalPage,

  // Customer pages
  CustomerLandingPage,
  CustomerAccessPage,
  CustomerDetailPage,
  CustomerManagementPage,

  // Layout
  HeaderPage,
  SideNavPage,
} = LazyMenuItems;

const AppRoutes = () => {
  const { AdminPath, UserPath, ConsultantPath, AuthPath, Path, DefalutPage } = constants;
  const { isAuthenticated, isAdmin, isConsultant } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Not authenticated — show Intro page with Sign In
  if (!isAuthenticated) {
    return (
      <ErrorBoundary>
        <Routes>
          <Route
            path={Path.DEFAULT_PAGE}
            element={<IntroPage onSignIn={() => navigate(AuthPath.SIGNIN)} />}
          />
          <Route path={AuthPath.SIGNIN} element={<SignInPage />} />
          <Route path={AuthPath.SIGNUP} element={<SignUpPage />} />
          <Route path={AuthPath.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          <Route path={Path.NOT_FOUND} element={<Navigate to={AuthPath.SIGNIN} replace />} />
        </Routes>
      </ErrorBoundary>
    );
  }

  // Authenticated — shared layout with available routes
  const contextValue: 'admin' | 'consultant' | 'user' = isAdmin ? 'admin' : isConsultant ? 'consultant' : 'user';

  return (
    <AppRoleContext.Provider value={contextValue}>
      <ErrorBoundary>
        <HeaderPage />
        <SideNavPage />
        <MainContent>
          <Routes>
            {/* Redirect root */}
            <Route
              path={Path.DEFAULT_PAGE}
              element={<Navigate to={AdminPath.DASHBOARD} replace />}
            />

            {/* Admin routes */}
            <Route path={AdminPath.DASHBOARD} element={<AdminDashboardPage />} />
            <Route path={AdminPath.ROLE_REQUESTS} element={<AdminPeopleRequestsPage />} />
            <Route path={AdminPath.PROFILE} element={<AdminProfilePage />} />

            {/* Service routes */}
            <Route path={AdminPath.CREATE_TICKET} element={<ServiceCreatePage />} />
            <Route path={AdminPath.CREATE_MANAGEMENT} element={<ServiceCreateManagementPage />} />
            <Route path={AdminPath.CREATE_MANAGEMENT_TYPE} element={<ServiceCreateManagementFormPage />} />
            <Route path={AdminPath.CREATE_CUSTOMER} element={<ServiceCreatePage />} />
            <Route path={AdminPath.CREATE_CUSTOMER_TYPE} element={<ServiceCreateCustomerFormPage />} />

            {/* Customer routes */}
            <Route path={AdminPath.MOBILITY_ACCESS} element={<CustomerAccessPage />} />
            <Route path={AdminPath.LOGISTICS_ACCESS} element={<CustomerAccessPage />} />
            <Route path={AdminPath.PARCEL_ACCESS} element={<CustomerAccessPage />} />
            <Route path={AdminPath.MOBILITY_MANAGEMENT} element={<CustomerManagementPage />} />
            <Route path={AdminPath.LOGISTICS_MANAGEMENT} element={<CustomerManagementPage />} />
            <Route path={AdminPath.PARCEL_MANAGEMENT} element={<CustomerManagementPage />} />
            <Route path={AdminPath.CUSTOMER_DETAIL} element={<CustomerDetailPage />} />

            {/* User routes */}
            <Route path={UserPath.DASHBOARD} element={<AdminDashboardPage />} />

            {/* Consultant routes */}
            <Route path={ConsultantPath.DASHBOARD} element={<AdminDashboardPage />} />

            <Route path={Path.NOT_FOUND} element={<NotFoundPage />} />
          </Routes>
        </MainContent>
      </ErrorBoundary>
    </AppRoleContext.Provider>
  );
};

const App = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <AppRoutes />
  </LocalizationProvider>
);

export default App;
