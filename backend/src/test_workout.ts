import { WorkoutService } from './services/WorkoutService';
import prisma from './lib/prisma';

// Mock prisma.workout.create
// @ts-ignore
prisma.workout.create = async (args: any) => {
  console.log('MOCK prisma.workout.create called with:', JSON.stringify(args, null, 2));
  return {
    id: 'mock-id',
    ...args.data,
    timestamp: new Date()
  };
};

async function test() {
  console.log('Testing updated WorkoutService.createWorkout...');
  
  const userId = 'user-123';
  const type = 'Leg Day';
  const weight = 50;
  const reps = 10;

  try {
    const workout = await WorkoutService.createWorkout(userId, type, weight, reps);
    console.log('Created workout:', workout);
    
    const expectedVolume = weight * reps;
    if (workout.volume === expectedVolume) {
      console.log(`SUCCESS: Volume calculated correctly (${workout.volume})`);
    } else {
      console.log(`FAILURE: Volume calculated incorrectly. Expected ${expectedVolume}, got ${workout.volume}`);
      throw new Error('Test failed');
    }
  } catch (error) {
    console.error('Error during test:', error);
    throw error;
  }
}

test().catch(err => {
  console.error('Test script failed');
  process.exit(1);
});
