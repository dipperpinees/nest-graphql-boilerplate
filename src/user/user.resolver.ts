import { NotAcceptableException, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver, ResolveField, Parent, Mutation, Int } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/auth.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { Post } from 'src/post/models/post.model';
import { Follow } from './model/follow.model';
import { UserUpdateInput } from './model/user-update.input';
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

    @UseGuards(AuthGuard)
    @Mutation((returns) => User, {name: 'UpdateUser'})
    async updateUser (
        @Args('updateData') updateData: UserUpdateInput,
        @CurrentUser('id') id: number
    ) {
        return this.userService.updateUser(id, updateData);
    }

    @UseGuards(AuthGuard)
    @Mutation((returns) => Follow, {name: 'Follow'})
    async follow (
        @Args('followingId', {type: () => Int}) followingId: number,
        @CurrentUser('id') id: number
    ) {
        if(id === followingId) {
            throw new NotAcceptableException('You can not follow yourself')
        }
        return this.userService.follow({
            follower: {
                connect: {id}
            },
            following: {
                connect: {id: followingId}
            }
        })
    }

    @ResolveField((returns) => [User])
    async follower (@Parent() {id}: User) {
        return this.userService.getFollower(id);
    }

    @ResolveField((returns) => [User])
    async following (@Parent() {id}: User) {
        return this.userService.getFollowing(id);
    }
}
