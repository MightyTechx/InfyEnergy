import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { constants } from '@infyenergy/utils';
import { useAuth, useLoader } from '@infyenergy/hooks';
import { useAuthActionMutation } from '@infyenergy/services';
import { IAuthUser } from '@infyenergy/interfaces';

export interface NotificationItem {
  id: string;
  type: 'role-request' | 'onboarding';
  name: string;
  subtitle: string;
  createdAt?: string;
  navigateTo: string;
  color: string;
  status?: 'under_review' | 'pending' | 'approved' | 'rejected';
  rawUser?: IAuthUser;
}

export const useSharedHeader = () => {
  const navigate = useNavigate();
  const { AdminPath, AuthPath, ConsultantPath } = constants;
  const { user, isAdmin, isConsultant, isConsultantMode, logout } = useAuth();
  const [authAction] = useAuthActionMutation();
  const { show: showLoader, hide: hideLoader } = useLoader();

  const consultantMode = isConsultantMode || isConsultant;

  // Menus
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const items: NotificationItem[] = [];

      // ── Pending role requests (admin only) ─────────────────────────────────
      if (!consultantMode) {
        try {
          const res = await authAction({ action: 'get-pending-role-requests' }).unwrap();
          const users: IAuthUser[] = res.data || [];
          users.forEach((u) => {
            items.push({
              id: `role-${u.id}`,
              type: 'role-request',
              name: u.name || `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Unknown',
              subtitle:
                u.requestedRole === 'admin' ? 'Admin Access Request' : 'Consultant Access Request',
              createdAt: u.createdAt,
              navigateTo: AdminPath.ROLE_REQUESTS,
              color: u.requestedRole === 'admin' ? '#6366f1' : '#0ea5e9',
              rawUser: u,
            });
          });
        } catch {
          /* non-critical */
        }
      }

      setNotifications(items);
    };

    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authAction, consultantMode]);

  const userName =
    user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'User';

  // Menu handlers
  const handleSettingsOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleSettingsClose = () => setAnchorEl(null);
  const handleNotifOpen = (e: React.MouseEvent<HTMLElement>) => setNotifAnchorEl(e.currentTarget);
  const handleNotifClose = () => setNotifAnchorEl(null);

  const handleNotifClick = () => {
    handleNotifClose();
    navigate(AdminPath.ROLE_REQUESTS);
  };

  const handleNotifItemClick = useCallback(
    (item: NotificationItem) => {
      handleNotifClose();
      navigate(item.navigateTo);
    },
    [navigate],
  );

  // Navigation handlers
  const handleLogout = () => {
    handleSettingsClose();
    logout();
    navigate(AuthPath.SIGNIN);
  };

  const handleProfile = () => {
    handleSettingsClose();
    navigate(AdminPath.PROFILE);
  };

  const handleLogoClick = () => {
    if (consultantMode) {
      navigate(ConsultantPath.DASHBOARD);
    } else {
      navigate(AdminPath.DASHBOARD);
    }
  };

  return {
    // State
    user,
    isAdmin,
    isConsultant,
    isConsultantMode,
    consultantMode,
    userName,
    anchorEl,
    notifAnchorEl,
    notifications,
    // Handlers
    handleSettingsOpen,
    handleSettingsClose,
    handleNotifOpen,
    handleNotifClose,
    handleNotifClick,
    handleNotifItemClick,
    handleLogout,
    handleProfile,
    handleLogoClick,
  };
};
