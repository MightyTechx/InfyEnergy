import React, { useState } from 'react';
import { Box, Column, DataTable } from '@infyenergy/component';
import {
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Switch,
  Tooltip,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  FormControlLabel,
  Checkbox,
  Slide,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FlagIcon from '@mui/icons-material/Flag';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import GroupIcon from '@mui/icons-material/Group';
import CloseIcon from '@mui/icons-material/Close';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useAdminKeyframes } from 'libs/ui/hooks/useAdminKeyframes';
import { useAuth } from '@infyenergy/hooks';
import {
  useGetFeatureFlagsQuery,
  useCreateFeatureFlagMutation,
  useUpdateFeatureFlagMutation,
  useToggleFeatureFlagMutation,
  useDeleteFeatureFlagMutation,
  type FeatureFlag,
  type FlagRole,
  type FlagStatus,
  type FlagEnvironment,
} from '@infyenergy/services';

import { useStyles } from './styles';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FlagFormState {
  name: string;
  key: string;
  description: string;
  environment: FlagEnvironment;
  status: FlagStatus;
  roles: FlagRole[];
}

// ─── Slide Transition ─────────────────────────────────────────────────────────

const SlideUp = React.forwardRef(
  (props: TransitionProps & { children: React.ReactElement }, ref: React.Ref<unknown>) => (
    <Slide direction='up' ref={ref} {...props} />
  ),
);

const BLANK_FORM: FlagFormState = {
  name: '',
  key: '',
  description: '',
  environment: 'Development',
  status: 'Disabled',
  roles: ['Admin'],
};

const toKey = (name: string) =>
  name
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');

// ─── Component ────────────────────────────────────────────────────────────────

const FeatureFlags = () => {
  const { classes } = useStyles();
  const keyframes = useAdminKeyframes();
  const { isAdmin, isConsultant, user } = useAuth();

  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFlag, setEditingFlag] = useState<FeatureFlag | null>(null);
  const [form, setForm] = useState<FlagFormState>(BLANK_FORM);

  // ─── API Hooks ───────────────────────────────────────────────────────────────

  // pollingInterval ensures every user sees new flags within 30 s of creation
  const {
    data: flags = [],
    isLoading,
    isError,
  } = useGetFeatureFlagsQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const [createFlag, { isLoading: isCreating }] = useCreateFeatureFlagMutation();
  const [updateFlag, { isLoading: isUpdating }] = useUpdateFeatureFlagMutation();
  const [toggleFlag] = useToggleFeatureFlagMutation();
  const [deleteFlag] = useDeleteFeatureFlagMutation();

  const isSaving = isCreating || isUpdating;

  // ─── Dialog helpers ──────────────────────────────────────────────────────────

  const openCreate = () => {
    setEditingFlag(null);
    setForm(BLANK_FORM);
    setDialogOpen(true);
  };

  const openEdit = (flag: FeatureFlag) => {
    setEditingFlag(flag);
    setForm({
      name: flag.name,
      key: flag.key,
      description: flag.description,
      environment: flag.environment,
      status: flag.status,
      roles: [...flag.roles],
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingFlag(null);
    setForm(BLANK_FORM);
  };

  // ─── CRUD handlers ───────────────────────────────────────────────────────────

  const handleFormSave = async () => {
    if (!form.name.trim()) return;
    const payload = {
      name: form.name,
      key: form.key || toKey(form.name),
      description: form.description,
      environment: form.environment,
      status: form.status,
      roles: form.roles.length ? form.roles : ['Admin' as FlagRole],
    };
    if (editingFlag) {
      await updateFlag({ id: editingFlag.id, ...payload, updatedBy: user?.id });
    } else {
      await createFlag({ ...payload, createdBy: user?.id });
    }
    closeDialog();
  };

  const handleDelete = (id: number) => deleteFlag(id);

  const handleToggle = (id: number) => toggleFlag({ id, updatedBy: user?.id });

  const toggleRole = (role: FlagRole) => {
    setForm((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role],
    }));
  };

  // ─── Derived data ────────────────────────────────────────────────────────────

  const visibleFlags = flags.filter((f) => {
    if (isConsultant && !isAdmin && !f.roles.includes('Consultant')) return false;
    const q = search.toLowerCase();
    return (
      !q ||
      f.name.toLowerCase().includes(q) ||
      f.key.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q)
    );
  });

  const enabledCount = flags.filter((f) => f.status === 'Enabled').length;
  const disabledCount = flags.filter((f) => f.status === 'Disabled').length;
  const consultantCount = flags.filter((f) => f.roles.includes('Consultant')).length;

  const statCards = [
    {
      label: 'Total Flags',
      value: flags.length,
      Icon: FlagIcon,
      cls: classes.statCard0,
      sub: 'All Feature Flags',
      color: '#4f46e5',
    },
    {
      label: 'Enabled',
      value: enabledCount,
      Icon: CheckCircleOutlineIcon,
      cls: classes.statCard1,
      sub: 'Currently Active',
      color: '#10b981',
    },
    {
      label: 'Disabled',
      value: disabledCount,
      Icon: CancelOutlinedIcon,
      cls: classes.statCard2,
      sub: 'Inactive Flags',
      color: '#ef4444',
    },
    {
      label: 'Consultant Access',
      value: consultantCount,
      Icon: GroupIcon,
      cls: classes.statCard3,
      sub: 'Visible to Consultants',
      color: '#f59e0b',
    },
  ];

  // ─── Table columns ───────────────────────────────────────────────────────────

  const columns: Column<FeatureFlag>[] = [
    {
      id: 'name',
      label: 'Feature Name',
      minWidth: 200,
      sortable: true,
      align: 'left',
      format: (v, row) => (
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: '#4338ca' }}>
            {String(v)}
          </Typography>
          <Typography sx={{ fontSize: '0.73rem', color: '#94a3b8', fontFamily: 'monospace' }}>
            {row.key}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'description',
      label: 'Description',
      minWidth: 260,
      sortable: false,
      align: 'left',
      format: (v) => (
        <Typography sx={{ fontSize: '0.83rem', color: '#475569', lineHeight: 1.45 }}>
          {String(v)}
        </Typography>
      ),
    },
    {
      id: 'roles',
      label: 'Access Roles',
      minWidth: 160,
      sortable: false,
      align: 'center',
      format: (v) => {
        const roles = v as FlagRole[];
        return (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', justifyContent: 'center' }}>
            {roles.map((role) => (
              <Chip
                key={role}
                label={role}
                size='small'
                sx={{
                  height: 22,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  background: role === 'Admin' ? 'rgba(99,102,241,0.12)' : 'rgba(16,185,129,0.1)',
                  color: role === 'Admin' ? '#4338ca' : '#059669',
                }}
              />
            ))}
          </Box>
        );
      },
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 130,
      sortable: true,
      align: 'center',
      format: (v, row) => {
        const enabled = v === 'Enabled';
        if (isAdmin) {
          return (
            <Box
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.75 }}
            >
              <Switch
                checked={enabled}
                onChange={() => handleToggle(row.id)}
                size='small'
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: '#4338ca' },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#4338ca',
                  },
                }}
              />
              <Typography
                sx={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: enabled ? '#4338ca' : '#94a3b8',
                }}
              >
                {enabled ? 'Enabled' : 'Disabled'}
              </Typography>
            </Box>
          );
        }
        return (
          <Chip
            label={enabled ? 'Enabled' : 'Disabled'}
            size='small'
            sx={{
              height: 24,
              fontSize: '0.72rem',
              fontWeight: 600,
              background: enabled ? 'rgba(99,102,241,0.1)' : 'rgba(100,116,139,0.1)',
              color: enabled ? '#4338ca' : '#64748b',
            }}
          />
        );
      },
    },
    {
      id: 'updatedAt',
      label: 'Last Modified',
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
    ...(isAdmin
      ? ([
          {
            id: 'actions',
            label: 'Actions',
            minWidth: 100,
            sortable: false,
            align: 'center' as const,
            format: (_v: unknown, row: FeatureFlag) => (
              <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                <Tooltip title='Edit'>
                  <IconButton
                    size='small'
                    onClick={(e) => {
                      e.stopPropagation();
                      openEdit(row);
                    }}
                    sx={{ color: '#4338ca', '&:hover': { background: 'rgba(99,102,241,0.1)' } }}
                  >
                    <EditIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Delete'>
                  <IconButton
                    size='small'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(row.id);
                    }}
                    sx={{ color: '#dc2626', '&:hover': { background: 'rgba(220,38,38,0.1)' } }}
                  >
                    <DeleteIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            ),
          },
        ] as Column<FeatureFlag>[])
      : []),
  ];

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      {keyframes}

      <Box className={classes.container}>
        {/* ── Page Header ── */}
        <Box className={classes.pageHeader}>
          <Box className={classes.headerOrb} />
          <Box className={classes.pageHeaderRow}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <TuneIcon sx={{ color: 'rgba(255,255,255,0.85)', fontSize: 32 }} />
              <Typography variant='h5' className={classes.title}>
                Feature Flags
              </Typography>
            </Box>
            <Chip
              label={isAdmin ? 'Admin Control' : 'View Only'}
              size='small'
              icon={
                isAdmin ? (
                  <TuneIcon style={{ color: '#a5b4fc', fontSize: 14 }} />
                ) : (
                  <LockOutlinedIcon style={{ color: '#a5b4fc', fontSize: 14 }} />
                )
              }
              sx={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.75rem',
                border: '1px solid rgba(255,255,255,0.25)',
                alignSelf: 'flex-start',
                mt: 0.5,
              }}
            />
          </Box>
          <Typography variant='body2' className={classes.description}>
            {isAdmin
              ? 'Control feature rollouts across environments and manage role-based access for each flag.'
              : 'View features currently enabled for your Consultant role. Contact an admin to request access.'}
          </Typography>
        </Box>

        {/* ── Consultant access banner ── */}
        {isConsultant && !isAdmin && (
          <Box className={classes.accessBanner}>
            <InfoOutlinedIcon sx={{ color: '#6366f1', fontSize: 20, flexShrink: 0 }} />
            <Typography sx={{ fontSize: '0.85rem', color: '#4338ca', fontWeight: 500 }}>
              You have read-only access to feature flags. Showing only features available to your
              Consultant role.
            </Typography>
          </Box>
        )}

        {/* ── Error banner ── */}
        {isError && (
          <Alert severity='error' sx={{ mb: 2, borderRadius: 2 }}>
            Failed to load feature flags. Please refresh the page or try again.
          </Alert>
        )}

        {/* ── Stat Cards ── */}
        <Box className={classes.statsGrid}>
          {statCards.map(({ label, value, Icon, cls, sub, color }) => (
            <Box
              key={label}
              className={`${classes.statCard} ${cls}`}
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <Box className={classes.statCardTop} sx={{ flex: 1, alignItems: 'flex-start' }}>
                <Box>
                  <Typography className={classes.statValue} sx={{ color }}>
                    {isLoading ? '—' : value}
                  </Typography>
                  <Typography className={classes.statLabel}>{label}</Typography>
                </Box>
                <Box
                  className={classes.statIconWrap}
                  sx={{ background: `${color}14`, border: `1.5px solid ${color}28` }}
                >
                  <Icon className={classes.statIcon} sx={{ color }} />
                </Box>
              </Box>
              <Divider className={classes.statDivider} />
              <Box className={classes.statSubRow}>
                <Box
                  className={classes.statSubDot}
                  sx={{ background: color, boxShadow: `0 0 6px ${color}` }}
                />
                <Typography className={classes.statSub}>{sub}</Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* ── Feature Flags Table ── */}
        <Box className={classes.tableContainer}>
          <Box className={classes.tableSectionHeader}>
            {isAdmin && (
              <Box
                onClick={openCreate}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.75,
                  px: 2,
                  py: 0.75,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #7c3aed 100%)',
                  boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 24px rgba(99,102,241,0.5)',
                  },
                  '&:active': { transform: 'translateY(0)' },
                }}
              >
                <AddIcon sx={{ fontSize: 17, color: '#fff' }} />
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>
                  Create New Flag
                </Typography>
              </Box>
            )}
            <TextField
              placeholder='Search flags…'
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

          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress size={32} sx={{ color: '#4f46e5' }} />
            </Box>
          ) : (
            <DataTable
              columns={columns}
              data={visibleFlags}
              rowKey='id'
              searchable={false}
              initialRowsPerPage={10}
              elevation={0}
            />
          )}
        </Box>
      </Box>

      {/* ── Create / Edit Feature Flag Dialog ── */}
      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        TransitionComponent={SlideUp}
        fullWidth
        maxWidth='sm'
        className={classes.dialog}
      >
        {/* Hero Header */}
        <Box className={classes.modalHero}>
          <Box className={classes.modalIconBox}>
            <FlagIcon sx={{ fontSize: 24, color: '#fff' }} />
          </Box>
          <Box className={classes.modalTitleBox}>
            <Typography className={classes.modalTitle}>
              {editingFlag ? 'Edit Feature Flag' : 'Create New Feature Flag'}
            </Typography>
            <Typography className={classes.modalSubtitle}>
              {editingFlag
                ? 'Update the flag configuration below'
                : 'Configure and deploy a new feature flag'}
            </Typography>
          </Box>
          <IconButton onClick={closeDialog} className={classes.modalCloseBtn}>
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent
          sx={{ p: 3, bgcolor: 'background.default', maxHeight: '65vh', overflow: 'auto' }}
        >
          {/* ── Flag Details Section ── */}
          <Box className={classes.sectionCard}>
            <Box className={classes.sectionHeader}>
              <Box className={classes.sectionIcon}>
                <FlagIcon sx={{ fontSize: 16 }} />
              </Box>
              <Typography fontWeight={600} fontSize='0.95rem'>
                Flag Details
              </Typography>
            </Box>
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size='small'
                    label='Feature Name'
                    value={form.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setForm((prev) => ({ ...prev, name, key: toKey(name) }));
                    }}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#6366f1' },
                      '& label.Mui-focused': { color: '#6366f1' },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size='small'
                    label='Flag Key'
                    value={form.key}
                    onChange={(e) => setForm((prev) => ({ ...prev, key: e.target.value }))}
                    helperText='Auto-generated from name. Unique identifier used in code.'
                    slotProps={{ input: { sx: { fontFamily: 'monospace', fontSize: '0.85rem' } } }}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#6366f1' },
                      '& label.Mui-focused': { color: '#6366f1' },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size='small'
                    label='Description'
                    value={form.description}
                    onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                    multiline
                    rows={2}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#6366f1' },
                      '& label.Mui-focused': { color: '#6366f1' },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Switch
                      checked={form.status === 'Enabled'}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          status: e.target.checked ? 'Enabled' : 'Disabled',
                        }))
                      }
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': { color: '#4338ca' },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#4338ca',
                        },
                      }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: form.status === 'Enabled' ? '#4338ca' : '#64748b',
                        }}
                      >
                        {form.status}
                      </Typography>
                      <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                        Flag Status
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>

          {/* ── Access Control Section ── */}
          <Box className={classes.sectionCard} sx={{ mt: 2 }}>
            <Box className={classes.sectionHeader}>
              <Box className={classes.sectionIcon}>
                <VpnKeyIcon sx={{ fontSize: 16 }} />
              </Box>
              <Typography fontWeight={600} fontSize='0.95rem'>
                Access Control
              </Typography>
            </Box>
            <Box sx={{ p: 2.5 }}>
              <Typography sx={{ fontSize: '0.82rem', color: '#64748b', mb: 1.5 }}>
                Select which roles can access this feature flag.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {(['Admin', 'Consultant'] as FlagRole[]).map((role) => {
                  const checked = form.roles.includes(role);
                  const color = role === 'Admin' ? '#4338ca' : '#059669';
                  const bg = role === 'Admin' ? 'rgba(99,102,241,0.08)' : 'rgba(16,185,129,0.08)';
                  return (
                    <Box
                      key={role}
                      onClick={() => toggleRole(role)}
                      sx={{
                        flex: 1,
                        borderRadius: 3,
                        border: `2px solid ${checked ? color : 'rgba(0,0,0,0.1)'}`,
                        background: checked ? bg : 'transparent',
                        padding: 1.5,
                        cursor: 'pointer',
                        transition: 'all 0.22s ease',
                        '&:hover': { borderColor: color, background: bg },
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={() => toggleRole(role)}
                            sx={{ color, '&.Mui-checked': { color } }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        }
                        label={
                          <Box>
                            <Typography
                              sx={{
                                fontSize: '0.88rem',
                                fontWeight: 700,
                                color: checked ? color : '#475569',
                              }}
                            >
                              {role}
                            </Typography>
                            <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                              {role === 'Admin' ? 'System Administrators' : 'Energy Consultants'}
                            </Typography>
                          </Box>
                        }
                        sx={{ m: 0, alignItems: 'flex-start' }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            py: 2.5,
            borderTop: '1px solid rgba(99,102,241,0.15)',
            bgcolor: '#f8fafc',
            gap: 1.5,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant='outlined'
            color='inherit'
            onClick={closeDialog}
            disabled={isSaving}
            sx={{
              borderColor: 'rgba(100,116,139,0.3)',
              color: '#64748b',
              '&:hover': {
                borderColor: 'rgba(100,116,139,0.5)',
                bgcolor: 'rgba(100,116,139,0.05)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            disabled={!form.name.trim() || isSaving}
            onClick={handleFormSave}
            startIcon={isSaving ? <CircularProgress size={14} color='inherit' /> : undefined}
            sx={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #7c3aed 100%)',
              color: '#fff',
              fontWeight: 600,
              px: 3,
              boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4338ca 0%, #4f46e5 50%, #6d28d9 100%)',
                boxShadow: '0 6px 20px rgba(99,102,241,0.45)',
                transform: 'translateY(-1px)',
              },
              '&:active': { transform: 'translateY(0)' },
              '&.Mui-disabled': {
                background: 'rgba(99,102,241,0.3)',
                color: 'rgba(255,255,255,0.5)',
              },
            }}
          >
            {isSaving ? 'Saving…' : editingFlag ? 'Save Changes' : 'Create Flag'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FeatureFlags;
