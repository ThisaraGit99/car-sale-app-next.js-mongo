import { NextResponse } from 'next/server';
import Car from '../../models/Car';
import dbConnect from '../../utils/dbConnect';

export async function GET() {
  await dbConnect();
  const cars = await Car.find();
  return NextResponse.json(cars);
}

export async function POST(request: Request) {
  await dbConnect();
  const { title, price, description, image, contactInfo } = await request.json();
  const newCar = new Car({ title, price, description, image, contactInfo });
  await newCar.save();
  return NextResponse.json(newCar, { status: 201 });
}
