import React, { useState, useEffect } from 'react';
import { customerAPI } from '../utils/api.js';
import CustomerList from '../components/CustomerList';
import SearchAndFilter from '../components/SearchAndFilter';
import Pagination from '../components/Pagination';
import { Users } from 'lucide-react';

interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  address_count: number;
  created_at: string;
}

interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const CustomerListPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('first_name');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });

  useEffect(() => {
    loadCustomers();
  }, [searchTerm, sortBy, sortOrder, pagination.page]);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const response = await customerAPI.getAllCustomers({
        search: searchTerm,
        sortBy,
        sortOrder,
        page: pagination.page,
        limit: pagination.limit
      });

      if (response.data.success) {
        setCustomers(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Error loading customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  };

  const handleSortChange = (field: string) => {
    setSortBy(field);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  };

  const handleSortOrderToggle = () => {
    setSortOrder(prev => prev === 'ASC' ? 'DESC' : 'ASC');
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handleDeleteCustomer = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this customer? This will also delete all their addresses.')) {
      return;
    }

    try {
      await customerAPI.deleteCustomer(id);
      loadCustomers(); // Reload the list
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Failed to delete customer. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="h-8 w-8 mr-3 text-primary-600" />
            Customer Management
          </h1>
          <p className="text-gray-600 mt-1">Manage your customer database</p>
        </div>
        
        <div className="text-sm text-gray-500">
          Total: {pagination.total} customer{pagination.total !== 1 ? 's' : ''}
        </div>
      </div>

      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        onSortOrderToggle={handleSortOrderToggle}
      />

      <CustomerList 
        customers={customers} 
        onDelete={handleDeleteCustomer}
        loading={loading}
      />

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
        total={pagination.total}
        limit={pagination.limit}
      />
    </div>
  );
};

export default CustomerListPage;