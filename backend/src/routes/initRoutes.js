import express from 'express';
import {
  initCompanies,
  initOffers,
  initUsers,
  initUsersOffers,
  initAll,
} from '../services/initService.js';
import { initAdminMetadata } from '../services/adminMetadataService.js';
import {
  getCompanyIdsByOrder,
  getUserIdsByOrder,
  getOfferIdsByOrder,
} from '../utils/dbHelpers.js';
import { successResponse, errorResponse, handleAsyncError } from '../utils/responseHelpers.js';

const router = express.Router();

router.post('/companies', async (req, res) => {
  try {
    const result = await initCompanies();
    return successResponse(res, `Initialized ${result.count} companies`, result);
  } catch (error) {
    return handleAsyncError(res, error, 'Error initializing companies');
  }
});

router.post('/offers', async (req, res) => {
  try {
    const companyIds = await getCompanyIdsByOrder();
    if (companyIds.length === 0) {
      return errorResponse(res, 400, 'Companies must be initialized first');
    }

    const result = await initOffers(companyIds);
    return successResponse(res, `Initialized ${result.count} offers`, result);
  } catch (error) {
    return handleAsyncError(res, error, 'Error initializing offers');
  }
});

router.post('/users', async (req, res) => {
  try {
    const result = await initUsers();
    return successResponse(res, result.message || 'Users initialization info', result);
  } catch (error) {
    return handleAsyncError(res, error, 'Error initializing users');
  }
});

router.post('/admin-metadata', async (req, res) => {
  try {
    const companyIds = await getCompanyIdsByOrder();
    if (companyIds.length === 0) {
      return errorResponse(res, 400, 'Companies must be initialized first');
    }
    const result = await initAdminMetadata(companyIds);
    return successResponse(res, `Initialized ${result.count} admin metadata entries`, result);
  } catch (error) {
    return handleAsyncError(res, error, 'Error initializing admin metadata');
  }
});

router.post('/users-offers', async (req, res) => {
  try {
    const [userIds, offerIds] = await Promise.all([
      getUserIdsByOrder(),
      getOfferIdsByOrder(),
    ]);

    if (userIds.length === 0 || offerIds.length === 0) {
      return errorResponse(res, 400, 'Users and offers must be initialized first');
    }

    const result = await initUsersOffers(userIds, offerIds);
    return successResponse(res, `Initialized ${result.count} user-offer relationships`, result);
  } catch (error) {
    return handleAsyncError(res, error, 'Error initializing users-offers');
  }
});

router.post('/all', async (req, res) => {
  try {
    const results = await initAll();
    return successResponse(res, 'Database initialized successfully', results);
  } catch (error) {
    return handleAsyncError(res, error, 'Error initializing database');
  }
});

export default router;
