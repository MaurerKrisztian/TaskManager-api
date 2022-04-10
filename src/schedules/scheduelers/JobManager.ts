import { Job } from 'node-schedule';

export interface UserSchedules {
  dailyMail?: {job: Job, dbId: string};
  task?: {job: Job, dbId: string};
  weeklyReport?: {job: Job, dbId: string};
}

interface ISchedules {
  [key: string]: UserSchedules;
}

export class JobManager {
    static userSchedules: ISchedules = {};
}
