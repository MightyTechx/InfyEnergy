// ─── Types ──────────────────────────────────────────────────────────────────────────

export type InventoryStatus = 'Active' | 'Inactive' | 'Low Stock';

export interface InventoryRow {
  id: number;
  photo: string;
  itemCode: string;
  description: string;
  category: string;
  uom: string;
  quantity: number;
  minimum: number;
  status: InventoryStatus;
  location: string;
  supplier: string;
  lastUpdated: string;
}

export interface StatusConfig {
  bg: string;
  color: string;
}

// ─── Constants ─────────────────────────────────────────────────────────────────

export const CATEGORIES = [
  'Wind Turbine',
  'Solar Panel',
  'Battery',
  'Electrical',
  'Mechanical',
  'Safety',
];

export const LOCATIONS = ['Warehouse A', 'Warehouse B', 'Site Storage', 'Field Inventory'];

export const STATUSES: InventoryStatus[] = ['Active', 'Inactive', 'Low Stock'];

export const STATUS_CONFIG: Record<InventoryStatus, StatusConfig> = {
  Active: { bg: 'rgba(16,185,129,0.1)', color: '#059669' },
  Inactive: { bg: 'rgba(100,116,139,0.1)', color: '#475569' },
  'Low Stock': { bg: 'rgba(245,158,11,0.1)', color: '#d97706' },
};

// ─── Mock Data ─────────────────────────────────────────────────────────────────

export const INVENTORY_DATA: InventoryRow[] = [
  {
    id: 1,
    photo: '',
    itemCode: 'WT-001',
    description: 'Gearbox Oil Filter',
    category: 'Mechanical',
    uom: 'PC',
    quantity: 150,
    minimum: 20,
    status: 'Active',
    location: 'Warehouse A',
    supplier: 'Siemens Energy',
    lastUpdated: '2026-01-15',
  },
  {
    id: 2,
    photo: '',
    itemCode: 'WT-002',
    description: 'Brake Pad Set',
    category: 'Mechanical',
    uom: 'SET',
    quantity: 8,
    minimum: 10,
    status: 'Low Stock',
    location: 'Warehouse B',
    supplier: 'Vestas',
    lastUpdated: '2026-01-14',
  },
  {
    id: 3,
    photo: '',
    itemCode: 'SP-001',
    description: 'Solar Panel 400W',
    category: 'Solar Panel',
    uom: 'PC',
    quantity: 200,
    minimum: 25,
    status: 'Active',
    location: 'Warehouse A',
    supplier: 'Jinko Solar',
    lastUpdated: '2026-01-13',
  },
  {
    id: 4,
    photo: '',
    itemCode: 'BT-001',
    description: 'Lithium Battery Pack',
    category: 'Battery',
    uom: 'PC',
    quantity: 45,
    minimum: 10,
    status: 'Active',
    location: 'Site Storage',
    supplier: 'Tesla Powerwall',
    lastUpdated: '2026-01-12',
  },
  {
    id: 5,
    photo: '',
    itemCode: 'EL-001',
    description: 'Control Cable 50m',
    category: 'Electrical',
    uom: 'ROL',
    quantity: 30,
    minimum: 5,
    status: 'Active',
    location: 'Warehouse B',
    supplier: 'Nexans',
    lastUpdated: '2026-01-11',
  },
  {
    id: 6,
    photo: '',
    itemCode: 'SF-001',
    description: 'Safety Helmet',
    category: 'Safety',
    uom: 'PC',
    quantity: 0,
    minimum: 50,
    status: 'Low Stock',
    location: 'Field Inventory',
    supplier: '3M',
    lastUpdated: '2026-01-10',
  },
  {
    id: 7,
    photo: '',
    itemCode: 'WT-003',
    description: 'Yaw Motor Assembly',
    category: 'Wind Turbine',
    uom: 'PC',
    quantity: 5,
    minimum: 3,
    status: 'Active',
    location: 'Warehouse A',
    supplier: 'ABB',
    lastUpdated: '2026-01-09',
  },
  {
    id: 8,
    photo: '',
    itemCode: 'EL-002',
    description: 'Circuit Breaker 63A',
    category: 'Electrical',
    uom: 'PC',
    quantity: 25,
    minimum: 10,
    status: 'Active',
    location: 'Warehouse B',
    supplier: 'Schneider Electric',
    lastUpdated: '2026-01-08',
  },
  {
    id: 9,
    photo: '',
    itemCode: 'BT-002',
    description: 'UPS Battery Module',
    category: 'Battery',
    uom: 'PC',
    quantity: 12,
    minimum: 5,
    status: 'Active',
    location: 'Site Storage',
    supplier: 'APC',
    lastUpdated: '2026-01-07',
  },
  {
    id: 10,
    photo: '',
    itemCode: 'SF-002',
    description: 'Safety Harness Kit',
    category: 'Safety',
    uom: 'SET',
    quantity: 15,
    minimum: 10,
    status: 'Active',
    location: 'Field Inventory',
    supplier: 'MSA',
    lastUpdated: '2026-01-06',
  },
  {
    id: 11,
    photo: '',
    itemCode: 'WT-004',
    description: 'Pitch Bearing Seal',
    category: 'Wind Turbine',
    uom: 'PC',
    quantity: 3,
    minimum: 5,
    status: 'Low Stock',
    location: 'Warehouse A',
    supplier: 'Bering',
    lastUpdated: '2026-01-05',
  },
  {
    id: 12,
    photo: '',
    itemCode: 'SP-002',
    description: 'Inverter Unit 10kW',
    category: 'Solar Panel',
    uom: 'PC',
    quantity: 18,
    minimum: 5,
    status: 'Active',
    location: 'Warehouse B',
    supplier: 'SMA',
    lastUpdated: '2026-01-04',
  },
  {
    id: 13,
    photo: '',
    itemCode: 'MT-001',
    description: 'Gearbox Oil 5L',
    category: 'Mechanical',
    uom: 'PC',
    quantity: 50,
    minimum: 15,
    status: 'Active',
    location: 'Warehouse A',
    supplier: 'Shell',
    lastUpdated: '2026-01-03',
  },
  {
    id: 14,
    photo: '',
    itemCode: 'EL-003',
    description: 'Power Cable 100m',
    category: 'Electrical',
    uom: 'ROL',
    quantity: 10,
    minimum: 5,
    status: 'Active',
    location: 'Warehouse B',
    supplier: 'Prysmian',
    lastUpdated: '2026-01-02',
  },
  {
    id: 15,
    photo: '',
    itemCode: 'SF-003',
    description: 'Fire Extinguisher',
    category: 'Safety',
    uom: 'PC',
    quantity: 20,
    minimum: 10,
    status: 'Active',
    location: 'Field Inventory',
    supplier: 'Kidde',
    lastUpdated: '2026-01-01',
  },
];

// ─── Helper Functions ────────────────────────────────────────────────────────────

export const getInventoryById = (id: number): InventoryRow | undefined => {
  return INVENTORY_DATA.find((item) => item.id === id);
};

export const getInventoryByCategory = (category: string): InventoryRow[] => {
  return INVENTORY_DATA.filter((item) => item.category === category);
};

export const getInventoryByLocation = (location: string): InventoryRow[] => {
  return INVENTORY_DATA.filter((item) => item.location === location);
};

export const getLowStockItems = (): InventoryRow[] => {
  return INVENTORY_DATA.filter((item) => item.status === 'Low Stock');
};
