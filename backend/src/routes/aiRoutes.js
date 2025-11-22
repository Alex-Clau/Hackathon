import express from 'express';
import { estimateBulkQuality } from '../services/aiService.js';
import { successResponse, handleAsyncError } from '../utils/responseHelpers.js';

const router = express.Router();

router.post('/quality-check', async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ success: false, message: 'Image data required' });
    }
    const result = await estimateBulkQuality(image);
    return successResponse(res, 'Quality check complete', result);
  } catch (error) {
    return handleAsyncError(res, error, 'Error processing quality check');
  }
});

export default router;

