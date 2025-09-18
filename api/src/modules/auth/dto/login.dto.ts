import { IsEmail, MinLength, Matches } from 'class-validator';

export class LoginDto {
    @IsEmail({}, {
        message: "email_invalid"
    })
    email: string;

    @MinLength(8, {
        message: "password_err_length"
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: "password_err_regex"
    })
    password: string;
}