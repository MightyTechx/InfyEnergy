import DashboardIcon from '@mui/icons-material/Dashboard';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { constants } from '@infyenergy/utils';

export interface MenuItem {
  label: string;
  icon: React.ReactElement;
  path: string;
}

export interface MenuGroup {
  group: string;
  items: MenuItem[];
}

export const useAdminMenuItems = (): MenuGroup[] => {
  const { AdminPath } = constants;
  return [
    {
      group: 'Overview',
      items: [{ label: 'Dashboard', icon: <DashboardIcon />, path: AdminPath.DASHBOARD }],
    },
    {
      group: 'People',
      items: [
        { label: 'People Requests', icon: <AssignmentIndIcon />, path: AdminPath.ROLE_REQUESTS },
        { label: 'People Management', icon: <VpnKeyIcon />, path: AdminPath.ACCESS_MANAGEMENT },
      ],
    },
    {
      group: 'Reports',
      items: [
        { label: 'Analytics', icon: <QueryStatsIcon />, path: AdminPath.ANALYTICS },
      ],
    },
  ];
};

export const useConsultantMenuItems = (): MenuGroup[] => {
  const { ConsultantPath } = constants;
  return [
    {
      group: 'Overview',
      items: [{ label: 'Dashboard', icon: <DashboardIcon />, path: ConsultantPath.DASHBOARD }],
    },
    {
      group: 'People',
      items: [
        { label: 'People Management', icon: <VpnKeyIcon />, path: ConsultantPath.PEOPLE_MANAGEMENT },
      ],
    },
  ];
};
