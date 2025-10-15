

import { IsEmail } from 'class-validator';

export class loginBodyDTO {
    @IsEmail()
    email: string;
}