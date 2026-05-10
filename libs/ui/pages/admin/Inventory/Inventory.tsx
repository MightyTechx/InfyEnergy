import { Box } from '@infyenergy/component';
import { Typography, Grid } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useAdminKeyframes } from 'libs/ui/hooks/useAdminKeyframes';
import { useStyles } from './styles/Inventory.styles';

const Inventory = () => {
  const { classes } = useStyles();
  const keyframes = useAdminKeyframes();

  return (
    <>
      {keyframes}
      <Grid className={classes.container}>
        <Box className={classes.pageHeader}>
          <Box className={classes.headerOrb} />
          <Typography variant='h5' className={classes.title}>
            Inventory
          </Typography>
          <Typography variant='body2' className={classes.description}>
            Manage equipment, spare parts, and inventory assets.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 10,
          }}
        >
          <InventoryIcon sx={{ fontSize: 80, color: '#6b7280', mb: 2 }} />
          <Typography variant='h6' color='text.secondary'>
            Inventory Module
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Coming soon...
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

export default Inventory;
