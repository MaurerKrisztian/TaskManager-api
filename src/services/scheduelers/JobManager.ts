import { Job } from 'node-schedule';

export interface UserSchedules {
  dailyMail?: Job;
  task?: Job;
  weeklyReport?: Job;
}

interface ISchedules {
  [key: string]: UserSchedules;
}

export class JobManager {
    static userSchedules: ISchedules = {};
}
