import { Field, InputType, Int } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class UpdatePostInput {
    @MaxLength(50)
    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    content?: string;

    @Field({ nullable: true })
    description?: string;

    @Field((type) => Int, { nullable: true })
    categoryId?: number;
}