import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import authRoutes from './routes/auth.routes';
import deviceRoutes from './routes/device.routes';
import firRoutes from './routes/fir.routes';
import resaleRoutes from './routes/resale.routes';
import adminRoutes from './routes/admin.routes';
import blockRoutes from './routes/block.routes';
import { rateLimiter } from './middleware/rateLimit.middleware';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.get('/', (req, res) => {
  res.send('MAIVS Backend API is Running');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/firs', firRoutes);
app.use('/api/resale', resaleRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/blocks', blockRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});