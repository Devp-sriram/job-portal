import { NextRequest, NextResponse } from 'next/server';
import connectDb from '@/config/db';
import Job from '@/models/jobs';

export async function GET(req: NextRequest) {
    try {
        await connectDb(); // make sure this is a function and you are calling it
        const jobs = await Job.find()  // this fetches all users
        // console.log(jobs)
        return NextResponse.json(jobs); // send the data as JSON
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
