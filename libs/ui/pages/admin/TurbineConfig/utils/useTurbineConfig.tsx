import { useState } from 'react';
import { Typography, IconButton, Chip, Tooltip } from '@mui/material';
import { Column } from '@infygen/component';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import SettingsIcon from '@mui/icons-material/Settings';
import LinkIcon from '@mui/icons-material/Link';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import StorageIcon from '@mui/icons-material/Storage';
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
import { useStyles } from '../styles';

const CATEGORY_COLORS: Record<string, string> = {
  electrical: '#f59e0b',
  mechanical: '#3b82f6',
  environmental: '#10b981',
  operational: '#8b5cf6',
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  electrical: <SettingsIcon sx={{ fontSize: 14 }} />,
  mechanical: <BuildIcon sx={{ fontSize: 14 }} />,
  environmental: <StorageIcon sx={{ fontSize: 14 }} />,
  operational: <DashboardIcon sx={{ fontSize: 14 }} />,
};

export const useTurbineConfigUtils = () => {
  const { classes } = useStyles();
  const { data: turbineTypes = [], isLoading: loadingTypes } = useGetTurbineTypesQuery();

  // Types dialog state
  const [typeDialogOpen, setTypeDialogOpen] = useState(false);
  const [editingType, setEditingType] = useState<TurbineType | null>(null);
  const [typeForm, setTypeForm] = useState({
    name: '',
    manufacturer: '',
    ratedPower: '',
    rotorDiameter: '',
    hubHeight: '',
  });

  // Parameters state
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [paramCategory, setParamCategory] = useState<string>('all');
  const [paramDialogOpen, setParamDialogOpen] = useState(false);
  const [editingParam, setEditingParam] = useState<TurbineParameter | null>(null);
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
    alertSeverity: 'warning' as 'warning' | 'critical',
    scadaMapping: '',
    color: '',
    displayOrder: '0',
  });

  const [createType] = useCreateTurbineTypeMutation();
  const [updateType] = useUpdateTurbineTypeMutation();
  const [deleteType] = useDeleteTurbineTypeMutation();

  const { data: parameters = [], isLoading: loadingParams } = useGetParametersQuery(
    { typeId: selectedTypeId || '' },
    { skip: !selectedTypeId },
  );

  const [createParam] = useCreateParameterMutation();
  const [updateParam] = useUpdateParameterMutation();
  const [deleteParam] = useDeleteParameterMutation();

  const isSavingType = false;
  const isSavingParam = false;

  const openCreateType = () => {
    setEditingType(null);
    setTypeForm({ name: '', manufacturer: '', ratedPower: '', rotorDiameter: '', hubHeight: '' });
    setTypeDialogOpen(true);
  };

  const openEditType = (type: TurbineType) => {
    setEditingType(type);
    setTypeForm({
      name: type.name,
      manufacturer: type.manufacturer,
      ratedPower: String(type.ratedPower),
      rotorDiameter: type.rotorDiameter ? String(type.rotorDiameter) : '',
      hubHeight: type.hubHeight ? String(type.hubHeight) : '',
    });
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
    if (confirm('Delete this turbine type? All associated parameters will be deleted.')) {
      await deleteType(id);
      if (selectedTypeId === id) setSelectedTypeId(null);
    }
  };

  const openCreateParam = () => {
    if (!selectedTypeId) return;
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
      color: '',
      displayOrder: '0',
    });
    setParamDialogOpen(true);
  };

  const openEditParam = (param: TurbineParameter) => {
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
      color: param.color || '',
      displayOrder: String(param.displayOrder),
    });
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
      alertSeverity: paramForm.alertSeverity,
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

  const handleDeleteParam = async (id: string) => {
    if (confirm('Delete this parameter?')) {
      await deleteParam(id);
    }
  };

  const typeColumns: Column<TurbineType>[] = [
    {
      id: 'name',
      label: 'Type Name',
      minWidth: 160,
      format: (v: any) => <Typography sx={{ fontWeight: 600, color: '#4f46e5' }}>{v}</Typography>,
    },
    { id: 'manufacturer', label: 'Manufacturer', minWidth: 140 },
    {
      id: 'ratedPower',
      label: 'Rated Power (kW)',
      minWidth: 120,
      align: 'right' as const,
      format: (v: any) => <Typography sx={{ fontVariantNumeric: 'tabular-nums' }}>{v}</Typography>,
    },
    {
      id: 'rotorDiameter',
      label: 'Rotor (m)',
      minWidth: 100,
      align: 'right' as const,
      format: (v: any) => (v !== null ? String(v) : '—'),
    },
    {
      id: 'hubHeight',
      label: 'Hub (m)',
      minWidth: 100,
      align: 'right' as const,
      format: (v: any) => (v !== null ? String(v) : '—'),
    },
    {
      id: '_count',
      label: 'Parameters',
      minWidth: 100,
      align: 'center' as const,
      format: (v: any) => (
        <Chip
          size='small'
          label={v?.parameters ?? 0}
          sx={{ background: 'rgba(99,102,241,0.1)', color: '#4f46e5', fontWeight: 600 }}
        />
      ),
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 100,
      align: 'center' as const,
      format: (_v, row) => (
        <>
          <IconButton
            size='small'
            onClick={(e) => {
              e.stopPropagation();
              openEditType(row as TurbineType);
            }}
            sx={{ color: '#4f46e5' }}
          >
            <EditIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            size='small'
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteType((row as TurbineType).id);
            }}
            sx={{ color: '#dc2626' }}
          >
            <DeleteIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </>
      ),
    },
  ];

  const paramColumns: Column<TurbineParameter>[] = [
    {
      id: 'key',
      label: 'Key',
      minWidth: 120,
      format: (v: any) => (
        <Typography sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{v}</Typography>
      ),
    },
    { id: 'label', label: 'Label', minWidth: 140 },
    {
      id: 'category',
      label: 'Category',
      minWidth: 120,
      format: (v: any) => (
        <Chip
          size='small'
          icon={CATEGORY_ICONS[v] as React.ReactElement}
          label={v}
          sx={{
            background: `${CATEGORY_COLORS[v]}20`,
            color: CATEGORY_COLORS[v],
            border: `1px solid ${CATEGORY_COLORS[v]}40`,
            fontWeight: 600,
            textTransform: 'capitalize',
          }}
        />
      ),
    },
    { id: 'unit', label: 'Unit', minWidth: 80 },
    {
      id: 'scadaMapping',
      label: 'SCADA Mapping',
      minWidth: 180,
      format: (v: any) =>
        v ? (
          <Tooltip title={v}>
            <Chip
              size='small'
              icon={<LinkIcon sx={{ fontSize: 12 }} />}
              label={v.split('.').pop()}
              sx={{
                background: 'rgba(16,185,129,0.1)',
                color: '#059669',
                fontFamily: 'monospace',
                fontSize: '0.7rem',
              }}
            />
          </Tooltip>
        ) : (
          <Typography sx={{ color: '#94a3b8', fontSize: '0.8rem' }}>—</Typography>
        ),
    },
    {
      id: 'alertEnabled',
      label: 'Alert',
      minWidth: 70,
      align: 'center' as const,
      format: (v: any) =>
        v ? (
          <Chip
            size='small'
            icon={<NotificationsActiveIcon sx={{ fontSize: 12 }} />}
            label='ON'
            sx={{ background: 'rgba(239,68,68,0.1)', color: '#dc2626', fontWeight: 600 }}
          />
        ) : (
          <Typography sx={{ color: '#94a3b8' }}>—</Typography>
        ),
    },
    {
      id: 'chartEnabled',
      label: 'Chart',
      minWidth: 70,
      align: 'center' as const,
      format: (v: any) =>
        v ? (
          <ShowChartIcon sx={{ color: '#10b981', fontSize: 18 }} />
        ) : (
          <Typography sx={{ color: '#94a3b8' }}>—</Typography>
        ),
    },
    {
      id: 'dashboardVisible',
      label: 'Dashboard',
      minWidth: 100,
      align: 'center' as const,
      format: (v: any) =>
        v ? (
          <Chip
            size='small'
            label='Visible'
            sx={{ background: 'rgba(99,102,241,0.1)', color: '#4f46e5' }}
          />
        ) : (
          <Chip
            size='small'
            label='Hidden'
            sx={{ background: 'rgba(0,0,0,0.06)', color: '#94a3b8' }}
          />
        ),
    },
    {
      id: 'actions',
      label: '',
      minWidth: 80,
      align: 'center' as const,
      format: (_v, row) => (
        <>
          <IconButton
            size='small'
            onClick={(e) => {
              e.stopPropagation();
              openEditParam(row as TurbineParameter);
            }}
            sx={{ color: '#4f46e5' }}
          >
            <EditIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            size='small'
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteParam((row as TurbineParameter).id);
            }}
            sx={{ color: '#dc2626' }}
          >
            <DeleteIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </>
      ),
    },
  ];

  return {
    classes,
    turbineTypes,
    loadingTypes,
    parameters,
    loadingParams,
    selectedTypeId,
    setSelectedTypeId,
    paramCategory,
    setParamCategory,
    typeDialogOpen,
    setTypeDialogOpen,
    editingType,
    typeForm,
    setTypeForm,
    paramDialogOpen,
    setParamDialogOpen,
    editingParam,
    paramForm,
    setParamForm,
    isSavingType,
    isSavingParam,
    openCreateType,
    openEditType,
    handleSaveType,
    handleDeleteType,
    openCreateParam,
    openEditParam,
    handleSaveParam,
    handleDeleteParam,
    typeColumns,
    paramColumns,
  };
};
