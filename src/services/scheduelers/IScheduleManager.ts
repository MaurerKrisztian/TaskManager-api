import {Job} from "node-schedule";
import {IUser} from "../../auth/auth.user.decorator";

export interface IScheduleManager {
  addScheduleToManager(userId: string, job: Job);

  invalidateSchedule(userId: string, job: Job);

  createSchedule(user: IUser, data: any);
}
