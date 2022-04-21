import { countTotalPrice } from "../helpers/productServiceHelper";
import { IProductDTO, IUserDTO } from "../interfaces/dtos";
import { google } from "googleapis";
import * as nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import fs from "fs";
import path from "path";

const createTransporter = async () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.SMTP_USER,
      accessToken,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
    headers: {
      "x-priority": "1",
      "x-msmail-priority": "High",
      importance: "high",
    },
  } as SMTPTransport.Options);

  return transporter;
};

class MailService {
  async sendVerificationMail(to: string, link: string, fullName: string) {
    const transporter = await createTransporter();

    const mailTemplate = fs.readFileSync(
      path.resolve("src", "emailTemplates", "verification.html"),
      "utf8"
    );

    await transporter.sendMail({
      from: "Course Work",
      to,
      subject: "Account verification",
      html: mailTemplate
        .replace("{fullName}", `${fullName}`)
        .replace("{activationLink}", link),
    });
  }

  async sendTransactionMail(
    to: string,
    user: IUserDTO,
    products?: IProductDTO[],
    address?: string,
    tel?: string,
    commentary?: string,
    amount?: number,
    paymentMethod?: string
  ) {
    const transporter = await createTransporter();

    let mailTemplate = fs.readFileSync(
      path.resolve("src", "emailTemplates", "purchase.html"),
      "utf8"
    );

    mailTemplate = mailTemplate
      .replace("{fullName}", `${user.firstName} ${user.lastName}`)
      .replace("{amount}", `${amount}`)
      .replace("{address}", `${address}`)
      .replace("{phoneNumber}", `${tel}`)
      .replace("{commentary}", `${commentary ? commentary : ""}`)
      .replace("{payMethod}", `${paymentMethod}`)
      .replace(
        "{orderedProducts}",
        `${products.reduce(
          (htmlMail, product) =>
            htmlMail +
            `
              <h2>Product: ${product?.title}</h2>
              <h2>Price: ${product?.price * amount}$</h2>
              <hr />
            `,
          ""
        )}<br /> Total Price: ${countTotalPrice(products)}$`
      );

    await transporter.sendMail({
      from: "Course Work",
      to: user.email,
      subject: `Purchase ${user.email}.`,
      html: mailTemplate
    });

    await transporter.sendMail({
      from: "Course Work",
      to,
      subject: `Transaction ${user.email}.`,
      html: mailTemplate.replace(/Thanks for purchase/i, 'Transaction'),
    });
  }
}

export default new MailService();
