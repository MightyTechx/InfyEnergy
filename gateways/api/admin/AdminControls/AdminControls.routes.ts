import { Router } from 'express';
import { prisma } from '@infyenergy/database';
import { AdminControlsController } from './AdminControls.controller';

const controller = new AdminControlsController(prisma);
const router = Router();

router.get('/', controller.get);
router.put('/', controller.update);

export default router;
