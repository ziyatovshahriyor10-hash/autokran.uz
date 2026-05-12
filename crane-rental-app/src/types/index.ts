export interface User {
  id: string;
  email: string;
  password_hash: string;
  name: string | null;
  phone: string | null;
  role: 'user' | 'admin';
  created_at: string;
}

export interface Crane {
  id: string;
  name: string;
  capacity_tons: number;
  boom_length_m: number | null;
  price_per_day: number | null;
  status: 'available' | 'rented' | 'maintenance';
  description: string | null;
  image_url: string | null;
  created_at: string;
}

export interface Booking {
  id: string;
  crane_id: string;
  client_name: string;
  client_phone: string;
  client_email: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  total_price: number | null;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  message: string | null;
  created_at: string;
}
