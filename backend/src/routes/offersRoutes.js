import express from 'express';
import {
  getAllOffers,
  getOfferById,
  getOffersGroupedByCompany,
} from '../services/offerService.js';
import { successResponse, handleAsyncError } from '../utils/responseHelpers.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const grouped = req.query.grouped === 'true';
    if (grouped) {
      const companies = await getOffersGroupedByCompany();
      return successResponse(res, 'Offers grouped by company fetched successfully', companies);
    }
    const offers = await getAllOffers();
    return successResponse(res, 'Offers fetched successfully', offers);
  } catch (error) {
    return handleAsyncError(res, error, 'Error fetching offers');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const offer = await getOfferById(req.params.id);
    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found',
      });
    }
    return successResponse(res, 'Offer fetched successfully', offer);
  } catch (error) {
    return handleAsyncError(res, error, 'Error fetching offer');
  }
});

export default router;

