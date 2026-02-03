import express from 'express';
import { getBlockRequests, createBlockRequest, updateBlockStatus } from '../controllers/block.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.use(protect);

router.get('/', getBlockRequests);
router.post('/', createBlockRequest);
router.patch('/:id', updateBlockStatus);

export default router;
