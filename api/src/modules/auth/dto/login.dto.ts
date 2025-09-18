import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
    @IsEmail({}, {
        message: "email_invalid"
    })
    email: string;

    @MinLength(8, {
        message: "password_err_length"
    })
    password: string;
}