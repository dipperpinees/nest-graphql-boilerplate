import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UserUpdateInput {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    birthday?: string;

    @Field({ nullable: true })
    address?: string;

    @Field({ nullable: true })
    education?: string;

    @Field({ nullable: true })
    work?: string;
}
