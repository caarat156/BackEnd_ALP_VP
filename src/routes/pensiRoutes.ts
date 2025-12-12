import { Router } from 'express';
import { getAllPensi, getPensiDetail, getSchedulesByEvent } from '../controllers/pensiController';

const router = Router();

router.get('/', getAllPensi);
router.get('/:id', getPensiDetail);
router.get('/:id/schedules', getSchedulesByEvent);

export default router;