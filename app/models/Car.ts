import mongoose, { Schema, Document } from 'mongoose';

export interface ICar extends Document {
  title: string;
  price: number;
  description: string;
  image: string;
  contactInfo: string;
}

const CarSchema: Schema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  contactInfo: { type: String, required: true },
});

export default mongoose.models.Car || mongoose.model<ICar>('Car', CarSchema);
