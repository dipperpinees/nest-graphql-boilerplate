import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Post } from "src/post/models/post.model";
import { User } from "src/user/model/user.model";

@ObjectType()
export class Comment {
    @Field((type) => Int)
    id: number;

    @Field((type) => User, {nullable: true})
    author?: User;

    @Field()
    content: string;

    @Field((type) => Post, {nullable: true})
    post?: Post;

    @Field((type) => Date, { nullable: true })
    createdAt?: Date;

    @Field((type) => Date, { nullable: true })
    updatedAt?: Date;
}