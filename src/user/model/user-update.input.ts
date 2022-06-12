import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UserUpdateInput {
    @Field({nullable: true})
    avatar?: string;

    @Field({nullable: true})
    name?: string;
}