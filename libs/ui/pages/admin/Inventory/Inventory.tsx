import { useState } from 'react';
import { Box, Column, DataTable } from '@infyenergy/component';
import {
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Tooltip,
  Chip,
  Autocomplete,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import CallMadeIcon from '@mui/icons-material/CallMade';
import SyncIcon from '@mui/icons-material/Sync';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import { useAdminKeyframes } from 'libs/ui/hooks/useAdminKeyframes';
import { useStyles } from './styles';

// ─── Types ────────────────────────────────────────────────────────────────────

interface InventoryRow {
  id: number;
  photo: string;
  itemCode: string;
  description: string;
  category: string;
  uom: string;
  quantity: number;
  minimum: number;
  status: 'Active' | 'Inactive' | 'Low Stock';
  location: string;
  supplier: string;
  lastUpdated: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = ['Wind Turbine', 'Solar Panel', 'Battery', 'Electrical', 'Mechanical', 'Safety'];
const LOCATIONS = ['Warehouse A', 'Warehouse B', 'Site Storage', 'Field Inventory'];
const STATUSES: InventoryRow['status'][] = ['Active', 'Inactive', 'Low Stock'];

const STATUS_CONFIG: Record<InventoryRow['status'], { bg: string; color: string }> = {
  Active: { bg: 'rgba(16,185,129,0.1)', color: '#059669' },
  Inactive: { bg: 'rgba(100,116,139,0.1)', color: '#475569' },
  'Low Stock': { bg: 'rgba(245,158,11,0.1)', color: '#d97706' },
};

// ─── Sample Data ───────────────────────────────────────────────────────────────

const INVENTORY_DATA: InventoryRow[] = [
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
    minimum: 2,
    status: 'Active',
    location: 'Warehouse A',
    supplier: 'ABB',
    lastUpdated: '2026-01-09',
  },
  {
    id: 8,
    photo: '',
    itemCode: 'SP-002',
    description: 'Inverter Module',
    category: 'Solar Panel',
    uom: 'PC',
    quantity: 12,
    minimum: 5,
    status: 'Active',
    location: 'Warehouse B',
    supplier: 'Huawei',
    lastUpdated: '2026-01-08',
  },
  {
    id: 9,
    photo: '',
    itemCode: 'MT-001',
    description: 'Hydraulic Oil 20L',
    category: 'Mechanical',
    uom: 'DRM',
    quantity: 25,
    minimum: 10,
    status: 'Active',
    location: 'Warehouse A',
    supplier: 'Shell',
    lastUpdated: '2026-01-07',
  },
  {
    id: 10,
    photo: '',
    itemCode: 'BT-002',
    description: 'BMS Controller',
    category: 'Battery',
    uom: 'PC',
    quantity: 18,
    minimum: 5,
    status: 'Inactive',
    location: 'Site Storage',
    supplier: 'BYD',
    lastUpdated: '2026-01-06',
  },
];

// ─── Helper Styles ────────────────────────────────────────────────────────────

const CATEGORY_SX = {
  minWidth: 220,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '&:hover fieldset': { borderColor: '#0d9488' },
    '&.Mui-focused fieldset': { borderColor: '#0d9488', borderWidth: '2px' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#0d9488' },
} as const;

const LOCATION_SX = {
  minWidth: 220,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '&:hover fieldset': { borderColor: '#0d9488' },
    '&.Mui-focused fieldset': { borderColor: '#0d9488', borderWidth: '2px' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#0d9488' },
} as const;

const STATUS_SX = {
  minWidth: 180,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '&:hover fieldset': { borderColor: '#0d9488' },
    '&.Mui-focused fieldset': { borderColor: '#0d9488', borderWidth: '2px' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#0d9488' },
} as const;

const BUTTON_SX = {
  fontSize: '0.8rem',
  fontWeight: 600,
  textTransform: 'none' as const,
  borderRadius: '8px',
  padding: '7px 16px',
  minWidth: 110,
  boxShadow: 'none',
  transition: 'all 0.18s ease',
  '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transform: 'translateY(-1px)' },
  '&:active': { transform: 'translateY(0)' },
} as const;

// ─── Columns ─────────────────────────────────────────────────────────────────

const columns: Column<InventoryRow>[] = [
  {
    id: 'id',
    label: 'S.No',
    minWidth: 70,
    sortable: true,
    align: 'center',
    format: (v) => (
      <Typography sx={{ fontSize: '0.83rem', color: '#64748b' }}>{String(v)}</Typography>
    ),
  },
  {
    id: 'photo',
    label: 'Photo',
    minWidth: 80,
    sortable: false,
    align: 'center',
    format: () => (
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '8px',
          background: 'rgba(13,148,136,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ImageIcon sx={{ fontSize: 20, color: '#0d9488' }} />
      </Box>
    ),
  },
  {
    id: 'itemCode',
    label: 'Item Code',
    minWidth: 100,
    sortable: true,
    align: 'left',
    format: (v) => (
      <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#0d9488' }}>
        {String(v)}
      </Typography>
    ),
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 180,
    sortable: true,
    align: 'left',
    format: (v) => (
      <Typography sx={{ fontSize: '0.85rem', color: '#1e293b' }}>{String(v)}</Typography>
    ),
  },
  {
    id: 'category',
    label: 'Category',
    minWidth: 130,
    sortable: true,
    align: 'left',
    format: (v) => (
      <Typography sx={{ fontSize: '0.83rem', color: '#475569' }}>{String(v)}</Typography>
    ),
  },
  {
    id: 'uom',
    label: 'UoM',
    minWidth: 70,
    sortable: true,
    align: 'center',
    format: (v) => (
      <Typography sx={{ fontSize: '0.83rem', color: '#64748b' }}>{String(v)}</Typography>
    ),
  },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 90,
    sortable: true,
    align: 'center',
    format: (v) => (
      <Typography
        sx={{
          fontSize: '0.85rem',
          fontWeight: 600,
          fontVariantNumeric: 'tabular-nums',
          color: '#1e293b',
        }}
      >
        {Number(v)}
      </Typography>
    ),
  },
  {
    id: 'minimum',
    label: 'Minimum',
    minWidth: 90,
    sortable: true,
    align: 'center',
    format: (v) => (
      <Typography
        sx={{ fontSize: '0.83rem', color: '#64748b', fontVariantNumeric: 'tabular-nums' }}
      >
        {Number(v)}
      </Typography>
    ),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 110,
    sortable: true,
    align: 'center',
    format: (v) => {
      const status = v as InventoryRow['status'];
      const cfg = STATUS_CONFIG[status];
      return (
        <Chip
          label={status}
          size='small'
          sx={{
            background: cfg.bg,
            color: cfg.color,
            fontWeight: 600,
            fontSize: '0.72rem',
            height: 24,
          }}
        />
      );
    },
  },
  {
    id: 'location',
    label: 'Location',
    minWidth: 130,
    sortable: true,
    align: 'left',
    format: (v) => (
      <Typography sx={{ fontSize: '0.83rem', color: '#475569' }}>{String(v)}</Typography>
    ),
  },
  {
    id: 'supplier',
    label: 'Supplier',
    minWidth: 130,
    sortable: true,
    align: 'left',
    format: (v) => (
      <Typography sx={{ fontSize: '0.83rem', color: '#475569' }}>{String(v)}</Typography>
    ),
  },
  {
    id: 'lastUpdated',
    label: 'Last Updated',
    minWidth: 120,
    sortable: true,
    align: 'center',
    format: (v) => (
      <Typography sx={{ fontSize: '0.83rem', color: '#64748b' }}>
        {new Date(String(v)).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })}
      </Typography>
    ),
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 100,
    sortable: false,
    align: 'center',
    format: () => (
      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
        <Tooltip title='Edit'>
          <IconButton
            size='small'
            sx={{ color: '#0d9488', '&:hover': { background: 'rgba(13,148,136,0.1)' } }}
          >
            <EditIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title='Delete'>
          <IconButton
            size='small'
            sx={{ color: '#dc2626', '&:hover': { background: 'rgba(220,38,38,0.1)' } }}
          >
            <DeleteIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const Inventory = () => {
  const { classes } = useStyles();
  const keyframes = useAdminKeyframes();

  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<InventoryRow['status'] | ''>('');
  const [search, setSearch] = useState('');

  const filtered = INVENTORY_DATA.filter((row) => {
    const matchCategory = !categoryFilter || row.category === categoryFilter;
    const matchLocation = !locationFilter || row.location === locationFilter;
    const matchStatus = !statusFilter || row.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      row.itemCode.toLowerCase().includes(q) ||
      row.description.toLowerCase().includes(q) ||
      row.category.toLowerCase().includes(q);
    return matchCategory && matchLocation && matchStatus && matchSearch;
  });

  return (
    <>
      {keyframes}
      <Grid className={classes.container}>
        {/* ── Page Header ── */}
        <Box className={classes.pageHeader}>
          <Box className={classes.headerOrb} />
          <Box className={classes.pageHeaderRow}>
            <Typography variant='h5' className={classes.title}>
              Inventory Management
            </Typography>
          </Box>
          <Typography variant='body2' className={classes.description}>
            Manage stock master, item photos/specifications, and track stock movements (Receive /
            Issue / Adjust).
          </Typography>
        </Box>

        {/* ── Action Buttons ── */}
        <Box className={classes.actionButtonsSection}>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            sx={{
              ...BUTTON_SX,
              background: 'linear-gradient(135deg, #0d9488, #0891b2)',
              '&:hover': {
                background: 'linear-gradient(135deg, #0f766e, #0e7490)',
                boxShadow: '0 4px 14px rgba(13,148,136,0.4)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            Add Item
          </Button>
          <Button
            variant='contained'
            startIcon={<CallReceivedIcon />}
            sx={{
              ...BUTTON_SX,
              background: 'linear-gradient(135deg, #059669, #10b981)',
              '&:hover': {
                background: 'linear-gradient(135deg, #047857, #059669)',
                boxShadow: '0 4px 14px rgba(5,150,105,0.4)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            Receive
          </Button>
          <Button
            variant='contained'
            startIcon={<CallMadeIcon />}
            sx={{
              ...BUTTON_SX,
              background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
              '&:hover': {
                background: 'linear-gradient(135deg, #d97706, #f59e0b)',
                boxShadow: '0 4px 14px rgba(245,158,11,0.4)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            Issue
          </Button>
          <Button
            variant='contained'
            startIcon={<SyncIcon />}
            sx={{
              ...BUTTON_SX,
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              '&:hover': {
                background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
                boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            Adjust
          </Button>
          <Box className={classes.actionButtonsDivider} />
          <Button
            variant='contained'
            startIcon={<FileDownloadIcon />}
            sx={{
              ...BUTTON_SX,
              background: 'linear-gradient(135deg, #475569, #64748b)',
              '&:hover': {
                background: 'linear-gradient(135deg, #334155, #475569)',
                boxShadow: '0 4px 14px rgba(71,85,105,0.35)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            Export
          </Button>
          <Button
            variant='contained'
            startIcon={<FileUploadIcon />}
            sx={{
              ...BUTTON_SX,
              background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
              '&:hover': {
                background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
                boxShadow: '0 4px 14px rgba(139,92,246,0.4)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            Import
          </Button>
        </Box>

        {/* ── Inventory Table ── */}
        <Box className={classes.tableSection}>
          <Box className={classes.tableSectionHeader}>
            <Autocomplete
              sx={CATEGORY_SX}
              options={CATEGORIES}
              value={categoryFilter || null}
              onChange={(_, v) => setCategoryFilter(v ?? '')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Category'
                  size='small'
                  placeholder='Search category…'
                />
              )}
            />

            <Autocomplete
              sx={LOCATION_SX}
              options={LOCATIONS}
              value={locationFilter || null}
              onChange={(_, v) => setLocationFilter(v ?? '')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Location'
                  size='small'
                  placeholder='Search location…'
                />
              )}
            />

            <Autocomplete
              sx={STATUS_SX}
              options={STATUSES}
              value={statusFilter || null}
              onChange={(_, v) => setStatusFilter(v ?? '')}
              renderInput={(params) => (
                <TextField {...params} label='Status' size='small' placeholder='Search status…' />
              )}
            />

            <TextField
              placeholder='Search items…'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={classes.searchField}
              size='small'
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
          <Box className={classes.tableWrapper}>
            <DataTable
              columns={columns}
              data={filtered}
              rowKey='id'
              searchable={false}
              initialRowsPerPage={10}
              elevation={0}
            />
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default Inventory;
