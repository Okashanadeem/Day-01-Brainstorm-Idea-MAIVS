import mongoose, { Schema, Document } from 'mongoose';

export interface IFIR extends Document {
  firNumber: string;
  imei: string;
  ownerCNIC: string;
  reportDate: Date;
  policeStation: string;
  status: 'Filed' | 'Under Investigation' | 'Closed' | 'Device Recovered';
  description: string;
}

const FIRSchema: Schema = new Schema({
  firNumber: { type: String, required: true, unique: true },
  imei: { type: String, required: true },
  ownerCNIC: { type: String, required: true },
  reportDate: { type: Date, default: Date.now },
  policeStation: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Filed', 'Under Investigation', 'Closed', 'Device Recovered'], 
    default: 'Filed' 
  },
  description: { type: String }
}, {
  timestamps: true
});

export default mongoose.model<IFIR>('FIR', FIRSchema);
