import {DailyEmailSender} from "./daily-email.sender";
import {WeeklyReportSender} from "./weekly-report.sender";
import {Injectable} from "@nestjs/common";

@Injectable()
export class Senders {
    constructor(readonly dailyEmailSender: DailyEmailSender, readonly weeklyReportSender:WeeklyReportSender) {
    }
}
