import DashboardIcon from '@mui/icons-material/Dashboard';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';
import DescriptionIcon from '@mui/icons-material/Description';
import TuneIcon from '@mui/icons-material/Tune';
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
      group: '',
      items: [
        { label: 'Dashboard', icon: <DashboardIcon />, path: AdminPath.DASHBOARD },
        { label: 'People Management', icon: <VpnKeyIcon />, path: AdminPath.ACCESS_MANAGEMENT },
        { label: 'Generation Reports', icon: <AssessmentIcon />, path: AdminPath.REPORTS },
        { label: 'Inventory Management', icon: <InventoryIcon />, path: AdminPath.INVENTORY },
        {
          label: 'Technical Documents',
          icon: <DescriptionIcon />,
          path: AdminPath.TECHNICAL_DOCUMENTS,
        },
        { label: 'Analytics', icon: <QueryStatsIcon />, path: AdminPath.ANALYTICS },
        { label: 'Feature Flags', icon: <TuneIcon />, path: AdminPath.FEATURE_FLAGS },
      ],
    },
  ];
};

export const useConsultantMenuItems = (): MenuGroup[] => {
  const { ConsultantPath, AdminPath } = constants;
  return [
    {
      group: '',
      items: [
        { label: 'Dashboard', icon: <DashboardIcon />, path: ConsultantPath.DASHBOARD },
        { label: 'Analytics', icon: <QueryStatsIcon />, path: AdminPath.ANALYTICS },
        { label: 'Feature Flags', icon: <TuneIcon />, path: ConsultantPath.FEATURE_FLAGS },
      ],
    },
  ];
};
