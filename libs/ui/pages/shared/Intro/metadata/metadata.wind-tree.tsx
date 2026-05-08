import { createAppMetadata } from '@infyenergy/theme';
import { getBaseMetadata } from './metadata.shared';

export const useMetadata = createAppMetadata(
  getBaseMetadata(),
  {},
  { 'wind-tree': { tenet: 'Wind Tree' } },
);
