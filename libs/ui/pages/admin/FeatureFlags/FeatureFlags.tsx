import {
  Box,
  DataTable,
  Typography,
  TextField,
  Chip,
  IconButton,
  Button,
  Divider,
  FormControlLabel,
  Checkbox,
  Grid,
  Loader,
  Card,
  PageHeader,
} from '@infygen/component';
import { InputAdornment, Dialog, DialogContent, DialogActions } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AddIcon from '@mui/icons-material/Add';
import FlagIcon from '@mui/icons-material/Flag';
import CloseIcon from '@mui/icons-material/Close';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useUtils } from './utils/util';
import {
  FlagRole,
  useCreateFeatureFlagMutation,
  useUpdateFeatureFlagMutation,
} from '@infygen/services';
import { useAuth } from '@infygen/hooks';
import { useStyles } from './styles';

const FeatureFlags = () => {
  const { classes } = useStyles();
  const { user } = useAuth();
  const {
    SlideUp,
    BLANK_FORM,
    toKey,
    keyframes,
    isAdmin,
    isConsultant,
    flags,
    search,
    setSearch,
    dialogOpen,
    setDialogOpen,
    editingFlag,
    setEditingFlag,
    form,
    setForm,
    columns,
    statCards,
  } = useUtils();

  const [createFlag, { isLoading: isCreating }] = useCreateFeatureFlagMutation();
  const [updateFlag, { isLoading: isUpdating }] = useUpdateFeatureFlagMutation();
  const isSaving = isCreating || isUpdating;

  const openCreate = () => {
    setEditingFlag(null);
    setForm(BLANK_FORM);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingFlag(null);
    setForm(BLANK_FORM);
  };

  const toggleRole = (role: FlagRole) => {
    setForm((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role],
    }));
  };

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

  return (
    <>
      {keyframes}

      <Box className={classes.container}>
        <PageHeader
          title='Feature Flags'
          description={
            isAdmin
              ? 'Control feature rollouts across environments and manage role-based access for each flag.'
              : 'View features currently enabled for your Consultant role. Contact an admin to request access.'
          }
          icon={TuneIcon}
          variant='admin'
        />

        {isConsultant && !isAdmin && (
          <Box className={classes.accessBanner}>
            <InfoOutlinedIcon sx={{ color: '#6366f1', fontSize: 20, flexShrink: 0 }} />
            <Typography className={classes.accessBannerText}>
              You have read-only access to feature flags. Showing only features available to your
              Consultant role.
            </Typography>
          </Box>
        )}

        <Box className={classes.statsGrid}>
          {statCards.map(({ label, value, Icon, cls, sub, color }, idx) => (
            <Card
              key={label}
              cardVariant='getstatus'
              value={value}
              label={label}
              sub={sub}
              icon={Icon}
              color={color}
              colorIndex={idx}
              className={cls}
              sx={{ display: 'flex', flexDirection: 'column' }}
            />
          ))}
        </Box>

        <Box className={classes.tableContainer}>
          <Box className={classes.tableSectionHeader}>
            {isAdmin && (
              <Box onClick={openCreate} className={classes.addButton} sx={{ p: 0.7 }}>
                <AddIcon sx={{ fontSize: 14, color: '#fff' }} />
                <Typography
                  sx={{
                    fontSize: '14px !important',
                    fontWeight: 600,
                    color: '#fff',
                  }}
                >
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

          <DataTable
            columns={columns}
            data={visibleFlags}
            rowKey='id'
            searchable={false}
            initialRowsPerPage={10}
            elevation={0}
          />
        </Box>
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        TransitionComponent={SlideUp}
        fullWidth
        maxWidth='sm'
        className={classes.dialog}
      >
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

        <DialogContent className={classes.dialogContent}>
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
                    className={classes.formFieldFocused}
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
                    className={classes.formFieldFocused}
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
                    className={classes.formFieldFocused}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.status === 'Enabled'}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            status: e.target.checked ? 'Enabled' : 'Disabled',
                          }))
                        }
                        sx={{ color: '#4338ca', '&.Mui-checked': { color: '#4338ca' } }}
                      />
                    }
                    label={
                      <Typography
                        sx={{
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: form.status === 'Enabled' ? '#4338ca' : '#64748b',
                        }}
                      >
                        {form.status}
                      </Typography>
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box className={`${classes.sectionCard} ${classes.sectionCardMt}`}>
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
              <Box className={classes.accessControlBox}>
                {(['Admin', 'Consultant'] as FlagRole[]).map((role) => {
                  const checked = form.roles.includes(role);
                  const color = role === 'Admin' ? '#4338ca' : '#059669';
                  const bg = role === 'Admin' ? 'rgba(99,102,241,0.08)' : 'rgba(16,185,129,0.08)';
                  return (
                    <Box
                      key={role}
                      onClick={() => toggleRole(role)}
                      className={classes.roleCard}
                      sx={{
                        borderColor: checked ? color : 'rgba(0,0,0,0.1)',
                        background: checked ? bg : 'transparent',
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

        <DialogActions className={classes.dialogActions}>
          <Button
            variant='outlined'
            color='inherit'
            onClick={closeDialog}
            disabled={isSaving}
            className={classes.cancelButton}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            disabled={!form.name.trim() || isSaving}
            onClick={handleFormSave}
            startIcon={isSaving ? <Loader /> : undefined}
            className={classes.submitButton}
          >
            {isSaving ? 'Saving…' : editingFlag ? 'Save Changes' : 'Create Flag'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FeatureFlags;
