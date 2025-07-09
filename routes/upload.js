import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// POST /api/upload
// Expects: { image: <base64 string> }
router.post('/', async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }
    // Upload image to FreeImage.Host
    const formData = new URLSearchParams();
    formData.append('key', '6d207e02198a847aa98d0a2a901485a5');
    formData.append('source', image);
    const response = await fetch('https://freeimage.host/api/1/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const data = await response.json();
    if (data && data.image && data.image.url) {
      return res.json({ url: data.image.url });
    } else {
      return res.status(500).json({ error: 'Failed to upload image', details: data });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
});

export default router;
