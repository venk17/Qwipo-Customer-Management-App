import React from 'react';
import { useParams } from 'react-router-dom';
import CustomerForm from '../components/CustomerForm';

const CustomerFormPage: React.FC = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);

  return (
    <div className="space-y-6">
      <CustomerForm isEdit={isEdit} />
    </div>
  );
};

export default CustomerFormPage;