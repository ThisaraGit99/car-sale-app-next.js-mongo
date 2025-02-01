import React from 'react';

interface CarProps {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  contactInfo: string;
}

const CarCard = ({ _id, title, price, description, image, contactInfo }: CarProps) => {
  return (
    <div className="border rounded-md p-4 shadow-lg">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <h2 className="text-xl font-bold mt-2">{title}</h2>
      <p className="text-gray-700 mt-1">{description}</p>
      <p className="text-lg font-semibold mt-2">Price: ${price}</p>
      <p className="text-sm text-gray-500 mt-1">Contact: {contactInfo}</p>
    </div>
  );
};

export default CarCard;
