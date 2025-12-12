import express from 'express';
import cors from 'cors';
import pensiRoutes from './routes/pensiRoutes';
import paymentRoutes from './routes/paymentRoutes';
import calendarRoutes from './routes/calendarRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/pensi', pensiRoutes);
app.use('/payment', paymentRoutes);
app.use('/calendar', calendarRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));