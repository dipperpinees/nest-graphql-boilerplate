import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class Follow {
    @Field((type) => User)
    follower: User;

    @Field((type) => User)
    following: User;
}
