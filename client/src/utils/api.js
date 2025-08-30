import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const customerAPI = {
  // Customer CRUD operations
  createCustomer: (data) => api.post('/customers', data),
  getAllCustomers: (params = {}) => api.get('/customers', { params }),
  getCustomerById: (id) => api.get(`/customers/${id}`),
  updateCustomer: (id, data) => api.put(`/customers/${id}`, data),
  deleteCustomer: (id) => api.delete(`/customers/${id}`),

  // Address operations
  createAddress: (customerId, data) => api.post(`/customers/${customerId}/addresses`, data),
  getCustomerAddresses: (customerId) => api.get(`/customers/${customerId}/addresses`),
  updateAddress: (addressId, data) => api.put(`/addresses/${addressId}`, data),
  deleteAddress: (addressId) => api.delete(`/addresses/${addressId}`)
};

export default api;