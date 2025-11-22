import express from 'express';
import { getUserOffers } from '../services/userOfferService.js';
import { successResponse, handleAsyncError } from '../utils/responseHelpers.js';

const router = express.Router();

router.get('/:userId/offers', async (req, res) => {
  try {
    const userOffers = await getUserOffers(req.params.userId);
    return successResponse(res, 'User offers fetched successfully', userOffers);
  } catch (error) {
    return handleAsyncError(res, error, 'Error fetching user offers');
  }
});

export default router;

