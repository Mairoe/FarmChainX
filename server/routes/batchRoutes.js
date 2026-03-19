import express from 'express';
import { getBatches, createBatch, updateBatch, deleteBatch } from '../controllers/batchController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// protect middleware ensures all routes below require authentication
router.route('/')
  .get(protect, getBatches)
  .post(protect, createBatch);

router.route('/:id')
  .put(protect, updateBatch)
  .delete(protect, deleteBatch);

export default router;
