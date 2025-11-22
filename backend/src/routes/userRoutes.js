import express from 'express';
import { getUserByUid, createOrUpdateUser, getAdminMetadataByEmail } from '../services/userService.js';
import { successResponse, handleAsyncError } from '../utils/responseHelpers.js';

const router = express.Router();

router.get('/:uid', async (req, res) => {
  try {
    const user = await getUserByUid(req.params.uid);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    return successResponse(res, 'User fetched successfully', user);
  } catch (error) {
    return handleAsyncError(res, error, 'Error fetching user');
  }
});

router.post('/:uid', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    const adminMetadata = await getAdminMetadataByEmail(email);
    const role = adminMetadata ? adminMetadata.role : 'client';

    const userData = {
      role,
    };

    const user = await createOrUpdateUser(req.params.uid, userData);
    return successResponse(res, 'User created/updated successfully', user);
  } catch (error) {
    return handleAsyncError(res, error, 'Error creating/updating user');
  }
});

export default router;
