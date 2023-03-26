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

    @Field({ nullable: true })
    isFollowed: boolean;

    @Field((type) => [Post], { nullable: 'items' })
    posts?: Post[];

    @Field((type) => [User], { nullable: 'items' })
    follower?: User[];

    @Field((type) => [User], { nullable: 'items' })
    following?: User[];

    @Field((type) => Int, { nullable: true })
    followerNumber: number;

    @Field((type) => Int, { nullable: true })
    followingNumber: number;

    @Field({ nullable: true })
    birthday?: string;

    @Field({ nullable: true })
    address?: string;

    @Field({ nullable: true })
    education?: string;

    @Field({ nullable: true })
    work?: string;
}
