import { NextResponse } from 'next/server';
import Car from '@/app/models/Car';
import dbConnect from '@/app/utils/dbConnect';

export async function GET() {
  await dbConnect();

  // Get car statistics only (no authorization check)
  const carStats = await Car.aggregate([
    { 
      $group: { 
        _id: '$status',
        count: { $sum: 1 },
        avgPrice: { $avg: "$price" }
      } 
    }
  ]);

  return NextResponse.json({
    cars: carStats.reduce((acc, { _id, count, avgPrice }) => ({
      ...acc, 
      [_id]: {
        count,
        avgPrice: avgPrice ? Number(avgPrice.toFixed(2)) : 0
      }
    }), {}),
  });
}