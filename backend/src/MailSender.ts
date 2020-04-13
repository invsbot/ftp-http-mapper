import Mail from 'nodemailer/lib/mailer';
import nodemailer from 'nodemailer';

class MailSender {
    public transporter: Mail;
    private user: string;
    constructor(host: string, user: string, pass: string, port: number) {
      this.transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: true,
        auth: {
          user: user,
          pass: pass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      this.user = user;
    }
    public async sendMail(mailData: Mail.Options) {
      try {
        const response = await this.transporter.sendMail({...mailData, from: this.user});
        return response;
      } catch (err) {
        throw err;
      } finally {
        this.transporter.close();
      }
    }
}
export default MailSender;
