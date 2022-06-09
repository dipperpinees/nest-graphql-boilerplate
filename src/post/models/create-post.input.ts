import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class CreatePostInput {
    @MaxLength(50)
    @Field()
    title: string;

    @Field()
    content: string;

    @Field({ nullable: true })
    description?: string;
}
