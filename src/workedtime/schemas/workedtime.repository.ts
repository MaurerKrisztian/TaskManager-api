import { CrudService } from '../../services/crud.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkedtimeDocument } from './workedtime.schema';
import { Workedtime } from '../entities/workedtime.entity';

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
        console.log('aaaaaaaaaaaaaaaaaa', result.length, result2.length);
        return result.length > 0;
    }

    async getCurrentWorkSession(taskId: string) {
        return this.workedtimeModel.find({
            taskId: taskId,
            start: { $exists: true },
            end: { $exists: false },
        });
    }
}
