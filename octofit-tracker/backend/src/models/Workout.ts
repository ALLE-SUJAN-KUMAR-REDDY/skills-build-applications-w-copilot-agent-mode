import mongoose, { Schema, Types } from 'mongoose';

export interface WorkoutDocument {
  userId: Types.ObjectId;
  title: string;
  intensity: 'low' | 'moderate' | 'high';
  durationMinutes: number;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    intensity: { type: String, enum: ['low', 'moderate', 'high'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 }
  },
  { timestamps: true }
);

export const WorkoutModel = mongoose.model<WorkoutDocument>('Workout', workoutSchema);
