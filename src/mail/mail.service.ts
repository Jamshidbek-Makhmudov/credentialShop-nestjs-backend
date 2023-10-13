import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Admin } from '../admin/models/admin.model';
import { Client } from '../client/models/client.model';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService){}

    async sendAdminConfirmation(admin: Admin): Promise<void> {
        const url = `${process.env.API_HOST}/api/admin/activate/${admin.activation_link}`;
        console.log("url",url);
        await this.mailerService.sendMail({
            to: admin.email,
            subject:'Welcome to Online Shop! Confirm your Email',
            template: './confirmation',
            context: {
                name:admin.username,
                url,
            },
        });
    }

    
    async sendUserConfirmation(client: Client): Promise<void> {
        const url = `${process.env.API_HOST}/api/client/activate/${client.activation_link}`;
        console.log("url",url);
        await this.mailerService.sendMail({
            to: client.email,
            subject:'Welcome to Online Shop! Confirm your Email',
            template: './confirmation',
            context: {
                name:client.first_name,
                url,
            },
        });
    }

}
