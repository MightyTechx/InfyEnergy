import { Avatar, Box, Typography } from '@mui/material';

import { useAdminKeyframes, useAuth, useLiveDateTime } from '../../../hooks';
import { useStyles } from './styles';

// ─────────────────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const { classes } = useStyles();
  const keyframes = useAdminKeyframes();
  const { user } = useAuth();
  const userName =
    user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Admin';
  const userInitials = userName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  const { hours, minutes, seconds, dateStr, tzAbbr, tzRegion, utcOffset } = useLiveDateTime();

  return (
    <>
      {keyframes}
      <Box className={classes.container}>
        <Box className={classes.heroHeader}>
          {/* Left — user identity */}
          <Box className={classes.heroLeft}>
            <Avatar className={classes.heroAvatar} src={user?.profilePicture || undefined}>
              {!user?.profilePicture && userInitials}
            </Avatar>
            <Box>
              <Typography className={classes.heroGreeting}>Welcome back</Typography>
              <Typography className={classes.heroTitle}>{userName}</Typography>
            </Box>
          </Box>

          {/* Mobile center — shown only on small screens */}
          <Box className={classes.heroCenterMobile}>
            <Typography className={classes.heroCenterMobileTitle}>OPERATIONS HUB</Typography>
            <Box className={classes.heroCenterMobileBadge}>
              <Box className={classes.heroCenterMobileDot} />
              <Typography className={classes.heroCenterMobileLive}>LIVE</Typography>
            </Box>
          </Box>

          {/* Center — platform identity */}
          <Box className={classes.heroCenter}>
            <Typography className={classes.heroCenterTitle}>OPERATIONS HUB</Typography>
            <Box className={classes.heroCenterBadge}>
              <Box className={classes.heroCenterDot} />
              <Typography className={classes.heroCenterLive}>Live Tracking Activity</Typography>
            </Box>
            <Typography className={classes.heroCenterFacilities}>
              WTG Turbines · Sub Stations · Transmission Lines
            </Typography>
          </Box>

          {/* Right — live clock */}
          <Box className={classes.heroRight}>
            <Box className={classes.heroClockWidget}>
              <Box className={classes.heroClockRow}>
                <Typography className={classes.heroClockHM}>
                  {hours}:{minutes}
                </Typography>
                <Typography className={classes.heroClockSec}>{seconds}</Typography>
              </Box>
              <Typography className={classes.heroClockDate}>{dateStr}</Typography>
              <Box className={classes.heroClockTz}>
                <Box className={classes.heroClockTzDot} />
                <Typography className={classes.heroClockTzText}>
                  {tzAbbr} · {tzRegion} · {utcOffset}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
