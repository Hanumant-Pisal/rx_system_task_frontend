import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import ChangePasswordForm from '../../components/auth/ChangePasswordForm';

function AdminChangePassword() {
  return (
    <AdminLayout>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl  text-gray-800 mb-6">Change Password</h2>
        <ChangePasswordForm />
      </div>
    </AdminLayout>
  );
}

export default AdminChangePassword;
