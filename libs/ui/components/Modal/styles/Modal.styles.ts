import { Theme } from '@mui/material/styles';
import { createAppStyles } from '@infyenergy/theme';
import { getBaseStyles } from './Modal.styles.shared';

export const useStyles = createAppStyles((theme: Theme) => getBaseStyles(theme), {
  admin: {
    root: {},
  },
  user: {
    root: {},
  },
  consultant: {
    root: {},
  },
});
