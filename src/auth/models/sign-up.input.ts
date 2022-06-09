import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class SignUpInput {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @Length(6, 20)
    password: string;

    @Field()
    @Length(6, 31)
    name: string;

    @Field({ nullable: true })
    avatar?: string;
}
