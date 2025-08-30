import React, { useState } from 'react';
import { MapPin, Save, X } from 'lucide-react';

interface Address {
  id?: number;
  customer_id?: number;
  address_details: string;
  city: string;
  state: string;
  pin_code: string;
}

interface AddressFormProps {
  address?: Address;
  onSubmit: (data: Omit<Address, 'id' | 'customer_id'>) => void;
  onCancel: () => void;
  submitting?: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({ 
  address, 
  onSubmit, 
  onCancel, 
  submitting = false 
}) => {
  const [formData, setFormData] = useState({
    address_details: address?.address_details || '',
    city: address?.city || '',
    state: address?.state || '',
    pin_code: address?.pin_code || ''
  });
  
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.address_details.trim()) {
      newErrors.address_details = 'Address details are required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.pin_code.trim()) {
      newErrors.pin_code = 'PIN code is required';
    } else if (!/^\d{6}$/.test(formData.pin_code)) {
      newErrors.pin_code = 'PIN code must be exactly 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-primary-600" />
          {address ? 'Edit Address' : 'Add New Address'}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <label htmlFor="address_details" className="block text-sm font-medium text-gray-700 mb-2">
            Address Details
          </label>
          <textarea
            id="address_details"
            name="address_details"
            rows={3}
            value={formData.address_details}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
              errors.address_details ? 'border-error-500' : 'border-gray-300'
            }`}
            placeholder="Enter complete address details"
          />
          {errors.address_details && (
            <p className="mt-1 text-sm text-error-600">{errors.address_details}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.city ? 'border-error-500' : 'border-gray-300'
              }`}
              placeholder="Enter city"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-error-600">{errors.city}</p>
            )}
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.state ? 'border-error-500' : 'border-gray-300'
              }`}
              placeholder="Enter state"
            />
            {errors.state && (
              <p className="mt-1 text-sm text-error-600">{errors.state}</p>
            )}
          </div>
        </div>

        <div className="md:w-1/2">
          <label htmlFor="pin_code" className="block text-sm font-medium text-gray-700 mb-2">
            PIN Code
          </label>
          <input
            type="text"
            id="pin_code"
            name="pin_code"
            value={formData.pin_code}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
              errors.pin_code ? 'border-error-500' : 'border-gray-300'
            }`}
            placeholder="Enter 6-digit PIN code"
            maxLength={6}
          />
          {errors.pin_code && (
            <p className="mt-1 text-sm text-error-600">{errors.pin_code}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="h-4 w-4 mr-2" />
            {submitting ? 'Saving...' : address ? 'Update Address' : 'Add Address'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;