import { Request, Response } from 'express';
import Device from '../models/Device';
import Transaction from '../models/Transaction';
import BlockList from '../models/BlockList';
import { AuthRequest } from '../middleware/auth.middleware';
import { logAction } from '../services/audit.service';

export const initiateTransfer = async (req: AuthRequest, res: Response) => {
  try {
    const { imei, buyerCNIC } = req.body;
    const shopkeeperCNIC = req.user.cnic;

    const device = await Device.findOne({ imei });
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    if (device.status !== 'Active' && device.status !== 'Recovered') {
      return res.status(400).json({ message: `Cannot transfer a device with status: ${device.status}` });
    }

    // In a real system, we'd send an SMS to device.ownerCNIC's phone number
    const otp = '123456'; // Simulated fixed OTP for demo
    console.log(`[DEMO OTP] For IMEI ${imei}: ${otp}`);
    console.log(`[SYSTEM NOTE] In production, this OTP is sent via an SMS Gateway Provider? (e.g. Twilio)`);

    const transaction = new Transaction({
      imei,
      fromCNIC: device.ownerCNIC,
      toCNIC: buyerCNIC,
      shopkeeperCNIC,
      status: 'Pending'
    });

    await transaction.save();
    
    await logAction('TRANSFER_INITIATED', req.user.cnic, imei, req.ip || 'unknown', { buyerCNIC, transactionId: transaction._id });

    res.status(201).json({
      message: 'Transfer initiated. OTP sent to registered owner.',
      transactionId: transaction._id,
      simulatedOTP: otp // Returning it for easier demo testing
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyTransferOTP = async (req: AuthRequest, res: Response) => {
  try {
    const { transactionId, otp } = req.body;
    const PANIC_CODE = '911911';

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Panic Alert Logic
    if (otp === PANIC_CODE) {
      const device = await Device.findOne({ imei: transaction.imei });
      
      await logAction('PANIC_ALERT', req.user.cnic, transaction.imei, req.ip || 'unknown', { 
        transactionId, 
        reason: 'User entered panic code during transfer',
        severity: 'CRITICAL'
      });

      // AUTOMATIC TELECOM BLOCK REQUEST
      console.log('Attemping to auto-create panic block for IMEI:', transaction.imei);
      try {
        const result = await BlockList.findOneAndUpdate(
          { imei: transaction.imei },
          {
            imei: transaction.imei,
            reason: 'PANIC ALERT - User Duress during Transfer',
            requestedBy: 'SYSTEM_PANIC_PROTOCOL',
            status: 'Pending', // Reset status to pending to ensure attention
            requestDate: new Date()
          },
          { upsert: true, new: true }
        );
        console.log('Panic Block Result:', result);
      } catch (blockError) {
        console.error('Failed to auto-create panic block request:', blockError);
      }

      // Fake Success Response to protect the victim
      // We retrieve the device just to return it in the response, but we DO NOT save changes.
      
      // Simulate the structure of a transferred device
      const fakeDevice = device ? { ...device.toObject(), ownerCNIC: transaction.toCNIC } : {};

      return res.json({
        message: 'Ownership transferred successfully!',
        device: fakeDevice
      });
    }

    if (otp !== '123456') {
      await logAction('OTP_FAILED', req.user.cnic, transaction.imei, req.ip || 'unknown', { transactionId });
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (transaction.status !== 'Pending') {
      return res.status(400).json({ message: 'Transaction is no longer pending' });
    }

    // Perform ownership transfer
    const device = await Device.findOne({ imei: transaction.imei });
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    const oldOwner = device.ownerCNIC;
    device.ownerCNIC = transaction.toCNIC;
    device.ownershipHistory.push({
      fromCNIC: oldOwner,
      toCNIC: transaction.toCNIC,
      date: new Date()
    });

    await device.save();

    transaction.status = 'Approved';
    transaction.otpVerified = true;
    await transaction.save();

    await logAction('TRANSFER_COMPLETED', req.user.cnic, device.imei, req.ip || 'unknown', { 
      from: oldOwner, 
      to: transaction.toCNIC 
    });

    res.json({
      message: 'Ownership transferred successfully!',
      device
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
