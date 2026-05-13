import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';
import DescriptionIcon from '@mui/icons-material/Description';
import TuneIcon from '@mui/icons-material/Tune';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BuildIcon from '@mui/icons-material/Build';
import { constants } from '@infygen/utils';
import { useGetFeatureFlagsQuery } from '@infygen/services';

export interface MenuItem {
  label: string;
  icon: React.ReactElement;
  path: string;
}

export interface MenuGroup {
  group: string;
  items: MenuItem[];
}

// Reserved flag keys that gate consultant nav visibility
export const NAV_FLAG_KEYS = {
  PEOPLE_MANAGEMENT: 'nav_people_management',
  ANALYTICS: 'nav_analytics',
  FEATURE_FLAGS: 'nav_feature_flags',
  REPORTS: 'nav_reports',
  INVENTORY: 'nav_inventory',
  TECHNICAL_DOCUMENTS: 'nav_technical_documents',
} as const;

// Resolves which gated nav items are currently enabled for consultants
const useNavFeatureFlags = () => {
  const { data: flags = [] } = useGetFeatureFlagsQuery(undefined, {
    pollingInterval: 5000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const isConsultantEnabled = (key: string) => {
    const flag = flags.find((f) => f.key === key);
    return flag?.status === 'Enabled' && flag.roles.includes('Consultant');
  };

  return {
    showPeopleManagement: isConsultantEnabled(NAV_FLAG_KEYS.PEOPLE_MANAGEMENT),
    showAnalytics: isConsultantEnabled(NAV_FLAG_KEYS.ANALYTICS),
    showFeatureFlags: isConsultantEnabled(NAV_FLAG_KEYS.FEATURE_FLAGS),
    showReports: isConsultantEnabled(NAV_FLAG_KEYS.REPORTS),
    showInventory: isConsultantEnabled(NAV_FLAG_KEYS.INVENTORY),
    showTechnicalDocuments: isConsultantEnabled(NAV_FLAG_KEYS.TECHNICAL_DOCUMENTS),
  };
};

export const useAdminMenuItems = (): MenuGroup[] => {
  const { AdminPath } = constants;
  return [
    {
      group: '',
      items: [
        { label: 'Dashboard', icon: <DashboardIcon />, path: AdminPath.DASHBOARD },
        { label: 'People Management', icon: <PeopleIcon />, path: AdminPath.ACCESS_MANAGEMENT },
        { label: 'Generation Reports', icon: <AssessmentIcon />, path: AdminPath.REPORTS },
        { label: 'Inventory Management', icon: <InventoryIcon />, path: AdminPath.INVENTORY },
        {
          label: 'Technical Documents',
          icon: <DescriptionIcon />,
          path: AdminPath.TECHNICAL_DOCUMENTS,
        },
        // { label: 'Analytics', icon: <QueryStatsIcon />, path: AdminPath.ANALYTICS },
        { label: 'Feature Flags', icon: <TuneIcon />, path: AdminPath.FEATURE_FLAGS },
        { label: 'Turbine Config', icon: <BuildIcon />, path: AdminPath.TURBINE_CONFIG },
        { label: 'Configuration', icon: <ManageAccountsIcon />, path: AdminPath.CONFIGURATION },
      ],
    },
  ];
};

export const useConsultantMenuItems = (): MenuGroup[] => {
  const { ConsultantPath, AdminPath } = constants;
  const {
    showPeopleManagement,
    showAnalytics,
    showFeatureFlags,
    showReports,
    showInventory,
    showTechnicalDocuments,
  } = useNavFeatureFlags();

  const items: MenuItem[] = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: ConsultantPath.DASHBOARD },
  ];

  if (showPeopleManagement) {
    items.push({
      label: 'People Management',
      icon: <PeopleIcon />,
      path: ConsultantPath.ACCESS_MANAGEMENT,
    });
  }

  if (showReports) {
    items.push({
      label: 'Generation Reports',
      icon: <AssessmentIcon />,
      path: ConsultantPath.REPORTS,
    });
  }

  if (showInventory) {
    items.push({
      label: 'Inventory Management',
      icon: <InventoryIcon />,
      path: ConsultantPath.INVENTORY,
    });
  }

  if (showTechnicalDocuments) {
    items.push({
      label: 'Technical Documents',
      icon: <DescriptionIcon />,
      path: ConsultantPath.TECHNICAL_DOCUMENTS,
    });
  }

  if (showAnalytics) {
    items.push({ label: 'Analytics', icon: <QueryStatsIcon />, path: ConsultantPath.ANALYTICS });
  }

  if (showFeatureFlags) {
    items.push({
      label: 'Feature Flags',
      icon: <TuneIcon />,
      path: ConsultantPath.FEATURE_FLAGS,
    });
  }

  return [{ group: '', items }];
};
