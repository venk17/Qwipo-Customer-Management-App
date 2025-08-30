import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { customerAPI } from '../utils/api.js';
import AddressList from '../components/AddressList';
import AddressForm from '../components/AddressForm';
import { User, Phone, Calendar, Edit, ArrowLeft, Trash2 } from 'lucide-react';

interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  address_count: number;
  created_at: string;
}

interface Address {
  id: number;
  customer_id: number;
  address_details: string;
  city: string;
  state: string;
  pin_code: string;
  created_at: string;
}

const CustomerDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [addressesLoading, setAddressesLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      loadCustomer();
      loadAddresses();
    }
  }, [id]);

  const loadCustomer = async () => {
    try {
      setLoading(true);
      const response = await customerAPI.getCustomerById(id!);
      if (response.data.success) {
        setCustomer(response.data.data);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error loading customer:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const loadAddresses = async () => {
    try {
      setAddressesLoading(true);
      const response = await customerAPI.getCustomerAddresses(id!);
      if (response.data.success) {
        setAddresses(response.data.data);
      }
    } catch (error) {
      console.error('Error loading addresses:', error);
    } finally {
      setAddressesLoading(false);
    }
  };

  const handleAddAddress = () => {
    setEditingAddress(null);
    setShowAddressForm(true);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  const handleAddressSubmit = async (data: Omit<Address, 'id' | 'customer_id'>) => {
    try {
      setSubmitting(true);
      
      if (editingAddress) {
        await customerAPI.updateAddress(editingAddress.id, data);
      } else {
        await customerAPI.createAddress(id!, data);
      }
      
      setShowAddressForm(false);
      setEditingAddress(null);
      loadAddresses();
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    if (!window.confirm('Are you sure you want to delete this address?')) {
      return;
    }

    try {
      await customerAPI.deleteAddress(addressId);
      loadAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
      alert('Failed to delete address. Please try again.');
    }
  };

  const handleDeleteCustomer = async () => {
    if (!window.confirm('Are you sure you want to delete this customer? This will also delete all their addresses.')) {
      return;
    }

    try {
      await customerAPI.deleteCustomer(id!);
      navigate('/');
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Failed to delete customer. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/5"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Customer not found</p>
        <Link to="/" className="text-primary-600 hover:text-primary-700 mt-2 inline-block">
          Back to customers
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </button>
      </div>

      {/* Customer Info */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <User className="h-8 w-8 mr-3 text-primary-600" />
              {customer.first_name} {customer.last_name}
            </h1>
            <div className="flex items-center space-x-3">
              <Link
                to={`/customers/${customer.id}/edit`}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
              <button
                onClick={handleDeleteCustomer}
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium">{customer.phone_number}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Customer Since</p>
                <p className="font-medium">{formatDate(customer.created_at)}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Customer ID</p>
                <p className="font-medium">#{customer.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Form */}
      {showAddressForm && (
        <AddressForm
          address={editingAddress || undefined}
          onSubmit={handleAddressSubmit}
          onCancel={() => {
            setShowAddressForm(false);
            setEditingAddress(null);
          }}
          submitting={submitting}
        />
      )}

      {/* Addresses */}
      <AddressList
        addresses={addresses}
        onEdit={handleEditAddress}
        onDelete={handleDeleteAddress}
        onAdd={handleAddAddress}
        loading={addressesLoading}
      />
    </div>
  );
};

export default CustomerDetailPage;