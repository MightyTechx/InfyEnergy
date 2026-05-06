import { IAuthUser } from '@infyenergy/interfaces';

export type AccessRequestRow = IAuthUser & { sno?: number };
export type ActionType = 'approve' | 'reject';
