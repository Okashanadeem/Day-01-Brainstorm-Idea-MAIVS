import { Router } from 'express';
import { registerDevice, getMyDevices, verifyDevice } from '../controllers/device.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', protect, registerDevice);
router.get('/my', protect, getMyDevices);
router.get('/verify/:imei', verifyDevice); // Public

export default router;
