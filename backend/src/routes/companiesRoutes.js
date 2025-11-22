import express from 'express';
import { getAllCompanies, getCompanyById } from '../services/companyService.js';
import { successResponse, handleAsyncError } from '../utils/responseHelpers.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const companies = await getAllCompanies();
    return successResponse(res, 'Companies fetched successfully', companies);
  } catch (error) {
    return handleAsyncError(res, error, 'Error fetching companies');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const company = await getCompanyById(req.params.id);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found',
      });
    }
    return successResponse(res, 'Company fetched successfully', company);
  } catch (error) {
    return handleAsyncError(res, error, 'Error fetching company');
  }
});

export default router;

