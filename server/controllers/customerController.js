import { Customer } from '../models/Customer.js';

export const createCustomer = async (req, res) => {
  try {
    const { first_name, last_name, phone_number } = req.body;
    
    // Check if phone number already exists
    const existingCustomer = await Customer.findByPhoneNumber(phone_number);
    if (existingCustomer) {
      return res.status(409).json({
        success: false,
        message: 'Phone number already exists'
      });
    }

    const customer = await Customer.create({ first_name, last_name, phone_number });
    res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      data: customer
    });
  } catch (error) {
    console.error('Create customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create customer'
    });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const { search = '', sortBy = 'first_name', sortOrder = 'ASC', page = 1, limit = 10 } = req.query;
    
    const result = await Customer.findAll({
      search,
      sortBy,
      sortOrder,
      page: parseInt(page),
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      data: result.customers,
      pagination: result.pagination
    });
  } catch (error) {
    console.error('Get customers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customers'
    });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);
    
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    res.json({
      success: true,
      data: customer
    });
  } catch (error) {
    console.error('Get customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customer'
    });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, phone_number } = req.body;

    // Check if customer exists
    const existingCustomer = await Customer.findById(id);
    if (!existingCustomer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    // Check if phone number is taken by another customer
    const phoneCheck = await Customer.findByPhoneNumber(phone_number, id);
    if (phoneCheck) {
      return res.status(409).json({
        success: false,
        message: 'Phone number already exists'
      });
    }

    const customer = await Customer.update(id, { first_name, last_name, phone_number });
    res.json({
      success: true,
      message: 'Customer updated successfully',
      data: customer
    });
  } catch (error) {
    console.error('Update customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update customer'
    });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    const deleted = await Customer.delete(id);
    if (!deleted) {
      return res.status(500).json({
        success: false,
        message: 'Failed to delete customer'
      });
    }

    res.json({
      success: true,
      message: 'Customer deleted successfully'
    });
  } catch (error) {
    console.error('Delete customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete customer'
    });
  }
};