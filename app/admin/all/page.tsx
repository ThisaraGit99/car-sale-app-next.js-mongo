'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// import CarCard from '../components/CarCard';
import CarCard from '@/app/components/CarCard';
import Link from 'next/link';

interface Car {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  contactInfo: string;
}

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return; // Wait for session to load

    if (!session) {
      router.push('/auth/signin'); // Redirect using Next.js router
      return;
    }

    const fetchCars = async () => {
      try {
        const res = await fetch('/api/cars');
        if (!res.ok) throw new Error('Failed to fetch cars');
        const data = await res.json();
        setCars(data);
      } catch (err) {
        setError('Error loading cars. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [session, status, router]);

  if (status === 'loading' || loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      {cars.length === 0 ? (
        <p className="mt-4">No cars available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {cars.map((car) => (
            <CarCard images={[]} key={car._id} {...car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
