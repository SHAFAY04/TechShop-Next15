import { Injectable } from "@nestjs/common";
import { loginBodyDTO } from "../auth/dto/login.dto";
import { transporter } from "src/common/config/nodeMailerConfig";
import * as path from 'path';
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { registerDTO } from "../auth/dto/register.dto";
import { registerManagerDTO } from "../auth/dto/registerManager";

dotenv.config()

type loginResponse={

    statusCode:number,
    success:boolean,
    message:string,
    payload?:object
}
@Injectable()
export class emailService {


    async sendLoginMail(userMail: loginBodyDTO, username: string,redirect:string):Promise<loginResponse> {
        
        let payload={ email: userMail.email }
        const tokenSecret = process.env.FALLBACK_SECRET
        if(!tokenSecret){
            throw new Error('FALLBACK_SECRET environment variable is not set')
        }
        const token=jwt.sign(payload,tokenSecret,{expiresIn:'30s'})

        try {
            await transporter.sendMail({
                to: userMail.email,
                from: 'muhammadshafay2014@gmail.com',
                subject: 'Trying to LogIn?',
                html: `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome Back to TechStop!</title>
        <!-- Link to Space Grotesk font - Fallback to sans-serif -->
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&display=swap" rel="stylesheet">
        <style>
            /* Base styles for better email client compatibility */
            body, html {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: #f7f7f7; /* Slightly off-white background */
            }
            table {
                border-collapse: collapse;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
            td {
                padding: 0;
            }
            img {
                -ms-interpolation-mode: bicubic;
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }
            a {
                text-decoration: none;
            }
            /* Container for the email content */
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff; /* Pure white content area */
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* Subtle shadow */
            }
            /* Header section styles */
            .header {
                background-color: #000000; /* Black header */
                padding: 20px 0;
                text-align: center;
            }
            .header img {
                max-width: 120px;
                height: auto;
            }
            /* Content area styles */
            .content-area {
                padding: 40px;
                text-align: center;
            }
            .greeting {
                font-size: 28px;
                color: #333333;
                margin-bottom: 10px;
                font-weight: bold;
            }
            .tagline {
                font-size: 18px;
                color: #555555;
                margin-bottom: 30px;
            }
            /* Button styles */
            .button-wrapper {
                margin-top: 30px;
                margin-bottom: 40px;
            }
            .button {
                display: inline-block;
                background-color: #000000; /* Black button */
                color: #ffffff; /* White text */
                font-family: 'Space Grotesk', Arial, sans-serif; /* Space Grotesk font */
                font-weight: 500;
                font-size: 18px;
                padding: 15px 30px;
                border-radius: 8px; /* Rounded corners */
                text-decoration: none;
                line-height: 1; /* Ensure button text is centered vertically */
            }
            /* Footer and security guidelines */
            .footer {
                background-color: #eeeeee; /* Light grey footer */
                padding: 30px 40px;
                font-size: 14px;
                color: #666666;
                text-align: center;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
            }
            .security-text {
                line-height: 1.6;
            }
            /* Responsive styles */
            @media only screen and (max-width: 600px) {
                .container {
                    border-radius: 0;
                    box-shadow: none;
                }
                .content-area, .footer {
                    padding: 20px;
                }
                .greeting {
                    font-size: 24px;
                }
                .tagline {
                    font-size: 16px;
                }
                .button {
                    padding: 12px 25px;
                    font-size: 16px;
                }
            }
        </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f7f7f7;">
    
        <!-- This is the outer table for the background "art" -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f7f7f7;">
            <tr>
                <td align="center" style="padding: 20px 0;">
                    <!-- Main container for the email content -->
                    <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
                        <!-- Header -->
                        <tr>
                            <td class="header" style="background-color: #000000; padding: 20px 0; text-align: center;">
                                <!-- TechStop Logo (placeholder) -->
                                <img src="cid:logo" alt="TechStop Logo" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; max-width: 120px;">
                            </td>
                        </tr>
                        <!-- Content -->
                        <tr>
                            <td class="content-area" style="padding: 40px; text-align: center;">
                                <p class="greeting" style="font-size: 28px; color: #333333; margin-bottom: 10px; font-weight: bold;">Hey there, ${username}!</p>
                                <p class="tagline" style="font-size: 18px; color: #555555; margin-bottom: 30px;">Let's get you back to TechStop.</p>
    
                                <!-- Line space -->
                                <div style="height: 20px;"></div>
    
                                <!-- Continue Button -->
                                <div class="button-wrapper" style="margin-top: 30px; margin-bottom: 40px;">
                                    <a href="http://localhost:3000/loginFallback?token=${token}&redirect=${redirect}" class="button" style="display: inline-block; background-color: #000000; color: #ffffff; font-family: 'Space Grotesk', Arial, sans-serif; font-weight: 500; font-size: 18px; padding: 15px 30px; border-radius: 8px; text-decoration: none; line-height: 1;">
                                        Continue
                                    </a>
                                </div>
    
                                <!-- Line space -->
                                <div style="height: 20px;"></div>
                            </td>
                        </tr>
                        <!-- Footer and Security Guidelines -->
                        <tr>
                            <td class="footer" style="background-color: #eeeeee; padding: 30px 40px; font-size: 14px; color: #666666; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                                <p class="security-text" style="line-height: 1.6;">
                                    If you did not request this, please ignore this email. Do not share this email or click any links if you suspect unauthorized activity. Your security is our priority.
                                </p>
                                <p class="security-text" style="line-height: 1.6; margin-top: 15px;">
                                    &copy; 2025 TechStop. All rights reserved.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `,
                attachments: [{
                    filename: 'logo.png',
                    path: path.join(__dirname, '../../../public/logoDark.png'),
                    cid: 'logo'
                }]
            })

            return {
                statusCode:200,
                success:true,
                message:'email sent succesfully'
            }


        } catch (error) {
            return{
                statusCode:500,
                success:false,
                message:error
            }
        }
       
    }

    async sendEmployeeRegisterMail(payload: registerManagerDTO, username: string){
        let Payload={ email: payload.email, username, roles:payload.roles }
        const tokenSecret = process.env.FALLBACK_SECRET
        if(!tokenSecret){
            throw new Error('FALLBACK_SECRET environment variable is not set')
        }
        const token=jwt.sign(Payload,tokenSecret,{expiresIn:'30s'})

        try {
            await transporter.sendMail({
                to: payload.email,
                from: payload.adminEmail,
                subject: 'New Techstop Employee?!',
                html: `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Techstop Employee?!</title>
        <!-- Link to Space Grotesk font - Fallback to sans-serif -->
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&display=swap" rel="stylesheet">
        <style>
            /* Base styles for better email client compatibility */
            body, html {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: #f7f7f7; /* Slightly off-white background */
            }
            table {
                border-collapse: collapse;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
            td {
                padding: 0;
            }
            img {
                -ms-interpolation-mode: bicubic;
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }
            a {
                text-decoration: none;
            }
            /* Container for the email content */
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff; /* Pure white content area */
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* Subtle shadow */
            }
            /* Header section styles */
            .header {
                background-color: #000000; /* Black header */
                padding: 20px 0;
                text-align: center;
            }
            .header img {
                max-width: 120px;
                height: auto;
            }
            /* Content area styles */
            .content-area {
                padding: 40px;
                text-align: center;
            }
            .greeting {
                font-size: 28px;
                color: #333333;
                margin-bottom: 10px;
                font-weight: bold;
            }
            .tagline {
                font-size: 18px;
                color: #555555;
                margin-bottom: 30px;
            }
            /* Button styles */
            .button-wrapper {
                margin-top: 30px;
                margin-bottom: 40px;
            }
            .button {
                display: inline-block;
                background-color: #000000; /* Black button */
                color: #ffffff; /* White text */
                font-family: 'Space Grotesk', Arial, sans-serif; /* Space Grotesk font */
                font-weight: 500;
                font-size: 18px;
                padding: 15px 30px;
                border-radius: 8px; /* Rounded corners */
                text-decoration: none;
                line-height: 1; /* Ensure button text is centered vertically */
            }
            /* Footer and security guidelines */
            .footer {
                background-color: #eeeeee; /* Light grey footer */
                padding: 30px 40px;
                font-size: 14px;
                color: #666666;
                text-align: center;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
            }
            .security-text {
                line-height: 1.6;
            }
            /* Responsive styles */
            @media only screen and (max-width: 600px) {
                .container {
                    border-radius: 0;
                    box-shadow: none;
                }
                .content-area, .footer {
                    padding: 20px;
                }
                .greeting {
                    font-size: 24px;
                }
                .tagline {
                    font-size: 16px;
                }
                .button {
                    padding: 12px 25px;
                    font-size: 16px;
                }
            }
        </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f7f7f7;">
    
        <!-- This is the outer table for the background "art" -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f7f7f7;">
            <tr>
                <td align="center" style="padding: 20px 0;">
                    <!-- Main container for the email content -->
                    <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
                        <!-- Header -->
                        <tr>
                            <td class="header" style="background-color: #000000; padding: 20px 0; text-align: center;">
                                <!-- TechStop Logo (placeholder) -->
                                <img src="cid:logo" alt="TechStop Logo" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; max-width: 120px;">
                            </td>
                        </tr>
                        <!-- Content -->
                        <tr>
                            <td class="content-area" style="padding: 40px; text-align: center;">
                                <p class="greeting" style="font-size: 28px; color: #333333; margin-bottom: 10px; font-weight: bold;">Hey there, ${payload.adminName}!</p>
                                <p class="tagline" style="font-size: 18px; color: #555555; margin-bottom: 30px;">Do you really wanna register ${username} as an Employee? .</p>
                                <p class="tagline" style="font-size: 18px; color: #555555; margin-bottom: 30px;">Heh, that's a name we created for them. please don't mind :).</p>
    
                                <!-- Line space -->
                                <div style="height: 20px;"></div>
    
                                <!-- Continue Button -->
                                <div class="button-wrapper" style="margin-top: 30px; margin-bottom: 40px;">
                                    <a href="http://localhost:3000/registerEmployeeFallback?token=${token} class="button" style="display: inline-block; background-color: #000000; color: #ffffff; font-family: 'Space Grotesk', Arial, sans-serif; font-weight: 500; font-size: 18px; padding: 15px 30px; border-radius: 8px; text-decoration: none; line-height: 1;">
                                        Authorize
                                    </a>
                                </div>
    
                                <!-- Line space -->
                                <div style="height: 20px;"></div>
                            </td>
                        </tr>
                        <!-- Footer and Security Guidelines -->
                        <tr>
                            <td class="footer" style="background-color: #eeeeee; padding: 30px 40px; font-size: 14px; color: #666666; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                                <p class="security-text" style="line-height: 1.6;">
                                    If you did not request this, please ignore this email. Do not share this email or click any links if you suspect unauthorized activity. Your security is our priority.
                                </p>
                                <p class="security-text" style="line-height: 1.6; margin-top: 15px;">
                                    &copy; 2025 TechStop. All rights reserved.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `,
                attachments: [{
                    filename: 'logo.png',
                    path: path.join(__dirname, '../../../public/logoDark.png'),
                    cid: 'logo'
                }]
            })

            return {
                statusCode:200,
                success:true,
                message:'email sent succesfully'
            }


        } catch (error) {
            return{
                statusCode:500,
                success:false,
                message:error.message
            }
        }
    }

    async sendRegisterMail(userMail: registerDTO, username: string,redirect:string):Promise<loginResponse> {
        
        let payload={ email: userMail.email }
        const tokenSecret = process.env.FALLBACK_SECRET
        if(!tokenSecret){
            throw new Error('FALLBACK_SECRET environment variable is not set')
        }
        const token=jwt.sign(payload,tokenSecret,{expiresIn:'30s'})

        try {
            await transporter.sendMail({
                to: userMail.email,
                from: 'muhammadshafay2014@gmail.com',
                subject: 'Welcome to TechStop!',
                html: `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to TechStop!</title>
        <!-- Link to Space Grotesk font - Fallback to sans-serif -->
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&display=swap" rel="stylesheet">
        <style>
            /* Base styles for better email client compatibility */
            body, html {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: #f7f7f7; /* Slightly off-white background */
            }
            table {
                border-collapse: collapse;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
            td {
                padding: 0;
            }
            img {
                -ms-interpolation-mode: bicubic;
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }
            a {
                text-decoration: none;
            }
            /* Container for the email content */
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff; /* Pure white content area */
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* Subtle shadow */
            }
            /* Header section styles */
            .header {
                background-color: #000000; /* Black header */
                padding: 20px 0;
                text-align: center;
            }
            .header img {
                max-width: 120px;
                height: auto;
            }
            /* Content area styles */
            .content-area {
                padding: 40px;
                text-align: center;
            }
            .greeting {
                font-size: 28px;
                color: #333333;
                margin-bottom: 10px;
                font-weight: bold;
            }
            .tagline {
                font-size: 18px;
                color: #555555;
                margin-bottom: 30px;
            }
            /* Button styles */
            .button-wrapper {
                margin-top: 30px;
                margin-bottom: 40px;
            }
            .button {
                display: inline-block;
                background-color: #000000; /* Black button */
                color: #ffffff; /* White text */
                font-family: 'Space Grotesk', Arial, sans-serif; /* Space Grotesk font */
                font-weight: 500;
                font-size: 18px;
                padding: 15px 30px;
                border-radius: 8px; /* Rounded corners */
                text-decoration: none;
                line-height: 1; /* Ensure button text is centered vertically */
            }
            /* Footer and security guidelines */
            .footer {
                background-color: #eeeeee; /* Light grey footer */
                padding: 30px 40px;
                font-size: 14px;
                color: #666666;
                text-align: center;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
            }
            .security-text {
                line-height: 1.6;
            }
            /* Responsive styles */
            @media only screen and (max-width: 600px) {
                .container {
                    border-radius: 0;
                    box-shadow: none;
                }
                .content-area, .footer {
                    padding: 20px;
                }
                .greeting {
                    font-size: 24px;
                }
                .tagline {
                    font-size: 16px;
                }
                .button {
                    padding: 12px 25px;
                    font-size: 16px;
                }
            }
        </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f7f7f7;">
    
        <!-- This is the outer table for the background "art" -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f7f7f7;">
            <tr>
                <td align="center" style="padding: 20px 0;">
                    <!-- Main container for the email content -->
                    <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
                        <!-- Header -->
                        <tr>
                            <td class="header" style="background-color: #000000; padding: 20px 0; text-align: center;">
                                <!-- TechStop Logo (placeholder) -->
                                <img src="cid:logo" alt="TechStop Logo" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; max-width: 120px;">
                            </td>
                        </tr>
                        <!-- Content -->
                        <tr>
                            <td class="content-area" style="padding: 40px; text-align: center;">
                                <p class="greeting" style="font-size: 28px; color: #333333; margin-bottom: 10px; font-weight: bold;">Hey there, ${username}!</p>
                                <p class="tagline" style="font-size: 18px; color: #555555; margin-bottom: 30px;">Let's get you onboard to TechStop.</p>
    
                                <!-- Line space -->
                                <div style="height: 20px;"></div>
    
                                <!-- Continue Button -->
                                <div class="button-wrapper" style="margin-top: 30px; margin-bottom: 40px;">
                                    <a href="http://localhost:3000/loginFallback?token=${token}&redirect=${redirect} class="button" style="display: inline-block; background-color: #000000; color: #ffffff; font-family: 'Space Grotesk', Arial, sans-serif; font-weight: 500; font-size: 18px; padding: 15px 30px; border-radius: 8px; text-decoration: none; line-height: 1;">
                                        Continue
                                    </a>
                                </div>
    
                                <!-- Line space -->
                                <div style="height: 20px;"></div>
                            </td>
                        </tr>
                        <!-- Footer and Security Guidelines -->
                        <tr>
                            <td class="footer" style="background-color: #eeeeee; padding: 30px 40px; font-size: 14px; color: #666666; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                                <p class="security-text" style="line-height: 1.6;">
                                    If you did not request this, please ignore this email. Do not share this email or click any links if you suspect unauthorized activity. Your security is our priority.
                                </p>
                                <p class="security-text" style="line-height: 1.6; margin-top: 15px;">
                                    &copy; 2025 TechStop. All rights reserved.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `,
                attachments: [{
                    filename: 'logo.png',
                    path: path.join(__dirname, '../../../public/logoDark.png'),
                    cid: 'logo'
                }]
            })

            return {
                statusCode:200,
                success:true,
                message:'email sent succesfully'
            }


        } catch (error) {
            return{
                statusCode:500,
                success:false,
                message:error.message
            }
        }
       
    }

}
