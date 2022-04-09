import { CrudService } from '../../services/crud.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogsDocument } from './logs.schema';

export class LogsRepository extends CrudService<LogsDocument> {
    constructor(
    @InjectModel(Log.name) protected readonly logModel: Model<LogsDocument>,
    ) {
        super(logModel);
    }

    findAllSortedByCreation(type?: string, limit = -1) {
        return this.logModel
            .find({ type: type } || {})
            .sort('-createdAt')
            .limit(limit)
            .populate('userId')
            .exec();
    }
}
