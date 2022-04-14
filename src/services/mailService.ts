import { IProductDTO, IUserDTO } from 'interfaces/dtos';
import * as nodemailer from 'nodemailer';

class MailService {
    async sendVerificationMail(to: string, link: string) {
        const transporter = nodemailer.createTransport({
            port: Number(process.env.SMTP_PORT) ?? 0,
            host: process.env.SMTP_HOST,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });

        await transporter.sendMail({
            from: 'Course Work',
            to,
            subject: 'Account verification',
            html: `
                <a href="${link}">Activation link</a>
            `
        });
    }

    async sendTransactionMail(to: string, user: IUserDTO, product?: IProductDTO, address?: string, tel?: string, commentary?: string, amount?: number) {
        const transporter = nodemailer.createTransport({
            port: Number(process.env.SMTP_PORT) ?? 0,
            host: process.env.SMTP_HOST,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });

        await transporter.sendMail({
            from: 'Course Work',
            to,
            subject: `Transaction ${user.email}. Product: ${product.title}`,
            html: `
                <h1>User: ${user.firstName} ${user.lastName}</h1>
                <h2>Address: ${address}</h2>
                <h2>Tel: ${tel}</h2>
                <h2>Amount: ${amount}</h2>
                ${commentary ? `<h2>Commentary: ${commentary}</h2>` : ''}
                <h2>Product: ${product?.title}</h2>
                <h2>Price: ${product?.price}</h2>
            `
        });
    }
}

export default new MailService();