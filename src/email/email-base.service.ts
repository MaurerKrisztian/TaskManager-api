import * as nodemailer from 'nodemailer';
import { Injectable, Logger } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';


const path = require('path');

@Injectable()
export class EmailBaseService {
    readonly logger = new Logger(EmailBaseService.name);

    transporter: Transporter;

    constructor() {
        this.transporter = this.getTransporter();
    }

    async sendMail(mailOptions: Mail.Options, hbs:  Mail.PluginFunction<any>) {
        // const handlebarOptions = {
        //     viewEngine: {
        //         partialsDir: path.resolve(`${TemplatePaths.EMAIL_TEMPLATES_PATH}/`),
        //         defaultLayout: false,
        //     },
        //     viewPath: path.resolve(`${TemplatePaths.EMAIL_TEMPLATES_PATH}/`),
        // };
        // use a template file with nodemailer
        this.transporter.use('compile', hbs);
        const info = await this.transporter.sendMail(mailOptions);
        this.logger.debug(`Send mail: ${JSON.stringify(info)}`);
        return info;
    }

    getTransporter() {
        return nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }
}
