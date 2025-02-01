'use client';
import { useEffect, useState } from 'react';
import CarCard from './components/CarCard';
import { useSession } from 'next-auth/react';

interface Car {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  contactInfo: string;
}

const Admin = () => {
  const { data: session } = useSession();
  const [cars, setCars] = useState<Car[]>([]); // Typing the cars state

  useEffect(() => {
    if (!session) {
      window.location.href = '/auth/signin';
    } else {
      const fetchCars = async () => {
        try {
          const res = await fetch('/api/cars');
          if (!res.ok) {
            throw new Error('Failed to fetch cars');
          }
          const data: Car[] = await res.json(); // Typing the fetched data
          setCars(data);
        } catch (error) {
          console.error('Error fetching cars:', error);
        }
      };
      fetchCars();
    }
  }, [session]); // Ensures the effect runs when the session changes

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      {cars.length === 0 ? (
        <p>No cars available.</p>
      ) : (
        cars.map((car) => <CarCard key={car._id} {...car} />)
      )}
    </div>
  );
};

export default Admin;
