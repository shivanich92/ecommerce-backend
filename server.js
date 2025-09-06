import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));

app.get('/', (_req,res)=> res.json({status:'ok'}));
app.use('/auth', authRoutes);
app.use('/items', productRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log('MongoDB connected');
  app.listen(PORT, ()=> console.log('Server listening on', PORT));
}).catch(e=>{
  console.error('DB connect error', e);
  process.exit(1);
});
