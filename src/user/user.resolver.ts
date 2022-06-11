import { Args, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Post } from 'src/post/models/post.model';
import { User } from './model/user.model';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query((returns) => User, { name: 'GetUser' })
    async getUser(@Args('id') id: number) {
        return await this.userService.findById(id);
    }

    @ResolveField((returns) => [Post])
    async posts(@Parent() { id }: User) {
        return this.userService.getUserPosts(id);
    }
}
