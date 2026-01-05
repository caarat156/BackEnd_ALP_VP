"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pensiController_1 = require("../controllers/pensiController");
const router = (0, express_1.Router)();
router.get('/', pensiController_1.getAllPensi);
router.get('/:id', pensiController_1.getPensiDetail);
router.get('/:id/schedules', pensiController_1.getSchedulesByEvent);
exports.default = router;
