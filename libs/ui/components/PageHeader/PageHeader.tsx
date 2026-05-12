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
  children?: React.ReactNode;
  showDefaultContent?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  icon: Icon,
  chip,
  variant = 'admin',
  className,
  children,
  showDefaultContent = true,
}) => {
  const { cx, classes } = useStyles();

  const isAdmin = variant === 'admin';
  const headerClass = isAdmin ? classes.headerAdmin : classes.headerConsultant;
  const chipClass = isAdmin ? classes.pageHeaderChip : classes.pageHeaderChipConsultant;

  return (
    <Box className={cx(classes.pageHeader, headerClass, className)}>
      {showDefaultContent && (
        <Box className={classes.pageHeaderRow}>
          <Box className={classes.pageHeaderIconBox}>
            {Icon && (
              <Box className={classes.pageHeaderIconWrap}>
                <Icon sx={{ color: '#ffffff', fontSize: 22 }} />
              </Box>
            )}
            <Box>
              <Typography className={classes.title}>{title}</Typography>
              {description && (
                <Typography className={classes.description}>{description}</Typography>
              )}
            </Box>
          </Box>
          {chip && <Chip label={chip} size='small' className={chipClass} />}
        </Box>
      )}
      {children}
    </Box>
  );
};

export default PageHeader;
