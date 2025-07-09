import express from 'express';
import db from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get dashboard analytics
router.get('/analytics', authenticateToken, (req, res) => {
  try {
    const analytics = db.getAnalytics(req.user.id);
    
    // Generate sample chart data
    const chartData = [
      { name: 'Jan', sales: 4000, revenue: 240000 },
      { name: 'Feb', sales: 3000, revenue: 180000 },
      { name: 'Mar', sales: 5000, revenue: 300000 },
      { name: 'Apr', sales: 4500, revenue: 270000 },
      { name: 'May', sales: 6000, revenue: 360000 },
      { name: 'Jun', sales: 5500, revenue: 330000 },
    ];

    res.json({
      analytics,
      chartData,
      recentOrders: db.getOrdersBySeller(req.user.id).slice(0, 5),
      lowStockProducts: db.getProductsBySeller(req.user.id).filter(p => p.stock < 10)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;