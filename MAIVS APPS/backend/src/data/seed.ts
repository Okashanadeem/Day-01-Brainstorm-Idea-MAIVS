import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Device from '../models/Device';
import FIR from '../models/FIR';
import ResaleAttempt from '../models/ResaleAttempt';

dotenv.config();

const generateLuhnValidIMEI = (prefix: string): string => {
  let imei = prefix.padEnd(14, '0').split('').map(Number);
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    let d = imei[i];
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  let checkDigit = (10 - (sum % 10)) % 10;
  return prefix.padEnd(14, '0') + checkDigit;
};

const seed = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/maivs';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Device.deleteMany({});
    await FIR.deleteMany({});
    await ResaleAttempt.deleteMany({});
    console.log('Cleared all existing data.');

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    // --- Create Users ---
    // Police
    const police = await User.create({
      cnic: '0000000000001',
      name: 'Officer Jadoon',
      password,
      role: 'police',
      phoneNumber: '+923001112223'
    });
    console.log('Created Police:', police.name, police.cnic);

    // Admin
    const admin = await User.create({
      cnic: '0000000000002',
      name: 'Super Admin',
      password,
      role: 'admin'
    });
    console.log('Created Admin:', admin.name, admin.cnic);

    // Telecom Operator
    const telecomUser = await User.create({
      cnic: 'telecom', // Special ID for demo login
      name: 'Telecom Operator',
      password, // Same password123
      role: 'telecom'
    });
    console.log('Created Telecom Operator:', telecomUser.name, telecomUser.cnic);

    // Shopkeeper
    const shopkeeper = await User.create({
      cnic: '4210200000001',
      name: 'Shopkeeper Ali',
      password,
      role: 'shopkeeper'
    });
    console.log('Created Shopkeeper:', shopkeeper.name, shopkeeper.cnic);

    // Citizens (Fixed IDs for predictability)
    const citizens = [];
    for (let i = 1; i <= 3; i++) {
      const u = await User.create({
        cnic: `421010000000${i}`,
        name: `Citizen ${i}`,
        password,
        role: 'citizen',
        phoneNumber: `+92300000000${i}`
      });
      citizens.push(u);
      console.log(`Created Citizen ${i}:`, u.name, u.cnic);
    }

    // --- Create Devices ---
    
    // Device 1: Stolen (Owned by Citizen 1)
    const stolenDevice1 = await Device.create({
      imei: generateLuhnValidIMEI('35204600000001'), 
      brand: 'Samsung',
      deviceModel: 'Galaxy S24 Ultra',
      ownerCNIC: citizens[0].cnic,
      status: 'Stolen'
    });
    console.log('Created STOLEN Device:', stolenDevice1.imei, 'Owner:', citizens[0].cnic);

    // Device 2: Active (Owned by Citizen 1) - For Theft Reporting
    const activeDevice1 = await Device.create({
      imei: generateLuhnValidIMEI('35204600000002'),
      brand: 'Apple',
      deviceModel: 'iPhone 15 Pro',
      ownerCNIC: citizens[0].cnic,
      status: 'Active'
    });
    console.log('Created ACTIVE Device:', activeDevice1.imei, 'Owner:', citizens[0].cnic);

    // Device 3: Active (Owned by Citizen 2) - For Transfer Scenario
    const activeDevice2 = await Device.create({
      imei: generateLuhnValidIMEI('35204600000003'),
      brand: 'Google',
      deviceModel: 'Pixel 8',
      ownerCNIC: citizens[1].cnic,
      status: 'Active'
    });
    console.log('Created ACTIVE Device:', activeDevice2.imei, 'Owner:', citizens[1].cnic);

    // Device 4: Active (Owned by Citizen 3) - Just so everyone has one
    const activeDevice3 = await Device.create({
      imei: generateLuhnValidIMEI('35204600000004'),
      brand: 'OnePlus',
      deviceModel: '12R',
      ownerCNIC: citizens[2].cnic,
      status: 'Active'
    });
    console.log('Created ACTIVE Device:', activeDevice3.imei, 'Owner:', citizens[2].cnic);

    // Device 5: Active (Owned by Shopkeeper) - Personal device
    const shopkeeperDevice = await Device.create({
      imei: generateLuhnValidIMEI('35204600000005'),
      brand: 'Samsung',
      deviceModel: 'Galaxy A54',
      ownerCNIC: shopkeeper.cnic,
      status: 'Active'
    });
    console.log('Created ACTIVE Device:', shopkeeperDevice.imei, 'Owner:', shopkeeper.cnic);


    // --- Create FIR for the Stolen Device ---
    await FIR.create({
      firNumber: 'FIR-2026-001',
      imei: stolenDevice1.imei,
      ownerCNIC: citizens[0].cnic,
      policeStation: 'Saddar Station',
      status: 'Under Investigation',
      description: 'Snatched at gunpoint near Empress Market.'
    });
    console.log('Created FIR for Stolen Device:', stolenDevice1.imei);

    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seed();