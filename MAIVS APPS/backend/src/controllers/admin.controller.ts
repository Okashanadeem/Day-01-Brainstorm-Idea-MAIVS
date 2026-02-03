import { Request, Response } from 'express';
import Device from '../models/Device';
import ResaleAttempt from '../models/ResaleAttempt';
import AuditLog from '../models/AuditLog';
import BlockList from '../models/BlockList';
import Transaction from '../models/Transaction';

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find().sort({ transactionDate: -1 }).limit(50);
    res.json(transactions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getStolenDevices = async (req: Request, res: Response) => {
  try {
    const devices = await Device.find({ status: 'Stolen' }).sort({ updatedAt: -1 });
    res.json(devices);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getResaleAlerts = async (req: Request, res: Response) => {
  try {
    const alerts = await ResaleAttempt.find({ flagged: true }).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getDevicesByOwner = async (req: Request, res: Response) => {
  try {
    const { cnic } = req.params;
    const devices = await Device.find({ ownerCNIC: cnic });
    res.json(devices);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPanicAlerts = async (req: Request, res: Response) => {
  try {
    const alerts = await AuditLog.find({ action: 'PANIC_ALERT' }).sort({ timestamp: -1 }).limit(5);
    res.json(alerts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const acknowledgeAlert = async (req: Request, res: Response) => {
  try {
    const { alertId } = req.body;
    const alert = await AuditLog.findById(alertId);

    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    // Ensure the device is blocked
    if (alert.resourceId) {
      await BlockList.findOneAndUpdate(
        { imei: alert.resourceId },
        {
          imei: alert.resourceId,
          reason: `PANIC ALERT CONFIRMED - Police Action Initiated (Ref: ${alertId})`,
          requestedBy: 'POLICE_ADMIN',
          status: 'Pending',
          requestDate: new Date()
        },
        { upsert: true, new: true }
      );
    }

    // Optionally update the alert status if AuditLog supported it, 
    // but for now we just return success.
    res.json({ message: 'Alert acknowledged and Block Request enforced.' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};