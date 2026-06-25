import mongoose, { Schema, Types } from 'mongoose';

export interface LeaderboardDocument {
  userId: Types.ObjectId;
  score: number;
  rank: number;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<LeaderboardDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 }
  },
  { timestamps: true }
);

export const LeaderboardModel = mongoose.model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
