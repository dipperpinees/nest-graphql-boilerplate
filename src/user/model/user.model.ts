import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/post/models/post.model';

@ObjectType()
export class User {
    @Field((type) => Int)
    id: number;

    @Field()
    name: string;

    @Field({ nullable: true })
    avatar?: string;

    @Field((type) => [Post], { nullable: 'items' })
    posts?: Post[];

    @Field((type) => [User], { nullable: 'items' })
    follower?: User[];

    @Field((type) => [User], { nullable: 'items' })
    following?: User[];
}
