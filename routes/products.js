import express from 'express';
import db from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all products for a seller
router.get('/', authenticateToken, (req, res) => {
  try {
    const products = db.getProductsBySeller(req.user.id);
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create product
router.post('/', authenticateToken, (req, res) => {
  try {
    const productData = {
      ...req.body,
      sellerId: req.user.id,
      status: 'active'
    };

    const product = db.createProduct(productData);
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update product
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = db.updateProduct(id, updates);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete product
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    
    const product = db.deleteProduct(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;