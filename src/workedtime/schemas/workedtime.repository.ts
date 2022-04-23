import { CrudService } from '../../services/crud.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkedtimeDocument } from './workedtime.schema';
import { Workedtime } from '../entities/workedtime.entity';
export type groupedByType = 'hour'| 'day' | 'month';

export class WorkedtimeRepository extends CrudService<WorkedtimeDocument> {
    constructor(
    @InjectModel(Workedtime.name)
    protected readonly workedtimeModel: Model<WorkedtimeDocument>,
    ) {
        super(workedtimeModel);
    }

    async hasWorkSessionStarted(taskId: string) {
        const result = await this.workedtimeModel.find({
            taskId: taskId,
            start: { $exists: true },
            end: { $exists: false },
        });

        const result2 = await this.workedtimeModel.find({
            taskId: taskId,
        });
        return result.length > 0;
    }

    async getCurrentWorkSession(taskId: string) {
        return this.workedtimeModel.find({
            taskId: taskId,
            start: { $exists: true },
            end: { $exists: false },
        });
    }

    // todo limit
    groupByDay(userId: string, groupedBy: groupedByType = "day", limit?: {start: Date, end: Date}) {

        let filter = {}
        const date = {"$dateToString":{ date: "$start"}}
        switch (groupedBy){
        case "hour":
            filter = {"year":"$y","month":"$m","day":"$d","hour":"$h"}
            break
        case "day":
            filter = {"year":"$y","month":"$m","day":"$d"}
            break
        case "month":
            filter = {"year":"$y","month":"$m"}
            break
        }
        
        // hours
        return this.workedtimeModel.aggregate([
            {$match: {
                userId: userId
            }},
            {
                $project: {
                    end: 1,
                    start: 1,
                    "y":{"$year":"$start"},
                    "m":{"$month":"$start"},
                    "d":{"$dayOfMonth":"$start"},
                    "h":{"$hour":"$start"},
                    "date": {"$dateToString":{ date: "$start"}},
                    result: {
                        $subtract: [ "$end", "$start" ] } }
            }, {
                $group: {
                    _id: filter,
                    sum: { $sum: "$result" }
                }
            }
        ]
        )
    }
}
