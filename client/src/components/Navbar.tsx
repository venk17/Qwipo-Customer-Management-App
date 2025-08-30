import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Plus } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">CustomerHub</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              All Customers
            </Link>
            <Link
              to="/customers/new"
              className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/customers/new')
                  ? 'bg-primary-600 text-white'
                  : 'bg-primary-500 text-white hover:bg-primary-600'
              }`}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;