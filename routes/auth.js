import express from 'express';
import bcrypt from 'bcryptjs';
import db from '../config/database.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, businessName, phone, address } = req.body;

    // Check if user exists
    const existingUser = db.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = db.createUser({
      email,
      password: hashedPassword,
      name,
      businessName,
      phone,
      address,
      role: 'seller',
      status: 'active',
      upiVerified: false // Add UPI verification status field
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        businessName: user.businessName,
        upiVerified: user.upiVerified
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = db.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        businessName: user.businessName,
        upiVerified: user.upiVerified
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get current user
router.get('/me', (req, res) => {
  // Since JWT is removed, this endpoint needs to be adapted to Firebase auth or removed
  res.status(501).json({ message: 'Not implemented' });
});

// UPI ID verification route (mock implementation)
router.post('/verify-upi', async (req, res) => {
  try {
    const { upiId } = req.body;

    // Mock verification logic: check if UPI ID matches a simple pattern
    const upiPattern = /^[\\w.-]+@[\\w.-]+$/;
    if (!upiPattern.test(upiId)) {
      return res.status(400).json({ message: 'Invalid UPI ID format' });
    }

    // Simulate async verification (e.g., call to payment gateway)
    // For now, assume all valid format UPI IDs are verified successfully

    // Update user's UPI verification status in database
    // This needs to be adapted to Firebase auth or removed
    res.status(501).json({ message: 'Not implemented' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Check UPI verification status
router.get('/check-upi-verification', (req, res) => {
  // This needs to be adapted to Firebase auth or removed
  res.status(501).json({ message: 'Not implemented' });
});

export default router;
