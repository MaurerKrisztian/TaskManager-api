import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'API works! Swagger documentation page: /api-doc';
    }
}
