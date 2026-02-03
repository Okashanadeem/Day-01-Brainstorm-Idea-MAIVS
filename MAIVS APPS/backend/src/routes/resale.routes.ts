import { Router } from 'express';
import { initiateTransfer, verifyTransferOTP } from '../controllers/resale.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.post('/initiate', protect, initiateTransfer);
router.post('/verify-otp', protect, verifyTransferOTP);

export default router;
