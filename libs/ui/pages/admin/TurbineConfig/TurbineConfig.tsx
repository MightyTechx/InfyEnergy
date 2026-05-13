import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  CircularProgress,
  Grid,
  Card,
  Paper,
  Divider,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch as UISwitch,
  Alert,
} from '@mui/material';
import { Card as DSCard, PageHeader, FormControlLabel } from '@infygen/component';
import MUICard from '@mui/material/Card';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import SettingsIcon from '@mui/icons-material/Settings';
import BuildIcon from '@mui/icons-material/Build';
import StorageIcon from '@mui/icons-material/Storage';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LinkIcon from '@mui/icons-material/Link';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import WarningIcon from '@mui/icons-material/Warning';
import PsychologyIcon from '@mui/icons-material/Psychology';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import HistoryIcon from '@mui/icons-material/History';
import LayersIcon from '@mui/icons-material/Layers';

import {
  useGetTurbineTypesQuery,
  useCreateTurbineTypeMutation,
  useUpdateTurbineTypeMutation,
  useDeleteTurbineTypeMutation,
  useGetParametersQuery,
  useCreateParameterMutation,
  useUpdateParameterMutation,
  useDeleteParameterMutation,
  TurbineType,
  TurbineParameter,
} from '@infygen/services';
import { useStyles } from './styles';

// ─── Tab Configuration ────────────────────────────────────────────────────────

const TABS = [
  { label: 'Turbine Registry', icon: SettingsIcon, key: 'registry' },
  { label: 'Parameter Studio', icon: BuildIcon, key: 'parameters' },
  { label: 'SCADA Mapping', icon: LinkIcon, key: 'scada' },
  { label: 'Alert Intelligence', icon: NotificationsIcon, key: 'alerts' },
  { label: 'Dashboard Composer', icon: DashboardOutlinedIcon, key: 'dashboard' },
  { label: 'Asset Model', icon: AccountTreeIcon, key: 'asset' },
];

const CATEGORIES = [
  { key: 'electrical', label: 'Electrical', color: '#f59e0b', icon: SettingsIcon },
  { key: 'mechanical', label: 'Mechanical', color: '#3b82f6', icon: BuildIcon },
  { key: 'environmental', label: 'Environmental', color: '#10b981', icon: StorageIcon },
  { key: 'operational', label: 'Operational', color: '#8b5cf6', icon: DashboardIcon },
];

// ─── Mock Data for Tabs ────────────────────────────────────────────────────────

const MOCK_Scada_MAPPINGS = [
  {
    parameter: 'Wind Speed',
    scadaKey: 'OPC-UA:turbine.wind.speed',
    protocol: 'OPC-UA',
    status: 'connected',
  },
  { parameter: 'Rotor RPM', scadaKey: 'MQTT:rotor/rpm', protocol: 'MQTT', status: 'connected' },
  { parameter: 'Power Output', scadaKey: 'Modbus:40001', protocol: 'Modbus', status: 'pending' },
  {
    parameter: 'Gearbox Temp',
    scadaKey: 'OPC-UA:turbine.gearbox.temp',
    protocol: 'OPC-UA',
    status: 'connected',
  },
];

const MOCK_ALERT_RULES = [
  {
    id: 1,
    name: 'High Gearbox Temperature',
    condition: 'gearbox_temp > 110',
    severity: 'critical',
    enabled: true,
  },
  {
    id: 2,
    name: 'Low Wind Speed',
    condition: 'wind_speed < 3',
    severity: 'warning',
    enabled: true,
  },
  { id: 3, name: 'High Rotor RPM', condition: 'rpm > 16', severity: 'critical', enabled: false },
];

const MOCK_WIDGET_PRESETS = [
  {
    id: 1,
    name: 'Wind Speed Card',
    type: 'kpi',
    parameters: ['wind_speed'],
    position: { x: 0, y: 0 },
  },
  {
    id: 2,
    name: 'Power Output Graph',
    type: 'line-chart',
    parameters: ['power_output'],
    position: { x: 1, y: 0 },
  },
  {
    id: 3,
    name: 'Turbine Health Gauge',
    type: 'gauge',
    parameters: ['health_score'],
    position: { x: 0, y: 1 },
  },
];

const MOCK_ASSET_COMPONENTS = [
  { name: 'Nacelle', status: 'operational', health: 98, params: 12 },
  { name: 'Blades', status: 'operational', health: 95, params: 8 },
  { name: 'Gearbox', status: 'warning', health: 78, params: 15 },
  { name: 'Generator', status: 'operational', health: 99, params: 10 },
  { name: 'Transformer', status: 'operational', health: 100, params: 6 },
];

// ─── Main Component ────────────────────────────────────────────────────────────

const TurbineConfig = () => {
  const { classes } = useStyles();
  const [activeTab, setActiveTab] = useState(0);

  // Data hooks
  const { data: turbineTypes = [], isLoading: loadingTypes } = useGetTurbineTypesQuery();
  const [createType] = useCreateTurbineTypeMutation();
  const [updateType] = useUpdateTurbineTypeMutation();
  const [deleteType] = useDeleteTurbineTypeMutation();

  // Dialog states
  const [typeDialogOpen, setTypeDialogOpen] = useState(false);
  const [paramDialogOpen, setParamDialogOpen] = useState(false);
  const [editingType, setEditingType] = useState<TurbineType | null>(null);
  const [editingParam, setEditingParam] = useState<TurbineParameter | null>(null);

  // Form states
  const [typeForm, setTypeForm] = useState({
    name: '',
    manufacturer: '',
    ratedPower: '',
    rotorDiameter: '',
    hubHeight: '',
  });

  const [paramForm, setParamForm] = useState({
    key: '',
    label: '',
    category: 'electrical',
    unit: '',
    dataType: 'number',
    minValue: '',
    maxValue: '',
    warningMin: '',
    warningMax: '',
    criticalMin: '',
    criticalMax: '',
    chartEnabled: true,
    dashboardVisible: true,
    alertEnabled: true,
    alertSeverity: 'warning',
    scadaMapping: '',
    color: '#6366f1',
    displayOrder: '0',
  });

  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [paramCategory, setParamCategory] = useState<string>('all');

  const { data: parameters = [], isLoading: loadingParams } = useGetParametersQuery(
    { typeId: selectedTypeId || '' },
    { skip: !selectedTypeId },
  );

  const [createParam] = useCreateParameterMutation();
  const [updateParam] = useUpdateParameterMutation();

  // Stats
  const categoryStats = parameters.reduce(
    (acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Handlers
  const handleOpenTypeDialog = (type?: TurbineType) => {
    if (type) {
      setEditingType(type);
      setTypeForm({
        name: type.name,
        manufacturer: type.manufacturer,
        ratedPower: String(type.ratedPower),
        rotorDiameter: type.rotorDiameter ? String(type.rotorDiameter) : '',
        hubHeight: type.hubHeight ? String(type.hubHeight) : '',
      });
    } else {
      setEditingType(null);
      setTypeForm({ name: '', manufacturer: '', ratedPower: '', rotorDiameter: '', hubHeight: '' });
    }
    setTypeDialogOpen(true);
  };

  const handleSaveType = async () => {
    if (!typeForm.name || !typeForm.manufacturer || !typeForm.ratedPower) return;
    const payload = {
      name: typeForm.name,
      manufacturer: typeForm.manufacturer,
      ratedPower: parseFloat(typeForm.ratedPower),
      rotorDiameter: typeForm.rotorDiameter ? parseFloat(typeForm.rotorDiameter) : undefined,
      hubHeight: typeForm.hubHeight ? parseFloat(typeForm.hubHeight) : undefined,
    };
    if (editingType) {
      await updateType({ id: editingType.id, ...payload });
    } else {
      await createType(payload);
    }
    setTypeDialogOpen(false);
  };

  const handleDeleteType = async (id: string) => {
    if (confirm('Delete this turbine type?')) {
      await deleteType(id);
    }
  };

  const handleOpenParamDialog = (param?: TurbineParameter) => {
    if (param) {
      setEditingParam(param);
      setParamForm({
        key: param.key,
        label: param.label,
        category: param.category,
        unit: param.unit,
        dataType: param.dataType,
        minValue: param.minValue !== null ? String(param.minValue) : '',
        maxValue: param.maxValue !== null ? String(param.maxValue) : '',
        warningMin: param.warningMin !== null ? String(param.warningMin) : '',
        warningMax: param.warningMax !== null ? String(param.warningMax) : '',
        criticalMin: param.criticalMin !== null ? String(param.criticalMin) : '',
        criticalMax: param.criticalMax !== null ? String(param.criticalMax) : '',
        chartEnabled: param.chartEnabled,
        dashboardVisible: param.dashboardVisible,
        alertEnabled: param.alertEnabled,
        alertSeverity: param.alertSeverity,
        scadaMapping: param.scadaMapping || '',
        color: param.color || '#6366f1',
        displayOrder: String(param.displayOrder),
      });
    } else {
      setEditingParam(null);
      setParamForm({
        key: '',
        label: '',
        category: 'electrical',
        unit: '',
        dataType: 'number',
        minValue: '',
        maxValue: '',
        warningMin: '',
        warningMax: '',
        criticalMin: '',
        criticalMax: '',
        chartEnabled: true,
        dashboardVisible: true,
        alertEnabled: true,
        alertSeverity: 'warning',
        scadaMapping: '',
        color: '#6366f1',
        displayOrder: '0',
      });
    }
    setParamDialogOpen(true);
  };

  const handleSaveParam = async () => {
    if (!selectedTypeId || !paramForm.key || !paramForm.label || !paramForm.unit) return;
    const payload = {
      turbineTypeId: selectedTypeId,
      key: paramForm.key,
      label: paramForm.label,
      category: paramForm.category,
      unit: paramForm.unit,
      dataType: paramForm.dataType as 'number' | 'boolean' | 'enum',
      minValue: paramForm.minValue ? parseFloat(paramForm.minValue) : undefined,
      maxValue: paramForm.maxValue ? parseFloat(paramForm.maxValue) : undefined,
      warningMin: paramForm.warningMin ? parseFloat(paramForm.warningMin) : undefined,
      warningMax: paramForm.warningMax ? parseFloat(paramForm.warningMax) : undefined,
      criticalMin: paramForm.criticalMin ? parseFloat(paramForm.criticalMin) : undefined,
      criticalMax: paramForm.criticalMax ? parseFloat(paramForm.criticalMax) : undefined,
      chartEnabled: paramForm.chartEnabled,
      dashboardVisible: paramForm.dashboardVisible,
      alertEnabled: paramForm.alertEnabled,
      alertSeverity: paramForm.alertSeverity as 'warning' | 'critical',
      scadaMapping: paramForm.scadaMapping || undefined,
      color: paramForm.color || undefined,
      displayOrder: parseInt(paramForm.displayOrder) || 0,
    };
    if (editingParam) {
      await updateParam({ id: editingParam.id, ...payload });
    } else {
      await createParam(payload);
    }
    setParamDialogOpen(false);
  };

  const filteredParams = parameters.filter(
    (p) => paramCategory === 'all' || p.category === paramCategory,
  );

  const selectedType = turbineTypes.find((t) => t.id === selectedTypeId);

  // ─── Render Tab Content ────────────────────────────────────────────────────

  const renderRegistryTab = () => (
    <Box>
      {/* Actions Bar */}
      <Box className={classes.tableSectionHeader}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={() => handleOpenTypeDialog()}
            sx={{
              background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
              '&:hover': { background: 'linear-gradient(135deg, #4338ca, #4f46e5)' },
            }}
          >
            Add Turbine Type
          </Button>
          <Button variant='outlined' startIcon={<ContentCopyIcon />} size='small'>
            Clone Configuration
          </Button>
          <Button variant='outlined' startIcon={<UploadIcon />} size='small'>
            Import JSON
          </Button>
          <Button variant='outlined' startIcon={<DownloadIcon />} size='small'>
            Export Template
          </Button>
        </Box>
      </Box>

      {/* Turbine Types Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 2,
          mt: 2,
        }}
      >
        {turbineTypes.map((type) => (
          <MUICard
            key={type.id}
            variant='outlined'
            sx={{
              cursor: 'pointer',
              '&:hover': { borderColor: '#4f46e5', boxShadow: '0 4px 12px rgba(99,102,241,0.15)' },
            }}
            onClick={() => {
              setSelectedTypeId(type.id);
              setActiveTab(1);
            }}
          >
            <Box sx={{ p: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: 2,
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#4f46e5' }}>
                    {type.name}
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                    {type.manufacturer}
                  </Typography>
                </Box>
                <Chip
                  label={`${type.ratedPower} kW`}
                  size='small'
                  sx={{ background: 'rgba(99,102,241,0.1)', color: '#4f46e5' }}
                />
              </Box>
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '1.2rem' }}>
                      {type._count?.parameters || 0}
                    </Typography>
                    <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                      Parameters
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '1.2rem' }}>0</Typography>
                    <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                      Active
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <IconButton
                    size='small'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenTypeDialog(type);
                    }}
                  >
                    <EditIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                  <IconButton
                    size='small'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteType(type.id);
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: 16, color: '#dc2626' }} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </MUICard>
        ))}
        {turbineTypes.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center', gridColumn: '1 / -1' }}>
            <SettingsIcon sx={{ fontSize: 48, color: '#94a3b8', mb: 2 }} />
            <Typography>
              No turbine types configured. Add your first turbine type to get started.
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );

  const renderParameterStudioTab = () => (
    <Box>
      {/* Type & Category Selector */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <FormControl size='small' sx={{ minWidth: 280 }}>
            <InputLabel>Select Turbine Type</InputLabel>
            <Select
              value={selectedTypeId || ''}
              label='Select Turbine Type'
              onChange={(e) => setSelectedTypeId(e.target.value || null)}
            >
              {turbineTypes.map((t) => (
                <MenuItem key={t.id} value={t.id}>
                  <Typography sx={{ fontWeight: 600, color: '#4f46e5' }}>{t.name}</Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.8rem', ml: 1 }}>
                    by {t.manufacturer}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size='small' sx={{ minWidth: 180 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={paramCategory}
              label='Category'
              onChange={(e) => setParamCategory(e.target.value)}
            >
              <MenuItem value='all'>All Categories</MenuItem>
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat.key} value={cat.key}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ color: cat.color }}>
                      <cat.icon sx={{ fontSize: 16 }} />
                    </Box>
                    <Typography sx={{ textTransform: 'capitalize' }}>{cat.label}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            disabled={!selectedTypeId}
            onClick={() => handleOpenParamDialog()}
            sx={{ ml: 'auto', background: 'linear-gradient(135deg, #4f46e5, #6366f1)' }}
          >
            Add Parameter
          </Button>
        </Box>
      </Paper>

      {/* Parameters Table */}
      {selectedTypeId ? (
        <MUICard variant='outlined'>
          <Box sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 600, color: '#4f46e5', mb: 2 }}>
              {selectedType?.name || 'Parameters'} — {filteredParams.length} parameters
            </Typography>
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow sx={{ background: 'rgba(99,102,241,0.05)' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Parameter</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Key</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Unit</TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align='center'>
                      Alerts
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align='center'>
                      Dashboard
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align='center'>
                      Chart
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>SCADA Mapping</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredParams.map((param) => (
                    <TableRow key={param.id} hover>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>{param.label}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#6366f1' }}
                        >
                          {param.key}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size='small'
                          label={param.category}
                          sx={{
                            background: `${CATEGORIES.find((c) => c.key === param.category)?.color}20`,
                            color: CATEGORIES.find((c) => c.key === param.category)?.color,
                            textTransform: 'capitalize',
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontSize: '0.85rem' }}>{param.unit}</Typography>
                      </TableCell>
                      <TableCell align='center'>
                        {param.alertEnabled ? (
                          <Tooltip title={param.alertSeverity}>
                            <WarningIcon
                              sx={{
                                color: param.alertSeverity === 'critical' ? '#dc2626' : '#f59e0b',
                                fontSize: 20,
                              }}
                            />
                          </Tooltip>
                        ) : (
                          <Typography sx={{ color: 'text.disabled', fontSize: '0.8rem' }}>
                            —
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align='center'>
                        {param.dashboardVisible ? (
                          <VisibilityIcon sx={{ color: '#10b981', fontSize: 20 }} />
                        ) : (
                          <VisibilityOffIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                        )}
                      </TableCell>
                      <TableCell align='center'>
                        {param.chartEnabled ? (
                          <ShowChartIcon sx={{ color: '#3b82f6', fontSize: 20 }} />
                        ) : (
                          <Typography sx={{ color: 'text.disabled', fontSize: '0.8rem' }}>
                            —
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        {param.scadaMapping ? (
                          <Typography
                            sx={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#059669' }}
                          >
                            {param.scadaMapping}
                          </Typography>
                        ) : (
                          <Typography sx={{ color: 'text.disabled', fontSize: '0.8rem' }}>
                            —
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton size='small' onClick={() => handleOpenParamDialog(param)}>
                          <EditIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </MUICard>
      ) : (
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <BuildIcon sx={{ fontSize: 48, color: '#94a3b8', mb: 2 }} />
          <Typography>Select a turbine type above to manage its parameters</Typography>
        </Paper>
      )}
    </Box>
  );

  const renderScadaMappingTab = () => (
    <Box>
      <Alert severity='info' sx={{ mb: 3 }}>
        Configure SCADA protocol mappings for telemetry integration. These mappings connect your
        parameters to real-time data sources.
      </Alert>
      <MUICard variant='outlined'>
        <Box sx={{ p: 2 }}>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
          >
            <Typography sx={{ fontWeight: 600 }}>Live SCADA Mappings</Typography>
            <Button variant='contained' startIcon={<AddIcon />} size='small'>
              Add Mapping
            </Button>
          </Box>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow sx={{ background: 'rgba(99,102,241,0.05)' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Parameter</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>SCADA Key</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Protocol</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_Scada_MAPPINGS.map((mapping, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell sx={{ fontWeight: 500 }}>{mapping.parameter}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          fontFamily: 'monospace',
                          fontSize: '0.8rem',
                          background: 'rgba(16,185,129,0.1)',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                        }}
                      >
                        {mapping.scadaKey}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={mapping.protocol}
                        size='small'
                        sx={{ background: 'rgba(99,102,241,0.1)', color: '#4f46e5' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={mapping.status}
                        size='small'
                        sx={{
                          background:
                            mapping.status === 'connected'
                              ? 'rgba(16,185,129,0.1)'
                              : 'rgba(245,158,11,0.1)',
                          color: mapping.status === 'connected' ? '#059669' : '#d97706',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size='small'>
                        <EditIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </MUICard>
    </Box>
  );

  const renderAlertIntelligenceTab = () => (
    <Box>
      <Alert severity='warning' sx={{ mb: 3 }}>
        Configure intelligent alert rules with conditional logic. Rules can trigger based on
        multiple parameter conditions.
      </Alert>
      <MUICard variant='outlined'>
        <Box sx={{ p: 2 }}>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
          >
            <Typography sx={{ fontWeight: 600 }}>Alert Rules Engine</Typography>
            <Button variant='contained' startIcon={<AddIcon />} size='small'>
              Create Rule
            </Button>
          </Box>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow sx={{ background: 'rgba(99,102,241,0.05)' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Rule Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Condition</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Severity</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_ALERT_RULES.map((rule) => (
                  <TableRow key={rule.id} hover>
                    <TableCell sx={{ fontWeight: 500 }}>{rule.name}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          fontFamily: 'monospace',
                          fontSize: '0.8rem',
                          background: 'rgba(0,0,0,0.05)',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                        }}
                      >
                        IF {rule.condition}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={rule.severity}
                        size='small'
                        sx={{
                          background:
                            rule.severity === 'critical'
                              ? 'rgba(239,68,68,0.1)'
                              : 'rgba(245,158,11,0.1)',
                          color: rule.severity === 'critical' ? '#dc2626' : '#d97706',
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <UISwitch checked={rule.enabled} size='small' />
                    </TableCell>
                    <TableCell>
                      <IconButton size='small'>
                        <EditIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </MUICard>
    </Box>
  );

  const renderDashboardComposerTab = () => (
    <Box>
      <Alert severity='info' sx={{ mb: 3 }}>
        Drag and drop widgets to compose dashboard layouts. Widgets automatically read from
        parameter configuration.
      </Alert>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: 2,
        }}
      >
        {MOCK_WIDGET_PRESETS.map((widget) => (
          <MUICard
            key={widget.id}
            variant='outlined'
            sx={{ cursor: 'move', '&:hover': { borderColor: '#4f46e5' } }}
          >
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <DashboardOutlinedIcon sx={{ fontSize: 32, color: '#4f46e5', mb: 1 }} />
              <Typography sx={{ fontWeight: 600 }}>{widget.name}</Typography>
              <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                Type: {widget.type} • {widget.parameters.length} params
              </Typography>
            </Box>
          </MUICard>
        ))}
        <MUICard
          variant='outlined'
          sx={{
            cursor: 'pointer',
            border: '2px dashed',
            '&:hover': { borderColor: '#4f46e5', borderStyle: 'solid' },
          }}
        >
          <Box
            sx={{
              p: 2,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 100,
            }}
          >
            <AddIcon sx={{ fontSize: 32, color: '#94a3b8', mb: 1 }} />
            <Typography sx={{ fontWeight: 500 }}>Add Widget</Typography>
          </Box>
        </MUICard>
      </Box>
    </Box>
  );

  const renderAssetModelTab = () => (
    <Box>
      <Alert severity='info' sx={{ mb: 3 }}>
        Visual asset model showing turbine components with real-time health indicators.
      </Alert>
      <MUICard variant='outlined'>
        <Box sx={{ p: 3 }}>
          {/* Turbine SVG Representation */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Box sx={{ position: 'relative', width: 300, height: 200 }}>
              {/* Tower */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 20,
                  height: 120,
                  background: 'linear-gradient(180deg, #64748b, #475569)',
                  borderRadius: 4,
                }}
              />
              {/* Nacelle */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 120,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 40,
                  height: 25,
                  background: '#4f46e5',
                  borderRadius: 4,
                }}
              />
              {/* Rotor */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 130,
                  left: 'calc(50% + 20px)',
                  width: 80,
                  height: 8,
                  background: '#94a3b8',
                  borderRadius: 4,
                }}
              />
            </Box>
          </Box>

          {/* Component Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 2,
            }}
          >
            {MOCK_ASSET_COMPONENTS.map((component) => (
              <Box
                key={component.name}
                sx={{
                  p: 2,
                  border: '1px solid',
                  borderColor: component.status === 'warning' ? '#f59e0b' : 'divider',
                  borderRadius: 2,
                  background:
                    component.status === 'warning' ? 'rgba(245,158,11,0.05)' : 'transparent',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ fontWeight: 600 }}>{component.name}</Typography>
                  <Chip
                    label={component.status}
                    size='small'
                    sx={{
                      background:
                        component.status === 'operational'
                          ? 'rgba(16,185,129,0.1)'
                          : 'rgba(245,158,11,0.1)',
                      color: component.status === 'operational' ? '#059669' : '#d97706',
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                    Health
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color:
                        component.health > 90
                          ? '#10b981'
                          : component.health > 70
                            ? '#f59e0b'
                            : '#dc2626',
                    }}
                  >
                    {component.health}%
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                  {component.params} parameters
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </MUICard>
    </Box>
  );

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <Box className={classes.container}>
      <PageHeader
        title='Turbine Configuration'
        description='Enterprise-grade SCADA schema editor — Configure turbine types, parameters, SCADA mappings, alerts, and dashboard widgets dynamically.'
        icon={SettingsIcon}
        variant='admin'
      />

      {/* Stats Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 2,
          mb: 3,
        }}
      >
        <DSCard
          cardVariant='getstatus'
          value={turbineTypes.length}
          label='Turbine Types'
          color='#4f46e5'
          colorIndex={0}
          icon={SettingsIcon}
        />
        <DSCard
          cardVariant='getstatus'
          value={parameters.length}
          label='Total Parameters'
          color='#10b981'
          colorIndex={1}
          icon={BuildIcon}
        />
        {CATEGORIES.map((cat, idx) => (
          <DSCard
            key={cat.key}
            cardVariant='getstatus'
            value={categoryStats[cat.key] || 0}
            label={cat.label}
            color={cat.color}
            colorIndex={idx + 2}
            icon={cat.icon}
          />
        ))}
      </Box>

      {/* Tab Navigation */}
      <Paper sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', overflowX: 'auto' }}>
            {TABS.map((tab, idx) => (
              <Button
                key={tab.key}
                variant={activeTab === idx ? 'contained' : 'text'}
                startIcon={<tab.icon sx={{ fontSize: 18 }} />}
                onClick={() => setActiveTab(idx)}
                sx={{
                  borderRadius: 0,
                  px: 3,
                  py: 1.5,
                  whiteSpace: 'nowrap',
                  background:
                    activeTab === idx ? 'linear-gradient(135deg, #4f46e5, #6366f1)' : 'transparent',
                  color: activeTab === idx ? '#fff' : 'text.secondary',
                  '&:hover': {
                    background:
                      activeTab === idx
                        ? 'linear-gradient(135deg, #4338ca, #4f46e5)'
                        : 'rgba(99,102,241,0.08)',
                  },
                }}
              >
                {tab.label}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Tab Content */}
        <Box sx={{ p: 3 }}>
          {activeTab === 0 && renderRegistryTab()}
          {activeTab === 1 && renderParameterStudioTab()}
          {activeTab === 2 && renderScadaMappingTab()}
          {activeTab === 3 && renderAlertIntelligenceTab()}
          {activeTab === 4 && renderDashboardComposerTab()}
          {activeTab === 5 && renderAssetModelTab()}
        </Box>
      </Paper>

      {/* ── Turbine Type Dialog ── */}
      <Dialog
        open={typeDialogOpen}
        onClose={() => setTypeDialogOpen(false)}
        maxWidth='sm'
        fullWidth
      >
        <Box className={classes.modalHero}>
          <Box className={classes.modalIconBox}>
            <SettingsIcon sx={{ fontSize: 26, color: '#fff' }} />
          </Box>
          <Box className={classes.modalTitleBox}>
            <Typography className={classes.modalTitle}>
              {editingType ? 'Edit Turbine Type' : 'Add Turbine Type'}
            </Typography>
            <Typography className={classes.modalSubtitle}>
              Define turbine specifications and configuration
            </Typography>
          </Box>
          <Button
            onClick={() => setTypeDialogOpen(false)}
            className={classes.modalCloseBtn}
            size='small'
          >
            <Typography sx={{ color: '#fff' }}>✕</Typography>
          </Button>
        </Box>
        <DialogContent className={classes.dialogContent}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                label='Type Name *'
                value={typeForm.name}
                onChange={(e) => setTypeForm((p) => ({ ...p, name: e.target.value }))}
                fullWidth
                size='small'
                placeholder='e.g., Vestas V150'
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label='Manufacturer *'
                value={typeForm.manufacturer}
                onChange={(e) => setTypeForm((p) => ({ ...p, manufacturer: e.target.value }))}
                fullWidth
                size='small'
                placeholder='e.g., Vestas'
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label='Rated Power (kW) *'
                type='number'
                value={typeForm.ratedPower}
                onChange={(e) => setTypeForm((p) => ({ ...p, ratedPower: e.target.value }))}
                fullWidth
                size='small'
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label='Rotor Diameter (m)'
                type='number'
                value={typeForm.rotorDiameter}
                onChange={(e) => setTypeForm((p) => ({ ...p, rotorDiameter: e.target.value }))}
                fullWidth
                size='small'
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label='Hub Height (m)'
                type='number'
                value={typeForm.hubHeight}
                onChange={(e) => setTypeForm((p) => ({ ...p, hubHeight: e.target.value }))}
                fullWidth
                size='small'
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={() => setTypeDialogOpen(false)} className={classes.cancelButton}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveType}
            disabled={!typeForm.name || !typeForm.manufacturer || !typeForm.ratedPower}
            className={classes.submitButton}
            startIcon={<AddIcon />}
          >
            {editingType ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Parameter Dialog ── */}
      <Dialog
        open={paramDialogOpen}
        onClose={() => setParamDialogOpen(false)}
        maxWidth='md'
        fullWidth
      >
        <Box
          className={classes.modalHero}
          sx={{
            background:
              'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #1d4ed8 70%, #3b82f6 100%)',
          }}
        >
          <Box
            className={classes.modalIconBox}
            sx={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}
          >
            <BuildIcon sx={{ fontSize: 26, color: '#fff' }} />
          </Box>
          <Box className={classes.modalTitleBox}>
            <Typography className={classes.modalTitle}>
              {editingParam ? 'Edit Parameter' : 'Add Parameter'}
            </Typography>
            <Typography className={classes.modalSubtitle}>
              SCADA schema configuration for parameter
            </Typography>
          </Box>
          <Button
            onClick={() => setParamDialogOpen(false)}
            className={classes.modalCloseBtn}
            size='small'
          >
            <Typography sx={{ color: '#fff' }}>✕</Typography>
          </Button>
        </Box>
        <DialogContent className={classes.dialogContent} sx={{ maxHeight: '70vh' }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#4f46e5',
                  textTransform: 'uppercase',
                }}
              >
                Core Identification
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label='Parameter Key *'
                value={paramForm.key}
                onChange={(e) => setParamForm((p) => ({ ...p, key: e.target.value }))}
                fullWidth
                size='small'
                helperText='Unique identifier (no spaces)'
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label='Display Label *'
                value={paramForm.label}
                onChange={(e) => setParamForm((p) => ({ ...p, label: e.target.value }))}
                fullWidth
                size='small'
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label='Unit *'
                value={paramForm.unit}
                onChange={(e) => setParamForm((p) => ({ ...p, unit: e.target.value }))}
                fullWidth
                size='small'
                placeholder='e.g., m/s'
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size='small'>
                <InputLabel>Category</InputLabel>
                <Select
                  value={paramForm.category}
                  label='Category'
                  onChange={(e) => setParamForm((p) => ({ ...p, category: e.target.value }))}
                >
                  {CATEGORIES.map((cat) => (
                    <MenuItem key={cat.key} value={cat.key}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ color: cat.color }}>
                          <cat.icon sx={{ fontSize: 16 }} />
                        </Box>
                        <Typography sx={{ textTransform: 'capitalize' }}>{cat.label}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size='small'>
                <InputLabel>Data Type</InputLabel>
                <Select
                  value={paramForm.dataType}
                  label='Data Type'
                  onChange={(e) => setParamForm((p) => ({ ...p, dataType: e.target.value }))}
                >
                  <MenuItem value='number'>Number</MenuItem>
                  <MenuItem value='boolean'>Boolean</MenuItem>
                  <MenuItem value='enum'>Enum</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={12}>
              <Divider sx={{ my: 1 }} />
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981' }}>
                Thresholds
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                label='Min Value'
                type='number'
                value={paramForm.minValue}
                onChange={(e) => setParamForm((p) => ({ ...p, minValue: e.target.value }))}
                fullWidth
                size='small'
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                label='Max Value'
                type='number'
                value={paramForm.maxValue}
                onChange={(e) => setParamForm((p) => ({ ...p, maxValue: e.target.value }))}
                fullWidth
                size='small'
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                label='Warning Min'
                type='number'
                value={paramForm.warningMin}
                onChange={(e) => setParamForm((p) => ({ ...p, warningMin: e.target.value }))}
                fullWidth
                size='small'
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                label='Warning Max'
                type='number'
                value={paramForm.warningMax}
                onChange={(e) => setParamForm((p) => ({ ...p, warningMax: e.target.value }))}
                fullWidth
                size='small'
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                label='Critical Min'
                type='number'
                value={paramForm.criticalMin}
                onChange={(e) => setParamForm((p) => ({ ...p, criticalMin: e.target.value }))}
                fullWidth
                size='small'
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                label='Critical Max'
                type='number'
                value={paramForm.criticalMax}
                onChange={(e) => setParamForm((p) => ({ ...p, criticalMax: e.target.value }))}
                fullWidth
                size='small'
              />
            </Grid>

            <Grid size={12}>
              <Divider sx={{ my: 1 }} />
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#8b5cf6' }}>
                Display & Alerts
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label='SCADA Mapping'
                value={paramForm.scadaMapping}
                onChange={(e) => setParamForm((p) => ({ ...p, scadaMapping: e.target.value }))}
                fullWidth
                size='small'
                helperText='e.g., OPC-UA:turbine.wind.speed'
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                label='Color'
                type='color'
                value={paramForm.color || '#6366f1'}
                onChange={(e) => setParamForm((p) => ({ ...p, color: e.target.value }))}
                fullWidth
                size='small'
                sx={{ '& input': { height: 40 } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                label='Display Order'
                type='number'
                value={paramForm.displayOrder}
                onChange={(e) => setParamForm((p) => ({ ...p, displayOrder: e.target.value }))}
                fullWidth
                size='small'
              />
            </Grid>

            <Grid size={12}>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <FormControlLabel
                  control={
                    <UISwitch
                      checked={paramForm.chartEnabled}
                      onChange={(e) =>
                        setParamForm((p) => ({ ...p, chartEnabled: e.target.checked }))
                      }
                    />
                  }
                  label='Chart Enabled'
                />
                <FormControlLabel
                  control={
                    <UISwitch
                      checked={paramForm.dashboardVisible}
                      onChange={(e) =>
                        setParamForm((p) => ({ ...p, dashboardVisible: e.target.checked }))
                      }
                    />
                  }
                  label='Dashboard Visible'
                />
                <FormControlLabel
                  control={
                    <UISwitch
                      checked={paramForm.alertEnabled}
                      onChange={(e) =>
                        setParamForm((p) => ({ ...p, alertEnabled: e.target.checked }))
                      }
                    />
                  }
                  label='Alert Enabled'
                />
              </Box>
            </Grid>
            {paramForm.alertEnabled && (
              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth size='small'>
                  <InputLabel>Alert Severity</InputLabel>
                  <Select
                    value={paramForm.alertSeverity}
                    label='Alert Severity'
                    onChange={(e) => setParamForm((p) => ({ ...p, alertSeverity: e.target.value }))}
                  >
                    <MenuItem value='warning'>Warning</MenuItem>
                    <MenuItem value='critical'>Critical</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={() => setParamDialogOpen(false)} className={classes.cancelButton}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveParam}
            disabled={!paramForm.key || !paramForm.label || !paramForm.unit}
            className={classes.submitButton}
            startIcon={<AddIcon />}
          >
            {editingParam ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TurbineConfig;
