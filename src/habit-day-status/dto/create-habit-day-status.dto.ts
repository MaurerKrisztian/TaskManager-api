import {IHabitDayStatus} from "../schemas/habit-day-status.schema";

export class CreateHabitDayStatusDto implements IHabitDayStatus {
    _id: string;
    date: Date;
    habitId: string;
    note: string;
    status: "done" | "not-done" | string;
    userId: string;
}
