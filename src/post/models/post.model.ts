import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/category/models/category.model';
import { Comment } from 'src/comment/models/comment.model';
import { User } from 'src/user/model/user.model';

@ObjectType()
export class Post {
    @Field((type) => Int)
    id: number;

    @Field()
    title: string;

    @Field()
    content: string;

    @Field({nullable: true})
    thumbnail?: string;

    @Field({ nullable: true })
    description?: string;

    @Field((type) => User)
    author: User;

    @Field((type) => Category)
    category: Category;

    @Field((type) => Date, { nullable: true })
    createdAt?: Date;

    @Field((type) => Date, { nullable: true })
    updatedAt?: Date;

    @Field((type) => [Comment], {nullable: 'items'})
    comments: Comment[];

    @Field((type) => Int)
    views: number;
}