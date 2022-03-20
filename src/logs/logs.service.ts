import {Injectable} from '@nestjs/common';
import {CreateLogDto} from './dto/create-log.dto';
import {UpdateLogDto} from './dto/update-log.dto';
import {LogsRepository} from "./schemas/logs.repository";

@Injectable()
export class LogsService {
    constructor(private readonly logsRepository: LogsRepository) {
    }

    logLogin(userId: string) {
        return this.logsRepository.create({userId: userId, type: 'login', content: new Date()})
    }

    getLogsByType(userId: string, type: string) {
        return this.logsRepository.find({userId: userId, type: type})
    }

    getAll(type: string, limit: number) {
        return this.logsRepository.findAllSortedByCreation(type, limit)
    }
}
