import mongoose, { Schema, Document } from 'mongoose';

export interface IDevice extends Document {
  imei: string;
  brand: string;
  deviceModel: string; // Renamed from 'model' to avoid conflict with Mongoose Document.model()
  ownerCNIC: string;
  status: 'Active' | 'Stolen' | 'Under Investigation' | 'Recovered' | 'Blocked';
  registrationDate: Date;
  ownershipHistory: any[];
}

const DeviceSchema: Schema = new Schema({
  imei: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  deviceModel: { type: String, required: true },
  ownerCNIC: { type: String, required: true, ref: 'User' },
  status: { 
    type: String, 
    enum: ['Active', 'Stolen', 'Under Investigation', 'Recovered', 'Blocked'], 
    default: 'Active' 
  },
  registrationDate: { type: Date, default: Date.now },
  ownershipHistory: [{
    fromCNIC: String,
    toCNIC: String,
    date: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

export default mongoose.model<IDevice>('Device', DeviceSchema);