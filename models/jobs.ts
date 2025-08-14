// database model using mongoose orm
import { Schema, Document, models, model } from 'mongoose';

export interface Ijob extends Document {
    jobTitle: string,
    companyName: string,
    location: string,
    jobType:string,
    salary: {min: number,max: number}, 
    deadline: Date,
    description: string, 
}

const JobsSchema = new Schema<Ijob>(
  {
    jobTitle: String,
    companyName: String,
    location: String,
    jobType:String,
    salary: {min: Number,max: Number}, 
    deadline: Date,
    description: String, 

  },
  { collection: 'jobs',timestamps: true }
);

const Job = models.jobs || model<IHost>('jobs', JobsSchema);

export default Job;
