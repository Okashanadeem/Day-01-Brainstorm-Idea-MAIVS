import { Request, Response } from 'express';
import Device from '../models/Device';
import ResaleAttempt from '../models/ResaleAttempt';
import { AuthRequest } from '../middleware/auth.middleware';

export const registerDevice = async (req: AuthRequest, res: Response) => {
  try {
    const { imei, brand, deviceModel } = req.body;
    const ownerCNIC = req.user.cnic;

    let device = await Device.findOne({ imei });
    if (device) {
      return res.status(400).json({ message: 'Device already registered' });
    }

    device = new Device({
      imei,
      brand,
      deviceModel,
      ownerCNIC,
      status: 'Active'
    });

    await device.save();
    res.status(201).json(device);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyDevices = async (req: AuthRequest, res: Response) => {
  try {
    const devices = await Device.find({ ownerCNIC: req.user.cnic });
    res.json(devices);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyDevice = async (req: Request, res: Response) => {
  try {
    const { imei } = req.params;
    const { shopkeeperCNIC } = req.query; // Optional: capture who is verifying

    const device = await Device.findOne({ imei });
    if (!device) {
      return res.status(404).json({ message: 'Device not found in registry' });
    }

    // If stolen, log a resale attempt (Police Trap logic)
    if (device.status === 'Stolen') {
      const attempt = new ResaleAttempt({
        imei,
        shopkeeperCNIC: (shopkeeperCNIC as string) || 'UNKNOWN',
        deviceStatus: device.status,
        flagged: true,
        policeNotified: true // In demo, we assume auto-notify
      });
      await attempt.save();
    }

    res.json({
      imei: device.imei,
      brand: device.brand,
      deviceModel: device.deviceModel,
      status: device.status,
      ownerName: '********', // Masked for privacy
      safeToTransact: device.status === 'Active'
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};