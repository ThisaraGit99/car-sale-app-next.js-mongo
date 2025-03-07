// app/api/activity/route.ts
import { NextResponse } from 'next/server';
import ActivityLog from '@/app/models/ActivityLog';
import dbConnect from '@/app/utils/dbConnect';

export async function GET() {
  await dbConnect();
  const logs = await ActivityLog.find().sort({ createdAt: -1 }).limit(5);
  return NextResponse.json(logs);
}