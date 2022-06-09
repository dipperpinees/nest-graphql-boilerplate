import { IsEmail, IsNotEmpty, IsUrl, Length, MinLength } from 'class-validator';

export class SignUpDto {
    @Length(6, 20)
    @IsNotEmpty()
    readonly name: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsUrl()
    readonly avatar: string;
}
