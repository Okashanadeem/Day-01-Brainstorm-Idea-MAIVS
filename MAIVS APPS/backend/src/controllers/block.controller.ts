import { Request, Response } from 'express';
import BlockList from '../models/BlockList';
import Device from '../models/Device';
import { AuthRequest } from '../middleware/auth.middleware';

export const getBlockRequests = async (req: AuthRequest, res: Response) => {
  try {
    const requests = await BlockList.find().sort({ requestDate: -1 });
    res.json(requests);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createBlockRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { imei, reason } = req.body;
    const requestedBy = req.user.cnic; // Or Police ID

    const block = new BlockList({
      imei,
      reason,
      requestedBy
    });

    await block.save();
    res.status(201).json(block);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBlockStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const block = await BlockList.findByIdAndUpdate(id, {
      status,
      blockedDate: status === 'Blocked' ? new Date() : undefined,
      telecomOperator: req.user.cnic // The logged in Telecom Operator
    }, { new: true });

    if (!block) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // SYNC DEVICE STATUS
    if (status === 'Blocked') {
      await Device.findOneAndUpdate(
        { imei: block.imei },
        { status: 'Blocked' }
      );
    }

    res.json(block);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
