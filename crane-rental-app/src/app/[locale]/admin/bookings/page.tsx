'use client';

import { useEffect, useState } from 'react';

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (data.success) {
        setBookings(data.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Yuklanmoqda...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Buyurtmalar</h1>
      
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-zinc-800 border-b dark:border-zinc-700">
            <tr>
              <th className="p-4 font-medium dark:text-gray-200">Mijoz</th>
              <th className="p-4 font-medium dark:text-gray-200">Kran</th>
              <th className="p-4 font-medium dark:text-gray-200">Tel</th>
              <th className="p-4 font-medium dark:text-gray-200">Sana</th>
              <th className="p-4 font-medium dark:text-gray-200">Holat</th>
              <th className="p-4 font-medium dark:text-gray-200">Harakat</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id} className="border-b dark:border-zinc-800">
                <td className="p-4 dark:text-gray-300">{booking.client_name}</td>
                <td className="p-4 dark:text-gray-300">{booking.cranes?.name || 'O`chirilgan kran'}</td>
                <td className="p-4 dark:text-gray-300">{booking.client_phone}</td>
                <td className="p-4 dark:text-gray-300">{new Date(booking.created_at).toLocaleDateString()}</td>
                <td className="p-4">
                  <select 
                    value={booking.status}
                    onChange={(e) => updateStatus(booking.id, e.target.value)}
                    className="p-1 text-sm border rounded dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                  >
                    <option value="pending">Kutilmoqda</option>
                    <option value="confirmed">Tasdiqlangan</option>
                    <option value="completed">Bajarilgan</option>
                    <option value="cancelled">Bekor qilingan</option>
                  </select>
                </td>
                <td className="p-4">
                  <a href={`tel:${booking.client_phone}`} className="text-brand-primary hover:underline">
                    Qo'ng'iroq
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
