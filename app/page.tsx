'use client';

import { useEffect, useState } from 'react';
import CarCard from './components/CarCard';

interface Car {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  contactInfo: string;
}

const Home = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('/api/cars');
        const data: Car[] = await res.json();
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {cars.length === 0 ? (
        <p>No cars available.</p>
      ) : (
        cars.map((car) => <CarCard key={car._id} {...car} />)
      )}
    </div>
  );
};

export default Home;
