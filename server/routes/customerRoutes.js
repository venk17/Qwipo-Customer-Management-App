import express from 'express';
import { createCustomer, getAllCustomers, getCustomerById, updateCustomer, deleteCustomer } from '../controllers/customerController.js';
import { validateCustomer, validateId, validatePagination, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

router.post('/', validateCustomer, handleValidationErrors, createCustomer);
router.get('/', validatePagination, handleValidationErrors, getAllCustomers);
router.get('/:id', validateId, handleValidationErrors, getCustomerById);
router.put('/:id', validateId, validateCustomer, handleValidationErrors, updateCustomer);
router.delete('/:id', validateId, handleValidationErrors, deleteCustomer);

export default router;