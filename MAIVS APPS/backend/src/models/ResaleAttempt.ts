import mongoose, { Schema, Document } from 'mongoose';

export interface IResaleAttempt extends Document {
  imei: string;
  shopkeeperCNIC: string;
  attemptDate: Date;
  deviceStatus: string;
  flagged: boolean;
  policeNotified: boolean;
}

const ResaleAttemptSchema: Schema = new Schema({
  imei: { type: String, required: true },
  shopkeeperCNIC: { type: String, required: true },
  attemptDate: { type: Date, default: Date.now },
  deviceStatus: { type: String, required: true },
  flagged: { type: Boolean, default: false },
  policeNotified: { type: Boolean, default: false }
}, {
  timestamps: true
});

export default mongoose.model<IResaleAttempt>('ResaleAttempt', ResaleAttemptSchema);
