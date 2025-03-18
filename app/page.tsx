// File: app/client/CarList.tsx
'use client';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface Car {
  _id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  contactInfo: string;
  status: 'available' | 'sold' | 'pending';
}

const CarList = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  // Fetch cars from the API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('/api/cars');
        if (!res.ok) throw new Error('Failed to fetch cars');
        const data = await res.json();
        setCars(data.filter((car: Car) => car.status === 'available')); // Show only available cars
        setFilteredCars(data.filter((car: Car) => car.status === 'available'));
      } catch (error) {
        console.error(error);
      }
    };

    fetchCars();
  }, []);

  // Handle search input
  useEffect(() => {
    const filtered = cars.filter((car) =>
      car.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCars(filtered);
  }, [searchTerm, cars]);

  return (
    <div className="container mx-auto p-4">
      {/* Search Bar */}
      <div className="mb-6">
        <Label htmlFor="search" className="block text-sm font-medium mb-2">
          Search Cars
        </Label>
        <Input
          id="search"
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <Card key={car._id} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <img
                src={car.images[0] || '/placeholder.jpg'}
                alt={car.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg font-bold">{car.title}</CardTitle>
              <p className="text-gray-500">${car.price.toLocaleString()}</p>
              <p className="text-sm line-clamp-2 mt-2">{car.description}</p>
              <Button className="mt-4 w-full" asChild>
                <a href={`/client/${car._id}`}>View Details</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};


export default CarList;
