import { Theme } from '@mui/material/styles';
import { createAppStyles } from '@infyenergy/theme';
import { getBaseStyles } from './CustomerAccess.styles.shared';

export const useStyles = createAppStyles((theme: Theme) => getBaseStyles(theme), {});
