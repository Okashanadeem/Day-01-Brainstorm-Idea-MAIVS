import mongoose, { Document, Schema } from 'mongoose';

export interface IAuditLog extends Document {
  action: string;
  userId?: string;
  resourceId?: string;
  details?: any;
  ipAddress: string;
  timestamp: Date;
}

const AuditLogSchema: Schema = new Schema({
  action: { type: String, required: true },
  userId: { type: String }, // CNIC or User ID
  resourceId: { type: String }, // IMEI or FIR ID
  details: { type: Schema.Types.Mixed },
  ipAddress: { type: String },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
