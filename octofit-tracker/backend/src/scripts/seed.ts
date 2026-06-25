import { ActivityModel } from '../models/Activity';
import { LeaderboardModel } from '../models/Leaderboard';
import { TeamModel } from '../models/Team';
import { UserModel } from '../models/User';
import { WorkoutModel } from '../models/Workout';
import { connectDatabase, disconnectDatabase } from '../config/database';

const seedDatabase = async (): Promise<void> => {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    WorkoutModel.deleteMany({})
  ]);

  const [maya, liam, noah, ava] = await UserModel.create([
    { name: 'Maya Patel', email: 'maya.patel@octofit.test' },
    { name: 'Liam Rodriguez', email: 'liam.rodriguez@octofit.test' },
    { name: 'Noah Kim', email: 'noah.kim@octofit.test' },
    { name: 'Ava Johnson', email: 'ava.johnson@octofit.test' }
  ]);

  await TeamModel.create([
    { name: 'Morning Striders', members: [maya._id, liam._id] },
    { name: 'Peak Performers', members: [noah._id, ava._id] }
  ]);

  await ActivityModel.create([
    {
      userId: maya._id,
      type: 'Running',
      durationMinutes: 42,
      caloriesBurned: 510,
      activityDate: new Date('2026-06-23T06:45:00Z')
    },
    {
      userId: liam._id,
      type: 'Cycling',
      durationMinutes: 55,
      caloriesBurned: 620,
      activityDate: new Date('2026-06-24T07:10:00Z')
    },
    {
      userId: noah._id,
      type: 'Strength Training',
      durationMinutes: 48,
      caloriesBurned: 430,
      activityDate: new Date('2026-06-24T17:30:00Z')
    },
    {
      userId: ava._id,
      type: 'HIIT',
      durationMinutes: 35,
      caloriesBurned: 470,
      activityDate: new Date('2026-06-25T05:50:00Z')
    }
  ]);

  await LeaderboardModel.create([
    { userId: liam._id, score: 1980, rank: 1 },
    { userId: maya._id, score: 1850, rank: 2 },
    { userId: ava._id, score: 1725, rank: 3 },
    { userId: noah._id, score: 1680, rank: 4 }
  ]);

  await WorkoutModel.create([
    {
      userId: maya._id,
      title: '5K Tempo Run',
      intensity: 'moderate',
      durationMinutes: 40
    },
    {
      userId: liam._id,
      title: 'Hill Climb Ride',
      intensity: 'high',
      durationMinutes: 50
    },
    {
      userId: noah._id,
      title: 'Upper Body Blast',
      intensity: 'moderate',
      durationMinutes: 45
    },
    {
      userId: ava._id,
      title: 'Core and Cardio Circuit',
      intensity: 'high',
      durationMinutes: 30
    }
  ]);

  console.log('Seed completed for users, teams, activities, leaderboard, and workouts.');
  await disconnectDatabase();
};

void seedDatabase().catch(async (error: unknown) => {
  console.error('Seed failed:', error);
  await disconnectDatabase();
  process.exit(1);
});
