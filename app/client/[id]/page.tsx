// File: app/client/[id]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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

const CarDetails = ({ params }: { params: { id: string } }) => {
  const [car, setCar] = useState<Car | null>(null);
  const router = useRouter();

  // Fetch car details
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const res = await fetch(`/api/cars/${params.id}`);
        if (!res.ok) throw new Error('Failed to fetch car details');
        const data = await res.json();
        setCar(data);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch car details');
      }
    };

    fetchCarDetails();
  }, [params.id]);

  if (!car) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{car.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Image Carousel */}
          <div className="relative h-64 overflow-hidden rounded-lg mb-4">
            <img
              src={car.images[0] || '/placeholder.jpg'}
              alt={car.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <p className="text-lg font-semibold">${car.price.toLocaleString()}</p>
          <p className="text-gray-600 mt-2">{car.description}</p>
          <p className="mt-4">
            <strong>Contact:</strong> {car.contactInfo}
          </p>

          {/* Back Button */}
          <Button className="mt-6" onClick={() => router.back()}>
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarDetails;