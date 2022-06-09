import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/model/user.model';

@ObjectType()
export class Post {
    @Field((type) => Int)
    id: number;

    @Field()
    title: string;

    @Field()
    content: string;

    @Field({ nullable: true })
    description?: string;

    @Field((type) => User)
    author: User;

    @Field((type) => Date, { nullable: true })
    createdAt?: Date;

    @Field((type) => Date, { nullable: true })
    updatedAt?: Date;
}
