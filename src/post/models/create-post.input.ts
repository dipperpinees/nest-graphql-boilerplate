import { Field, InputType, Int } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class CreatePostInput {
    @MaxLength(100)
    @Field()
    title: string;

    @Field()
    content: string;

    @Field({ nullable: true })
    description?: string;

    @Field((type) => Int)
    categoryId: number;
}
