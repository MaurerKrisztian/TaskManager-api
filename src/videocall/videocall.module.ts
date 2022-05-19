import { Module } from '@nestjs/common';
import { VideocallService } from './videocall.service';
import { VideocallController } from './videocall.controller';
import {DailycoClientModule} from "@maurerkrisztian/dailyco-api-client";
import {EmailModule} from "../email/email.module";

@Module({
    imports: [ DailycoClientModule.forRoot({
        apikey: process.env.DAILYCO_API_KEY,
        apiurl: process.env.DAILYCO_API_URL,
    }),
    EmailModule
    ],
    controllers: [VideocallController],
    providers: [VideocallService]
})
export class VideocallModule {}
