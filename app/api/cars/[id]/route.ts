import { NextResponse } from "next/server";
import Car from '../../../models/Car';
import dbConnect from '../../../utils/dbConnect';

// ✅ GET CAR BY ID (GET)
export async function GET(req: Request, { params }: { params: { id: string } }) {
    await dbConnect();
    const carId = params.id;

    try {
        // Find the car by its ID
        const car = await Car.findById(carId);
        if (!car) {
            return NextResponse.json({ error: "Car not found" }, { status: 404 });
        }
        return NextResponse.json(car);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch car" }, { status: 500 });
    }
}


// ✅ UPDATE CAR (PUT)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    await dbConnect();
    const carId = params.id;
    const body = await req.json();

    try {
        const updatedCar = await Car.findByIdAndUpdate(carId, body, { new: true });
        if (!updatedCar) return NextResponse.json({ error: "Car not found" }, { status: 404 });
        return NextResponse.json(updatedCar);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update car" }, { status: 500 });
    }
}

// ✅ DELETE CAR (DELETE)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await dbConnect();
    const carId = params.id;

    try {
        const deletedCar = await Car.findByIdAndDelete(carId);
        if (!deletedCar) return NextResponse.json({ error: "Car not found" }, { status: 404 });
        return NextResponse.json({ message: "Car deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete car" }, { status: 500 });
    }
}
