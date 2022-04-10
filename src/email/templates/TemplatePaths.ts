import * as path from "path";
import Mail from "nodemailer/lib/mailer";
import * as hbs from "nodemailer-express-handlebars";
import {Logger} from "@nestjs/common";

export type templateFolders = string | 'daily_email' | 'weekly_email'

export class TemplatePaths {
    private static readonly logger = new Logger(TemplatePaths.name);

    static EMAIL_TEMPLATES_PATH = path.resolve(__dirname)
  
    static getEmilHbs(folder: templateFolders): Mail.PluginFunction<any>{
        this.logger.debug(`Templates path: ${path.resolve(TemplatePaths.EMAIL_TEMPLATES_PATH, folder)}`)
        const handlebarOptions = {
            viewEngine: {
                partialsDir: path.resolve(TemplatePaths.EMAIL_TEMPLATES_PATH,folder),
                defaultLayout: false,
            },
            viewPath: path.resolve(TemplatePaths.EMAIL_TEMPLATES_PATH,folder)
        } as any;
        return hbs(handlebarOptions)
    }

    static getCssPath(folder: templateFolders): string {
        return path.resolve(TemplatePaths.EMAIL_TEMPLATES_PATH,folder, 'email.css');
    }
}
