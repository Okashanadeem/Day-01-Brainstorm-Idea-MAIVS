import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  imei: string;
  fromCNIC: string;
  toCNIC: string;
  transactionDate: Date;
  otpVerified: boolean;
  shopkeeperCNIC?: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
}

const TransactionSchema: Schema = new Schema({
  imei: { type: String, required: true },
  fromCNIC: { type: String, required: true },
  toCNIC: { type: String, required: true },
  transactionDate: { type: Date, default: Date.now },
  otpVerified: { type: Boolean, default: false },
  shopkeeperCNIC: { type: String },
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected', 'Cancelled'], 
    default: 'Pending' 
  }
}, {
  timestamps: true
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
