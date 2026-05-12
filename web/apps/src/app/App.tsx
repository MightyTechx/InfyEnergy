import { Routes, Route, Navigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GlobalStyles } from '@mui/material';

import { globalStyles } from './app.styles';
import { LazyMenuItems } from './routes';
import { constants } from '@infygen/utils';
import { ErrorBoundary, MainContent, Loader } from '@infygen/component';
import { useAuth } from '@infygen/hooks';
import { AppRoleContext } from '@infygen/theme';

const {
  // Admin pages
  AdminDashboardPage,
  AdminTurbineDetailPage,
  AdminPeopleManagementPage,
  AdminUserDetailPage,
  AdminProfilePage,
  AdminReportsPage,
  AdminInventoryPage,
  AdminTechnicalDocumentsPage,
  AdminFeatureFlagsPage,
  AdminConfigurationPage,
  SettingsPage,

  // Auth pages
  SignInPage,
  SignUpPage,
  ForgotPasswordPage,
  NotFoundPage,

  // Layout
  HeaderPage,
  SideNavPage,
} = LazyMenuItems;

const GlobalCSS = () => <GlobalStyles styles={globalStyles} />;

const AppRoutes = () => {
  const { AdminPath, UserPath, ConsultantPath, AuthPath, Path } = constants;
  const { isAuthenticated, isAdmin, isConsultant } = useAuth();

  // Not authenticated — go directly to SignIn page
  if (!isAuthenticated) {
    return (
      <ErrorBoundary>
        <Routes>
          <Route path={AuthPath.SIGNIN} element={<SignInPage />} />
          <Route path={AuthPath.SIGNUP} element={<SignUpPage />} />
          <Route path={AuthPath.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          <Route path={Path.DEFAULT_PAGE} element={<Navigate to={AuthPath.SIGNIN} replace />} />
          <Route path={Path.NOT_FOUND} element={<Navigate to={AuthPath.SIGNIN} replace />} />
        </Routes>
      </ErrorBoundary>
    );
  }

  // Authenticated — shared layout with available routes
  const contextValue: 'admin' | 'consultant' | 'user' = isAdmin
    ? 'admin'
    : isConsultant
      ? 'consultant'
      : 'user';

  return (
    <AppRoleContext.Provider value={contextValue}>
      <Loader globalOverlay />
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
            <Route path={AdminPath.TURBINE_DETAIL} element={<AdminTurbineDetailPage />} />
            <Route path={AdminPath.ACCESS_MANAGEMENT} element={<AdminPeopleManagementPage />} />
            <Route path={AdminPath.USER_DETAIL} element={<AdminUserDetailPage />} />
            <Route path={AdminPath.PROFILE} element={<AdminProfilePage />} />
            <Route path={AdminPath.REPORTS} element={<AdminReportsPage />} />
            <Route path={AdminPath.INVENTORY} element={<AdminInventoryPage />} />
            <Route path={AdminPath.TECHNICAL_DOCUMENTS} element={<AdminTechnicalDocumentsPage />} />
            <Route path={AdminPath.FEATURE_FLAGS} element={<AdminFeatureFlagsPage />} />
            <Route path={AdminPath.CONFIGURATION} element={<AdminConfigurationPage />} />
            <Route path={AdminPath.SETTINGS} element={<SettingsPage />} />

            {/* User routes */}
            <Route path={UserPath.DASHBOARD} element={<AdminDashboardPage />} />

            {/* Consultant routes */}
            <Route path={ConsultantPath.DASHBOARD} element={<AdminDashboardPage />} />
            <Route path={ConsultantPath.SETTINGS} element={<SettingsPage />} />
            <Route
              path={ConsultantPath.ACCESS_MANAGEMENT}
              element={<AdminPeopleManagementPage />}
            />
            <Route path={ConsultantPath.REPORTS} element={<AdminReportsPage />} />
            <Route path={ConsultantPath.INVENTORY} element={<AdminInventoryPage />} />
            <Route
              path={ConsultantPath.TECHNICAL_DOCUMENTS}
              element={<AdminTechnicalDocumentsPage />}
            />
            <Route path={ConsultantPath.ANALYTICS} element={<AdminDashboardPage />} />

            <Route path={Path.NOT_FOUND} element={<NotFoundPage />} />
          </Routes>
        </MainContent>
      </ErrorBoundary>
    </AppRoleContext.Provider>
  );
};

const App = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <GlobalCSS />
    <AppRoutes />
  </LocalizationProvider>
);

export default App;
