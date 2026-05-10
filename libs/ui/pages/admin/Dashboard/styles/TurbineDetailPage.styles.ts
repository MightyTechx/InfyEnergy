import { Theme } from '@mui/material/styles';
import { createAppStyles } from '@infyenergy/theme';
import { getTurbineDetailBaseStyles } from './TurbineDetailPage.styles.shared';

export const useTurbineDetailStyles = createAppStyles(
  (theme: Theme) => getTurbineDetailBaseStyles(theme),
  {},
);
