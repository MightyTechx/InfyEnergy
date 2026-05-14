import React, { useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAdminKeyframes } from '../../../hooks';
import { useStyles } from './styles';
import { TurbineData } from './types/turbineData.types';
import { MOCK_TURBINE_DATA } from './utils/dashboard.utils';
import { constants } from '@infygen/utils';
import { Loader } from '@infygen/component';

const TurbineFleetDialog3D = React.lazy(() => import('./TurbineFleetDialog3D'));

const Turbine3DViewPage: React.FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { AdminPath } = constants;
  const keyframes = useAdminKeyframes();

  const [turbineData] = useState<TurbineData[]>(MOCK_TURBINE_DATA);
  const [fleetDialogOpen, setFleetDialogOpen] = useState(true);

  return (
    <>
      {keyframes}
      <Box className={classes.container}>
        {/* Header Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 2,
            background: 'rgba(15,23,42,0.95)',
            borderBottom: '1px solid rgba(6,182,212,0.2)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => navigate(AdminPath.DASHBOARD)} sx={{ color: '#06b6d4' }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography
              sx={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '0.05em',
              }}
            >
              WIND FARM 3D VIEW
            </Typography>
          </Box>
          <Chip
            label={`${turbineData.length} Turbines`}
            size='small'
            sx={{
              background: 'rgba(6,182,212,0.15)',
              color: '#06b6d4',
              border: '1px solid rgba(6,182,212,0.3)',
              fontWeight: 600,
            }}
          />
        </Box>

        {/* 3D View Content */}
        <Box sx={{ flex: 1, position: 'relative' }}>
          {fleetDialogOpen && (
            <Suspense fallback={<Loader />}>
              <TurbineFleetDialog3D
                open={fleetDialogOpen}
                turbines={turbineData}
                onClose={() => navigate(AdminPath.DASHBOARD)}
                onSelectTurbine={(turbine) => {
                  navigate(AdminPath.TURBINE_DETAIL.replace(':id', String(turbine.id)));
                }}
                onSelectComponent={(turbine) => {
                  navigate(AdminPath.TURBINE_DETAIL.replace(':id', String(turbine.id)));
                }}
              />
            </Suspense>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Turbine3DViewPage;
