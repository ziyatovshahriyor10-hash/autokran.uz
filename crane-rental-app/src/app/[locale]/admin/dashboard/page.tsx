'use client';

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalCranes: 0, totalBookings: 0, pendingBookings: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  if (loading) return <div>Yuklanmoqda...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
          <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Umumiy Kranlar</h2>
          <p className="text-4xl font-bold mt-2 dark:text-white">{stats.totalCranes}</p>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
          <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Barcha Buyurtmalar</h2>
          <p className="text-4xl font-bold mt-2 dark:text-white">{stats.totalBookings}</p>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
          <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Yangi Buyurtmalar (Kutilmoqda)</h2>
          <p className="text-4xl font-bold mt-2 text-brand-primary">{stats.pendingBookings}</p>
        </div>
      </div>
    </div>
  );
}
