import SettingsIcon from '@mui/icons-material/Settings';
import { Box, PageHeader } from '@infygen/component';
import { Typography } from '@mui/material';
import { useStyles } from './styles';

const Configuration = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <PageHeader
        title='Configuration'
        description='Manage system-wide settings and configurations for your InfyEnergy platform.'
        icon={SettingsIcon}
        variant='admin'
      />

      <Box className={classes.content}>
        <Typography variant='body2' color='text.secondary'>
          Configuration settings will appear here. This page is under construction.
        </Typography>
      </Box>
    </Box>
  );
};

export default Configuration;
