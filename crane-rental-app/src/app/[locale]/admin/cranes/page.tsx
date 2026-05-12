'use client';

import { useEffect, useState } from 'react';

export default function AdminCranes() {
  const [cranes, setCranes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', capacity_tons: 0, status: 'available' });

  const fetchCranes = async () => {
    try {
      const res = await fetch('/api/cranes');
      const data = await res.json();
      if (data.success) {
        setCranes(data.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCranes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/cranes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, capacity_tons: Number(formData.capacity_tons) }),
      });
      if (res.ok) {
        setFormData({ name: '', capacity_tons: 0, status: 'available' });
        fetchCranes();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Haqiqatan ham o`chirmoqchimisiz?')) return;
    try {
      const res = await fetch(`/api/cranes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchCranes();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Yuklanmoqda...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Kranlar</h1>
      
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Yangi kran qo'shish</h2>
        <form onSubmit={handleSubmit} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm mb-1 dark:text-gray-300">Nomi</label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
          </div>
          <div className="w-32">
            <label className="block text-sm mb-1 dark:text-gray-300">Sig'imi (tonna)</label>
            <input 
              required
              type="number" 
              value={formData.capacity_tons}
              onChange={e => setFormData({...formData, capacity_tons: e.target.value as any})}
              className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
          </div>
          <button type="submit" className="bg-brand-primary text-black px-4 py-2 rounded font-bold hover:bg-yellow-500">
            Qo'shish
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-zinc-800 border-b dark:border-zinc-700">
            <tr>
              <th className="p-4 font-medium dark:text-gray-200">Nomi</th>
              <th className="p-4 font-medium dark:text-gray-200">Sig'imi</th>
              <th className="p-4 font-medium dark:text-gray-200">Holati</th>
              <th className="p-4 font-medium dark:text-gray-200 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {cranes.map(crane => (
              <tr key={crane.id} className="border-b dark:border-zinc-800">
                <td className="p-4 dark:text-gray-300">{crane.name}</td>
                <td className="p-4 dark:text-gray-300">{crane.capacity_tons} t</td>
                <td className="p-4 dark:text-gray-300">
                  <span className={`px-2 py-1 rounded text-xs ${crane.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {crane.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(crane.id)} className="text-red-500 hover:underline">
                    O'chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
