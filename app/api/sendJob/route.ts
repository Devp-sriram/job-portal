// sending user data to company mail
import { NextRequest, NextResponse } from 'next/server';
import connnectDb from '@/config/db';
import Job from '@/models/jobs';

export async function POST(req: NextRequest) {
  try {
    await connnectDb();
    const body = await req.json();    
    const newUser = new Job(body);

    const saved = await newUser.save()
    return NextResponse.json({ message: 'Job created', data: saved }, { status: 201 });
  } catch (error) {
    console.error('Mongoose error:', error);
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}



