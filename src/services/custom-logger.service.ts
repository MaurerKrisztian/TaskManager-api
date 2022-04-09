import { Injectable, LoggerService, LogLevel } from '@nestjs/common';

@Injectable()
export class CustomLogger implements LoggerService {
    debug(message: any, ...optionalParams: any[]): any {
        console.debug(message);
    }

    error(message: any, ...optionalParams: any[]): any {
        console.error(message);
    }

    log(message: any, ...optionalParams: any[]): any {
        console.log(message);
    }

    setLogLevels(levels: LogLevel[]): any {}

    verbose(message: any, ...optionalParams: any[]): any {}

    warn(message: any, ...optionalParams: any[]): any {
        console.warn(message);
    }
}
