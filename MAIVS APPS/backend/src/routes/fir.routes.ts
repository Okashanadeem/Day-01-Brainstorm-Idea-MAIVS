import { Router } from 'express';
import { createFIR, getFIRs, updateFIRStatus } from '../controllers/fir.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = Router();

router.post('/', protect, createFIR);
router.get('/', protect, authorize('police', 'admin'), getFIRs);
router.patch('/:id', protect, authorize('police', 'admin'), updateFIRStatus);

export default router;
