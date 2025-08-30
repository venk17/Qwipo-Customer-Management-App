import express from 'express';
import { createAddress, getCustomerAddresses, updateAddress, deleteAddress } from '../controllers/addressController.js';
import { validateAddress, validateId, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

router.post('/customers/:id/addresses', validateId, validateAddress, handleValidationErrors, createAddress);
router.get('/customers/:id/addresses', validateId, handleValidationErrors, getCustomerAddresses);
router.put('/addresses/:addressId', validateId, validateAddress, handleValidationErrors, updateAddress);
router.delete('/addresses/:addressId', validateId, handleValidationErrors, deleteAddress);

export default router;