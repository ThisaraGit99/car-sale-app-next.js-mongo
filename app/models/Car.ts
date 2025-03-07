import mongoose, { Schema, Document } from 'mongoose';

export interface ICar extends Document {
  title: string;
  price: number;
  description: string;
  image: string;
  contactInfo: string;
  status: string; // Added missing status field
  createdAt?: Date;
  updatedAt?: Date;
}

const CarSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }], // Array of strings
    contactInfo: { type: String, required: true },
    status: {  // Added status field to schema
      type: String,
      enum: ['available', 'sold', 'pending'],
      default: 'available'
    }
  },
  { 
    timestamps: true 
  }
);

// Better way to handle existing models
export default mongoose.models.Car<ICar> || mongoose.model<ICar>('Car', CarSchema);