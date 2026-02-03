import { Request, Response } from 'express';
import FIR from '../models/FIR';
import Device from '../models/Device';
import BlockList from '../models/BlockList';
import { AuthRequest } from '../middleware/auth.middleware';

export const createFIR = async (req: AuthRequest, res: Response) => {
  try {
    const { imei, description, policeStation } = req.body;
    const ownerCNIC = req.user.cnic;

    // Verify device exists and belongs to user
    const device = await Device.findOne({ imei, ownerCNIC });
    if (!device) {
      return res.status(404).json({ message: 'Device not found or not owned by you' });
    }

    const firNumber = `FIR-${Date.now()}`;

    const fir = new FIR({
      firNumber,
      imei,
      ownerCNIC,
      description,
      policeStation,
      status: 'Filed'
    });

    await fir.save();

    // Update device status
    device.status = 'Stolen';
    await device.save();

    // Create Block Request automatically
    await BlockList.create({
      imei,
      reason: `FIR Filed: ${firNumber}. Description: ${description}`,
      requestedBy: 'SYSTEM_AUTO', // Automated request
      status: 'Pending'
    });

    res.status(201).json(fir);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getFIRs = async (req: AuthRequest, res: Response) => {
  try {
    // Only police/admin should see all FIRs
    const firs = await FIR.find().sort({ createdAt: -1 });
    res.json(firs);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFIRStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const fir = await FIR.findById(id);
    if (!fir) {
      return res.status(404).json({ message: 'FIR not found' });
    }

    fir.status = status;
    await fir.save();

    // If recovered, update device
    if (status === 'Device Recovered') {
      await Device.findOneAndUpdate({ imei: fir.imei }, { status: 'Recovered' });
    }

    res.json(fir);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
