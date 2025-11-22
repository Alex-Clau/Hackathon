import express from 'express';
import { getAdminStats } from '../services/adminService.js';
import { getAdminMetadataByEmail } from '../services/userService.js';
import { successResponse, handleAsyncError } from '../utils/responseHelpers.js';

const router = express.Router();

router.get('/stats/:email', async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);
    const adminMetadata = await getAdminMetadataByEmail(email);
    if (!adminMetadata || !adminMetadata.companyId) {
      return res.status(404).json({
        success: false,
        message: 'Admin metadata not found or no company assigned',
      });
    }
    const stats = await getAdminStats(adminMetadata.companyId);
    return successResponse(res, 'Admin stats fetched successfully', stats);
  } catch (error) {
    return handleAsyncError(res, error, 'Error fetching admin stats');
  }
});

export default router;

