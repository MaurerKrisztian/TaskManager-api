import { Job } from 'node-schedule';

export class JobManager {
  static jobs: {} = {};

  static invalidate(userId: string) {
    return this.jobs[userId] ? this.jobs[userId].cancel() : undefined;
  }

  static add(userId: string, job: Job) {
    this.invalidate(userId);
    this.jobs[userId] = job;
  }
}
