import { IsEmail, MinLength, Matches, IsString, MaxLength } from 'class-validator';

export class RegisterDto {
    @IsString()
    @MinLength(3, {
        message: "name_err_length_min"
    })
    @MaxLength(50, {
        message: "name_err_length_max"
    })
    @Matches(/^[A-Za-zА-Яа-яЁёІіЇїЄє\s]+$/, {
        message: "name_err_pattern"
    })
    name: string;

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