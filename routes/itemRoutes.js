// src/routes/itemRoutes.js
import express from 'express';
const router = express.Router();

// Example route
router.get('/', (req, res) => {
  res.json({ message: 'Items route works!' });
});

export default router; // ✅ default export
