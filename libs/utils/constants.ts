const ADMIN_BASE = '/app/admin';
const USER_BASE = '/app/user';
const CONSULTANT_BASE = '/app/consultant';

const AdminPath = {
  DASHBOARD: `${ADMIN_BASE}/dashboard`,
  ROLE_REQUESTS: `${ADMIN_BASE}/access-requests`,
  ACCESS_MANAGEMENT: `${ADMIN_BASE}/people-management/access`,
  PROFILE: `${ADMIN_BASE}/profile`,
  ANALYTICS: `${ADMIN_BASE}/analytics`,
  USER_DETAIL: `${ADMIN_BASE}/people-management/access/:id`,
};

const UserPath = {
  DASHBOARD: `${USER_BASE}/dashboard`,
};

const ConsultantPath = {
  DASHBOARD: `${CONSULTANT_BASE}/dashboard`,
  ACCESS_MANAGEMENT: `${CONSULTANT_BASE}/people-management/access`,
  PEOPLE_ACCESS: `${CONSULTANT_BASE}/people-management/access`,
  PEOPLE_MANAGEMENT: `${CONSULTANT_BASE}/people-management`,
};

const AuthPath = {
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
};

const DefalutPage = {
  ADMIN_DEFAULT_PAGE: '/app/admin/*',
  USER_DEFAULT_PAGE: '/app/user/*',
  CONSULTANT_DEFAULT_PAGE: '/app/consultant/*',
};

/**
 * Combined Path object.
 * - Admin components should use constants.AdminPath
 * - User components should use constants.UserPath
 * - Auth/shared components should use constants.Path for auth routes
 */
const Path = {
  DEFAULT_PAGE: '/',
  ...AuthPath,
  ...AdminPath,
  NOT_FOUND: '*',
};

export const constants = {
  Path,
  AdminPath,
  UserPath,
  ConsultantPath,
  AuthPath,
  ADMIN_BASE,
  USER_BASE,
  CONSULTANT_BASE,
  DefalutPage,
};
