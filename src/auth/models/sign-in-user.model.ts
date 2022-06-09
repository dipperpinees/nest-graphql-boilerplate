import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/model/user.model';

@ObjectType()
export class SignInUser {
    @Field((type) => User)
    user: User;

    @Field()
    token: string;
}
