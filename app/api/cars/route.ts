import { NextResponse } from 'next/server';
import Car from '../../models/Car';
import dbConnect from '../../utils/dbConnect';

export async function GET() {
  await dbConnect();
  const cars = await Car.find();
  return NextResponse.json(cars);
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    console.log('Request Body:', body);
    
    // Use correct field name "images"
    const { title, price, description, images, contactInfo } = body;
    
    // Validate required fields
    if (!title || !price || !description || !images || !contactInfo) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate images array
    if (!Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: 'At least one image is required' },
        { status: 400 }
      );
    }

    // Create car with correct schema
    const newCar = await Car.create({ 
      title, 
      price, 
      description, 
      images, // Array of URLs
      contactInfo, 
      status: 'available' 
    });

    return NextResponse.json(newCar, { status: 201 });
  } catch (error) {
    console.error('Database Error:', error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Database connection failed';
    return NextResponse.json(
      { error: 'Failed to create listing', details: errorMessage },
      { status: 500 }
    );
  }
}
