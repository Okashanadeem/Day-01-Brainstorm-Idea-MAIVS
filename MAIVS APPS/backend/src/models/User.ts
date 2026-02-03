import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  cnic: string;
  name: string;
  password?: string;
  role: 'citizen' | 'shopkeeper' | 'police' | 'admin' | 'telecom';
  phoneNumber?: string;
  email?: string;
  ownedDevices: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  cnic: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['citizen', 'shopkeeper', 'police', 'admin', 'telecom'], default: 'citizen' },
  phoneNumber: { type: String },
  email: { type: String },
  ownedDevices: [{ type: Schema.Types.ObjectId, ref: 'Device' }]
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);
