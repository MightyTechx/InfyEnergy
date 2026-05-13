import { Router } from 'express';
import { prisma } from '@infygen/database';
import { TurbineConfigController } from './TurbineConfig.controller';

const controller = new TurbineConfigController(prisma);
const router = Router();

// Turbine Types
router.get('/turbine-types', controller.getTurbineTypes);
router.get('/turbine-types/:id', controller.getTurbineType);
router.post('/turbine-types', controller.createTurbineType);
router.put('/turbine-types/:id', controller.updateTurbineType);
router.delete('/turbine-types/:id', controller.deleteTurbineType);

// Parameters
router.get('/turbine-types/:typeId/parameters', controller.getParameters);
router.post('/turbine-types/:typeId/parameters', controller.createParameter);
router.put('/parameters/:id', controller.updateParameter);
router.delete('/parameters/:id', controller.deleteParameter);

// Schema (for UI)
router.get('/turbine-config/schema', controller.getSchema);

export default router;