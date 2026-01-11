import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../app/hooks';
import { changePasswordThunk } from '../../features/auth/authThunks';
import { validators } from '../../utils/validators';

const ChangePasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = async (data) => {
    if (!validators.password(data.newPassword)) {
      setError('Password must be 8–16 chars, include 1 uppercase and 1 special character.');
      return;
    }
    setError(null);
    setLoading(true);
    
    try {
      const res = await dispatch(changePasswordThunk({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      }));
      
      if (res.meta.requestStatus === 'fulfilled') {
        setMsg('Password changed successfully');
        toast.success('Password changed successfully');
        setTimeout(() => navigate(-1), 1500); 
      } else {
        setError(res.payload || 'Failed to change password');
        toast.error(res.payload || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setError('An unexpected error occurred');
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Current Password
        </label>
        <input
          id="currentPassword"
          type="password"
          className={`w-full px-3 py-2 border rounded-md ${
            errors.currentPassword ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('currentPassword', { required: 'Current password is required' })}
        />
        {errors.currentPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
          New Password
        </label>
        <input
          id="newPassword"
          type="password"
          className={`w-full px-3 py-2 border rounded-md ${
            errors.newPassword ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('newPassword', {
            required: 'New password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
        {errors.newPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm New Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          className={`w-full px-3 py-2 border rounded-md ${
            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('confirmPassword', {
            validate: (value) =>
              value === watch('newPassword') || 'Passwords do not match',
          })}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {msg && <p className="mt-1 text-sm text-green-600">{msg}</p>}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Changing Password...' : 'Change Password'}
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
