import { useState } from 'react';
import { Box, Loader, DataTable } from '@infyenergy/component';
import {
  Typography,
  Grid,
  Tabs,
  Tab,
  Divider,
  TextField,
  InputAdornment,
  Chip,
  Button,
  Stack,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SearchIcon from '@mui/icons-material/Search';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TabPanel from './components/TabPanel';
import usePeopleManagement from './hooks/useAccessManagement';
import { useAdminKeyframes } from 'libs/ui/hooks/useAdminKeyframes';
import { useStyles } from './styles';
import { AccessRequestRow } from '../PeopleRequests/types/accessRequests.types';
import { IAuthUser } from '@infyenergy/interfaces';
import { UserDetailDialog } from '../UserDetail';
import { CreateUserDialog } from './components/CreateUserDialog';
// UserRow / constants imports removed — openDetail uses plain number ids

const PeopleManagement = () => {
  const { classes } = useStyles();
  const keyframes = useAdminKeyframes();

  const {
    allUsers,
    admins,
    consultants,
    dbDraftUsers,
    pendingRequests,
    isLoading,
    isMobile,
    tabValue,
    setTabValue,
    tableSearch,
    setTableSearch,
    selectedRow,
    columns,
    getTableData,
    draftRow,
    actionInProgress,
    handlePendingAction,
  } = usePeopleManagement();

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailUserId, setDetailUserId] = useState<number | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const openDetail = (id: number) => {
    setDetailUserId(id);
    setDetailOpen(true);
  };

  if (isLoading) {
    return (
      <>
        {keyframes}
        <Box className={classes.container}>
          <Loader />
        </Box>
      </>
    );
  }

  const draftCount = dbDraftUsers.length + (draftRow ? 1 : 0);
  const pendingCount = pendingRequests.length;

  const statCards = [
    {
      label: 'Total Users',
      value: allUsers.length,
      Icon: GroupIcon,
      cls: classes.statCard0,
      sub: 'System Registrations',
      color: '#4f46e5',
      tabIndex: 0,
    },
    {
      label: 'Admins',
      value: admins.length,
      Icon: AdminPanelSettingsIcon,
      cls: classes.statCard1,
      sub: 'System Administrators',
      color: '#f59e0b',
      tabIndex: 1,
    },
    {
      label: 'Consultants',
      value: consultants.length,
      Icon: BusinessCenterIcon,
      cls: classes.statCard2,
      sub: 'Energy Consultants',
      color: '#10b981',
      tabIndex: 2,
    },
    {
      label: 'Pending',
      value: pendingCount,
      Icon: PendingActionsIcon,
      cls: classes.statCard3,
      sub: 'Awaiting Approval',
      color: '#ef4444',
      tabIndex: 3,
    },
  ];

  return (
    <>
      {keyframes}
      <Grid className={classes.container}>
        {/* ── Page header ── */}
        <Box className={classes.pageHeader}>
          <Box className={classes.headerOrb3} />
          <Box className={classes.pageHeaderRow}>
            <Typography variant='h5' className={classes.title}>
              People Management
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
              <Box
                onClick={() => setCreateOpen(true)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2.5,
                  py: 1.25,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #7c3aed 100%)',
                  boxShadow:
                    '0 4px 20px rgba(99,102,241,0.45), 0 0 40px rgba(99,102,241,0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transition: 'left 0.5s ease',
                  },
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow:
                      '0 8px 30px rgba(99,102,241,0.55), 0 0 60px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.25)',
                    '&::before': {
                      left: '100%',
                    },
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  <PersonAddIcon sx={{ fontSize: 18, color: '#fff' }} />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#fff',
                      lineHeight: 1.2,
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                    }}
                  >
                    Create User
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.65rem',
                      color: 'rgba(255,255,255,0.75)',
                      lineHeight: 1.2,
                    }}
                  >
                    Add new member
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#34d399',
                    ml: 0.5,
                    boxShadow: '0 0 8px #34d399',
                    animation: 'pulse 2s ease-in-out infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                      '50%': { opacity: 0.6, transform: 'scale(0.8)' },
                    },
                  }}
                />
              </Box>
              {draftCount > 0 && (
                <Chip
                  label={`${draftCount} Draft`}
                  size='small'
                  sx={{
                    background: 'rgba(245,158,11,0.15)',
                    border: '1px solid rgba(245,158,11,0.4)',
                    color: '#f59e0b',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    height: 24,
                  }}
                />
              )}
              {pendingCount > 0 && (
                <Chip
                  label={`${pendingCount} Pending`}
                  size='small'
                  sx={{
                    background: 'rgba(239,68,68,0.15)',
                    border: '1px solid rgba(239,68,68,0.4)',
                    color: '#ef4444',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    height: 24,
                  }}
                />
              )}
            </Box>
          </Box>
          <Typography variant='body2' className={classes.description}>
            View and manage all users and their access across different roles in the system.
          </Typography>
        </Box>

        {/* ── Stat Cards ── */}
        <Box className={classes.statsGrid}>
          {statCards.map(({ label, value, Icon, cls, sub, color, tabIndex }) => {
            const isActive = tabValue === tabIndex;
            return (
              <Box
                key={label}
                className={`${classes.statCard} ${cls}`}
                onClick={() => {
                  setTabValue(tabIndex);
                  setTableSearch('');
                }}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  outline: isActive ? `2px solid ${color}` : 'none',
                  outlineOffset: 2,
                  transform: isActive ? 'translateY(-6px)' : undefined,
                  boxShadow: isActive ? `0 16px 40px ${color}30, 0 4px 16px ${color}18` : undefined,
                }}
              >
                <Box className={classes.statCardTop} sx={{ flex: 1, alignItems: 'flex-start' }}>
                  <Box>
                    <Typography className={classes.statValue} sx={{ color }}>
                      {value}
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
            );
          })}
        </Box>

        {/* ── Tabs + Search ── */}
        <Box className={classes.tabsBox}>
          <Tabs
            value={tabValue}
            onChange={(_, v) => {
              setTabValue(v);
              setTableSearch('');
            }}
            variant='scrollable'
            scrollButtons='auto'
            allowScrollButtonsMobile
            sx={{ flex: 1 }}
          >
            <Tab
              icon={<GroupIcon />}
              iconPosition='start'
              label={isMobile ? undefined : 'All Users'}
            />
            <Tab
              icon={<AdminPanelSettingsIcon />}
              iconPosition='start'
              label={isMobile ? undefined : 'Admins'}
            />
            <Tab
              icon={<BusinessCenterIcon />}
              iconPosition='start'
              label={isMobile ? undefined : 'Consultants'}
            />
            <Tab
              icon={<PendingActionsIcon />}
              iconPosition='start'
              label={
                isMobile ? undefined : `Pending${pendingCount > 0 ? ` (${pendingCount})` : ''}`
              }
            />
          </Tabs>
          <TextField
            placeholder='Search...'
            value={tableSearch}
            onChange={(e) => setTableSearch(e.target.value)}
            className={classes.tabsSearchField}
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

        {/* ── Tab panels with DataTable ── */}
        {[allUsers, admins, consultants, pendingRequests].map((list, idx) => {
          const showLocalDraft = (idx === 0 || idx === 3) && draftRow;
          const tableData =
            idx < 3 ? getTableData(list as IAuthUser[], showLocalDraft ? 2 : 1) : [];
          const filteredData =
            idx < 3
              ? tableSearch
                ? tableData.filter((row) =>
                    Object.values(row).some(
                      (val) =>
                        val !== null &&
                        val !== undefined &&
                        String(val).toLowerCase().includes(tableSearch.toLowerCase()),
                    ),
                  )
                : tableData
              : [];

          // Pending tab specific filtering
          const pendingFiltered =
            idx === 3
              ? tableSearch
                ? (list as AccessRequestRow[]).filter((row) =>
                    Object.values(row).some(
                      (val) =>
                        val !== null &&
                        val !== undefined &&
                        String(val).toLowerCase().includes(tableSearch.toLowerCase()),
                    ),
                  )
                : list
              : [];

          const pinnedData =
            idx < 3 && showLocalDraft
              ? tableSearch
                ? Object.values(draftRow).some(
                    (val) =>
                      val !== null &&
                      val !== undefined &&
                      String(val).toLowerCase().includes(tableSearch.toLowerCase()),
                  )
                  ? [{ ...draftRow, sno: 1 }]
                  : []
                : [{ ...draftRow, sno: 1 }]
              : [];

          return (
            <TabPanel key={idx} value={tabValue} index={idx}>
              {idx === 3 ? (
                /* Pending Requests Tab with Approve/Reject */
                <Box className={classes.tableContainer}>
                  {pendingFiltered.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                      <PendingActionsIcon sx={{ fontSize: 64, color: '#94a3b8', mb: 2 }} />
                      <Typography variant='h6' color='text.secondary'>
                        {tableSearch ? 'No matching requests' : 'No pending requests'}
                      </Typography>
                    </Box>
                  ) : (
                    <DataTable
                      columns={[
                        { id: 'sno', label: 'S.No', minWidth: 60, sortable: false },
                        {
                          id: 'name',
                          label: 'Name',
                          minWidth: 150,
                          format: (v, row: AccessRequestRow) => (
                            <Typography
                              variant='body2'
                              sx={{
                                color: '#1976d2',
                                cursor: 'pointer',
                                fontWeight: 500,
                                '&:hover': { textDecoration: 'underline' },
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                openDetail(row.id as number);
                              }}
                            >
                              {String(v || '-')}
                            </Typography>
                          ),
                        },
                        {
                          id: 'email',
                          label: 'Email',
                          minWidth: 200,
                          format: (v) => String(v || '-'),
                        },
                        {
                          id: 'businessUnit',
                          label: 'Department',
                          minWidth: 150,
                          format: (v) => String(v || '-'),
                        },
                        {
                          id: 'requestedRole',
                          label: 'Role',
                          minWidth: 120,
                          align: 'center',
                          format: (v) => {
                            const role = String(v || '');
                            const isAdmin = role === 'admin';
                            return (
                              <Chip
                                label={isAdmin ? 'Admin' : 'Consultant'}
                                size='small'
                                variant='outlined'
                                sx={{
                                  borderColor: isAdmin ? '#dc2626' : '#0ea5e9',
                                  color: isAdmin ? '#dc2626' : '#0ea5e9',
                                  fontWeight: 600,
                                }}
                              />
                            );
                          },
                        },
                        {
                          id: 'actions',
                          label: 'Actions',
                          minWidth: 200,
                          align: 'center',
                          sortable: false,
                          format: (_v, row: AccessRequestRow) => {
                            const isProcessing = actionInProgress === row.id;
                            return (
                              <Stack direction='row' spacing={1} justifyContent='center'>
                                <Button
                                  variant='contained'
                                  color='success'
                                  size='small'
                                  startIcon={<CheckCircleOutlineIcon />}
                                  disabled={isProcessing}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePendingAction(row, 'approve');
                                  }}
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant='outlined'
                                  color='error'
                                  size='small'
                                  startIcon={<CancelOutlinedIcon />}
                                  disabled={isProcessing}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePendingAction(row, 'reject');
                                  }}
                                >
                                  Reject
                                </Button>
                              </Stack>
                            );
                          },
                        },
                      ]}
                      data={(pendingFiltered as AccessRequestRow[]).map((row, i) => ({
                        ...row,
                        sno: i + 1,
                      }))}
                      rowKey='id'
                      searchable={false}
                      initialRowsPerPage={10}
                      onRowClick={(row) => openDetail((row as AccessRequestRow).id as number)}
                    />
                  )}
                </Box>
              ) : (
                <Box className={classes.tableContainer}>
                  <DataTable
                    columns={columns}
                    data={filteredData}
                    rowKey='id'
                    searchable={false}
                    initialRowsPerPage={10}
                    onRowClick={(row) => openDetail(row.id as number)}
                    activeRowKey={selectedRow?.id as number}
                    pinnedRows={pinnedData}
                  />
                </Box>
              )}
            </TabPanel>
          );
        })}
      </Grid>

      <UserDetailDialog
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        userId={detailUserId}
        onActionComplete={() => {
          setDetailOpen(false);
        }}
      />

      <CreateUserDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={() => {}}
      />
    </>
  );
};

export default PeopleManagement;
