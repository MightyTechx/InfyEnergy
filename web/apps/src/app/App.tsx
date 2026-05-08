import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GlobalStyles } from '@mui/material';

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

  // Layout
  HeaderPage,
  SideNavPage,
} = LazyMenuItems;

const GlobalCSS = () => (
  <GlobalStyles
    styles={`
      :root {
        --neon-cyan: #00f2ff;
        --neon-cyan-dim: rgba(0,242,255,0.15);
        --pen-blue: #01315b;
        --deep-blue: #020b16;
        --mid-blue: #041e36;
        --border-glow: rgba(0,242,255,0.25);
        --accent-green: #3dfcad;
        --accent-green-dim: rgba(61,252,173,0.15);
        --gold: #f5c518;
        --text-muted: rgba(255,255,255,0.55);
      }
      @keyframes spin { to { transform: rotate(360deg); } }
    `}
  />
);

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
            <Route path={AdminPath.ACCESS_MANAGEMENT} element={<AdminPeopleManagementPage />} />
            <Route path={AdminPath.PROFILE} element={<AdminProfilePage />} />

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
    <GlobalCSS />
    <AppRoutes />
  </LocalizationProvider>
);

export default App;
