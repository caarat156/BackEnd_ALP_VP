import express, { Router } from 'express';
import authRoutes from './authRoutes';
import locationRoutes from './locationRoutes';
import placeCategoryRoutes from './placeCategoryRoutes';
import placeRoutes from './placeRoutes';

const publicRoutes: Router = express.Router();

// Auth routes (register, login)
publicRoutes.use('/auth', authRoutes);

// Read-only location data
publicRoutes.use('/locations', locationRoutes);

// Read-only category data
publicRoutes.use('/categories', placeCategoryRoutes);

// Read-only place data with filtering
publicRoutes.use('/places', placeRoutes);

export default publicRoutes;
