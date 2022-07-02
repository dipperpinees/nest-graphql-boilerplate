import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

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
}
