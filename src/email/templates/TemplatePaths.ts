import * as path from "path";
import Mail from "nodemailer/lib/mailer";
import * as hbs from "nodemailer-express-handlebars";

export class TemplatePaths {
    static EMAIL_TEMPLATES_PATH = './src/email/templates';
    static DAILY_TASK_EMAIL_TEMPLATE_CSS_PATH = `${TemplatePaths.EMAIL_TEMPLATES_PATH}/email.css`; // TODO: "./"
  
  
    static getDailyEmilHbs(): Mail.PluginFunction<any>{
        const handlebarOptions = {
            viewEngine: {
                partialsDir: path.resolve(`${TemplatePaths.EMAIL_TEMPLATES_PATH}/`),
                defaultLayout: false,
            },
            viewPath: path.resolve(`${TemplatePaths.EMAIL_TEMPLATES_PATH}/`),
        } as any;
        return hbs(handlebarOptions)
    }
}
