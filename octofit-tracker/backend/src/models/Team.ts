import mongoose, { Schema, Types } from 'mongoose';

export interface TeamDocument {
  name: string;
  members: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

export const TeamModel = mongoose.model<TeamDocument>('Team', teamSchema);
