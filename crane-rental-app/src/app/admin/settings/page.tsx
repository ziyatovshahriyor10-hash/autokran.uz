'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('/api/admin/settings');
        if (res.data) {
          setValue('phoneNumbers', res.data.phoneNumbers?.join(', ') || '');
          setValue('telegramBot', res.data.telegramBot || '');
          setValue('address', res.data.address || '');
          setValue('seoTitle', res.data.seoTitle || '');
          setValue('seoDescription', res.data.seoDescription || '');
        }
      } catch (err) {
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [setValue]);

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      phoneNumbers: data.phoneNumbers ? data.phoneNumbers.split(',').map((p: string) => p.trim()) : [],
    };

    try {
      await axios.post('/api/admin/settings', payload);
      toast.success('Settings saved successfully');
    } catch (err) {
      toast.error('Failed to save settings');
    }
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Global Site Settings</h1>
      
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Information</h3>
              <p className="mt-1 text-sm text-gray-500">Public contact details displayed on the website.</p>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Phone Numbers (comma separated)</label>
              <input {...register('phoneNumbers')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">Telegram Bot Link</label>
              <input {...register('telegramBot')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="https://t.me/..." />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Physical Address</label>
              <textarea {...register('address')} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            <div className="sm:col-span-2 border-t pt-6 mt-2">
              <h3 className="text-lg leading-6 font-medium text-gray-900">SEO Settings</h3>
              <p className="mt-1 text-sm text-gray-500">Configure global metadata for search engines.</p>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Default SEO Title</label>
              <input {...register('seoTitle')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Default SEO Description</label>
              <textarea {...register('seoDescription')} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div className="pt-5 border-t">
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="ml-3 inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                <Save size={18} className="mr-2" />
                {isSubmitting ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
