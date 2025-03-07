// app/models/ActivityLog.ts
import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  action: { 
    type: String, 
    required: true,
    enum: ['car-added', 'car-edited', 'car-deleted'] 
  },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
  adminEmail: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.ActivityLog || mongoose.model('ActivityLog', activitySchema);