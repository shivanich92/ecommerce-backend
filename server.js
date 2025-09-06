import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('E-commerce Backend Running');
});

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));