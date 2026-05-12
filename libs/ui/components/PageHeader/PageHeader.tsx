import { Box, Typography, Chip } from '@infygen/component';
import type { SvgIconComponent } from '@mui/icons-material';
import { useStyles } from './styles';

export type PageHeaderVariant = 'admin' | 'consultant';

export interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: SvgIconComponent;
  chip?: string;
  variant?: PageHeaderVariant;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  icon: Icon,
  chip,
  variant = 'admin',
  className,
}) => {
  const { cx, classes } = useStyles();

  const isAdmin = variant === 'admin';
  const headerClass = isAdmin ? classes.headerAdmin : classes.headerConsultant;
  const orbClass = isAdmin ? classes.headerOrb : classes.headerOrbConsultant;
  const chipClass = isAdmin ? classes.pageHeaderChip : classes.pageHeaderChipConsultant;

  return (
    <Box className={cx(classes.pageHeader, headerClass, className)}>
      <Box className={orbClass} />
      <Box className={classes.pageHeaderRow}>
        <Box className={classes.pageHeaderIconBox}>
          {Icon && (
            <Box className={classes.pageHeaderIconWrap}>
              <Icon sx={{ color: 'rgba(255,255,255,0.85)', fontSize: 28 }} />
            </Box>
          )}
          <Typography variant='h5' className={classes.title}>
            {title}
          </Typography>
        </Box>
        {chip && <Chip label={chip} size='small' className={chipClass} />}
      </Box>
      {description && (
        <Typography variant='body2' className={classes.description}>
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default PageHeader;
