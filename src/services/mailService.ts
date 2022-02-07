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
            from: 'qwewqe',
            to,
            subject: 'Account verification',
            html: `
                <a href="${link}">Activation link</a>
            `
        });
    }
}

export default new MailService();