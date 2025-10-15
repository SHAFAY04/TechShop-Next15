// src/common/config/nodeMailerConfig.ts
import nodeMailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

export const transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'muhammadshafay2014@gmail.com', // Your Gmail address
    pass: process.env.GMAIL_APP_PASSWORD, // This is where the 16-char App Password goes
  }
  // You don't need clientId, clientSecret, refreshToken with this method
});