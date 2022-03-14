export class JobManager {
    static jobs: {} = {}

    static invalidate(userId: string) {
        return this.jobs[userId] ? this.jobs[userId].cancel() : undefined;
    }

    static add(userId: string, job: any) {
        this.invalidate(userId)
        this.jobs[userId] = job
    }
}
