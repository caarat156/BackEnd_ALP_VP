import express from 'express';
import cors from 'cors';
import path from 'path';
import pensiRoutes from './routes/pensiRoutes';
import paymentRoutes from './routes/paymentRoutes';
import calendarRoutes from './routes/calendarRoutes';
import authRoutes from './routes/authRoutes';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/auth', authRoutes);
app.use('/pensi', pensiRoutes);
app.use('/payment', paymentRoutes);
app.use('/calendar', calendarRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(errorMiddleware);
