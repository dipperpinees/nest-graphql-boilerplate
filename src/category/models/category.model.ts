import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/post/models/post.model';

@ObjectType()
export class Category {
    @Field((type) => Int)
    id: number;

    @Field()
    title: string;

    @Field((type) => [Post], { nullable: 'items' })
    posts?: Post[];
}
