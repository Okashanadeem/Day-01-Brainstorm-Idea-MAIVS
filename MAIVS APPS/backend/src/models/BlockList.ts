import mongoose, { Document, Schema } from 'mongoose';

export interface IBlockList extends Document {
  imei: string;
  reason: string;
  requestedBy: string; // Police or System
  status: 'Pending' | 'Blocked' | 'Rejected';
  requestDate: Date;
  blockedDate?: Date;
  telecomOperator?: string; // Who executed it (simulated)
}

const BlockListSchema: Schema = new Schema({
  imei: { type: String, required: true, unique: true },
  reason: { type: String, required: true },
  requestedBy: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Blocked', 'Rejected'], default: 'Pending' },
  requestDate: { type: Date, default: Date.now },
  blockedDate: { type: Date },
  telecomOperator: { type: String }
});

export default mongoose.model<IBlockList>('BlockList', BlockListSchema);
