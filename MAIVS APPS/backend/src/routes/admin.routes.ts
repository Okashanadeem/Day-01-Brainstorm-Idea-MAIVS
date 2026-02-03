import { Router } from 'express';
import { getStolenDevices, getResaleAlerts, getDevicesByOwner, getPanicAlerts, acknowledgeAlert, getAllTransactions } from '../controllers/admin.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = Router();

router.use(protect);
router.use(authorize('police', 'admin'));

router.get('/transactions', getAllTransactions);
router.get('/stolen-devices', getStolenDevices);
router.get('/resale-alerts', getResaleAlerts);
router.get('/devices/owner/:cnic', getDevicesByOwner);
router.get('/panic-alerts', getPanicAlerts);
router.post('/acknowledge-alert', acknowledgeAlert);

export default router;