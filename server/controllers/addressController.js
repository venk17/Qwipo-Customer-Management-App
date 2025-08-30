import { Address } from '../models/Address.js';
import { Customer } from '../models/Customer.js';

export const createAddress = async (req, res) => {
  try {
    const { id: customer_id } = req.params;
    const { address_details, city, state, pin_code } = req.body;

    // Check if customer exists
    const customer = await Customer.findById(customer_id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    const address = await Address.create({ customer_id, address_details, city, state, pin_code });
    res.status(201).json({
      success: true,
      message: 'Address created successfully',
      data: address
    });
  } catch (error) {
    console.error('Create address error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create address'
    });
  }
};

export const getCustomerAddresses = async (req, res) => {
  try {
    const { id: customer_id } = req.params;

    // Check if customer exists
    const customer = await Customer.findById(customer_id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    const addresses = await Address.findByCustomerId(customer_id);
    res.json({
      success: true,
      data: addresses
    });
  } catch (error) {
    console.error('Get addresses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch addresses'
    });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { address_details, city, state, pin_code } = req.body;

    const existingAddress = await Address.findById(addressId);
    if (!existingAddress) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    const address = await Address.update(addressId, { address_details, city, state, pin_code });
    res.json({
      success: true,
      message: 'Address updated successfully',
      data: address
    });
  } catch (error) {
    console.error('Update address error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update address'
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    const deleted = await Address.delete(addressId);
    if (!deleted) {
      return res.status(500).json({
        success: false,
        message: 'Failed to delete address'
      });
    }

    res.json({
      success: true,
      message: 'Address deleted successfully'
    });
  } catch (error) {
    console.error('Delete address error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete address'
    });
  }
};