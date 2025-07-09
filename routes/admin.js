import express from 'express';
import db from '../config/database.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Get all sellers (admin only)
router.get('/sellers', authenticateToken, requireRole('admin'), (req, res) => {
  try {
    const sellers = db.users.filter(user => user.role === 'seller');
    res.json({ sellers });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all products (admin only)
router.get('/products', authenticateToken, requireRole('admin'), (req, res) => {
  try {
    const products = db.getAllProducts();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all orders (admin only)
router.get('/orders', authenticateToken, requireRole('admin'), (req, res) => {
  try {
    const orders = db.getAllOrders();
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;