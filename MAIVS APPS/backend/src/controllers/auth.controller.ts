import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  try {
    const { cnic, name, password, role, phoneNumber, email } = req.body;

    // Check if user exists
    let user = await User.findOne({ cnic });
    if (user) {
      return res.status(400).json({ message: 'User already exists with this CNIC' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({
      cnic,
      name,
      password: hashedPassword,
      role: role || 'citizen',
      phoneNumber,
      email
    });

    await user.save();

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role, cnic: user.cnic },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        cnic: user.cnic,
        role: user.role
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { cnic, password } = req.body;

    // Check for user
    const user = await User.findOne({ cnic });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role, cnic: user.cnic },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        cnic: user.cnic,
        role: user.role
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
