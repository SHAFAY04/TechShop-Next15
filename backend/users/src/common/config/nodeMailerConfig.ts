import nodeMailer from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config()
export const transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'muhammadshafay2014@gmail.com',
    clientId: process.env.GOOGLE_EMAIL_CLIENT_ID,
    clientSecret: process.env.GOOGLE_EMAIL_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_EMAIL_REFRESH_TOKEN,
  }
});
