import mongoose, { Schema, Types } from 'mongoose';

export interface ActivityDocument {
  userId: Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  activityDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    activityDate: { type: Date, required: true }
  },
  { timestamps: true }
);

export const ActivityModel = mongoose.model<ActivityDocument>('Activity', activitySchema);
