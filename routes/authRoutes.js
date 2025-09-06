// src/routes/authRoutes.js
import express from 'express';
const router = express.Router();

// Example route
router.post('/login', (req, res) => {
  res.json({ message: 'Login route works!' });
});

export default router; // ✅ must be default export
