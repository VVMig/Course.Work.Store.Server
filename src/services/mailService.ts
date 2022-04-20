import { countTotalPrice } from "../helpers/productServiceHelper";
import { IProductDTO, IUserDTO } from "../interfaces/dtos";
import { google } from "googleapis";
import * as nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const createTransporter = async () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN
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
    service: 'gmail',
    auth: {
      type: "OAuth2",
      user: process.env.SMTP_USER,
      accessToken,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  } as SMTPTransport.Options);

  return transporter;
};

class MailService {
  async sendVerificationMail(to: string, link: string) {
    console.log(process.env.SMTP_PORT, process.env.SMTP_HOST, process.env.SMTP_USER, process.env.SMTP_PASSWORD, process.env.NODE_ENV, process.env.NODE_ENV == 'production', process.env.OAUTH_CLIENT_ID);

    const transporter = await createTransporter();

    await transporter.sendMail({
      from: "Course Work",
      to,
      subject: "Account verification",
      html: `
                <a href="${link}">Activation link</a>
            `,
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

    await transporter.sendMail({
      from: "Course Work",
      to,
      subject: `Transaction ${user.email}.`,
      html: `<h1>User: ${user.firstName} ${user.lastName}</h1>
            <h2>Address: ${address}</h2>
            <h2>Tel: ${tel}</h2>
            ${commentary ? `<h2>Commentary: ${commentary}</h2>` : ""}
            <h2>Payment method: ${paymentMethod}</h2>
            <h2>Products:</h2> <br/>
            ${products.reduce(
              (htmlMail, product) =>
                htmlMail +
                `
                <h2>Amount: ${amount}</h2>
                <h2>Product: ${product?.title}</h2>
                <h2>Price: ${product?.price * amount}$</h2>
                <hr />
            `,
              ""
            )}
            <h2>Total price: ${countTotalPrice(products)}$</h2>`,
    });
  }
}

export default new MailService();
