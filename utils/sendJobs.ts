import { mutate } from 'swr';

export interface Job {
    jobTitle: string,
    companyName: string,
    location: string,
    jobType:string,
    salary: {min: number,max: number}, 
    deadline:string,
    description: string, 
}


export default async function sendJob( formData : Job ) {

  try {
    const res = await fetch('/api/sendJob', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }); 
    if (!res.ok) throw new Error('Failed to submit');

    mutate('/api/getJob');
    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    console.error(err);
    return { success: false, error: err };
  }
}


