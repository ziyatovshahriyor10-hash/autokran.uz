'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Truck, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({ sponsors: 0, cranes: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [sponsorsRes, cranesRes] = await Promise.all([
          axios.get('/api/admin/sponsors'),
          axios.get('/api/admin/cranes')
        ]);
        setStats({
          sponsors: sponsorsRes.data.length,
          cranes: cranesRes.data.length,
        });
      } catch (error: any) {
        if (error.response?.status === 401) {
          router.push('/admin/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [router]);

  if (loading) {
    return <div className="text-gray-500">Loading dashboard...</div>;
  }

  const statCards = [
    { name: 'Total Sponsors', value: stats.sponsors, icon: Users, color: 'bg-blue-500' },
    { name: 'Fleet Size (Cranes)', value: stats.cranes, icon: Truck, color: 'bg-green-500' },
    { name: 'Global Settings', value: 'Active', icon: Settings, color: 'bg-purple-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className={`p-4 rounded-full ${stat.color} text-white mr-4`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Welcome to Admin Panel</h2>
        <p className="text-gray-600">
          Use the sidebar navigation to manage your website content. You can add or remove sponsors, update your fleet of cranes, and configure global website settings such as contact information and SEO details.
        </p>
      </div>
    </div>
  );
}
