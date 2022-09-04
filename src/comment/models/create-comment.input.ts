import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
    @Field()
    content: string;

    @Field((type) => Int)
    postId: number;
}
