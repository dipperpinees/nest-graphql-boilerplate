import { NotAcceptableException, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/auth.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Post } from 'src/post/models/post.model';
import { UserUpdateInput } from './model/user-update.input';
import { User } from './model/user.model';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly cloudinaryService: CloudinaryService
    ) {}

    @Query((returns) => User, { name: 'GetUserById' })
    async getUserById(@Args({ name: 'id', type: () => Int }) id: number) {
        return await this.userService.findById(id);
    }

    @ResolveField((returns) => [Post])
    async posts(@Parent() { id }: User) {
        return this.userService.getUserPosts(id);
    }

    @UseGuards(AuthGuard)
    @Mutation((returns) => User, { name: 'UpdateUser' })
    async updateUser(
        @Args('updateData') updateData: UserUpdateInput,
        @CurrentUser('id') id: number
    ) {
        return this.userService.updateUser(id, updateData);
    }

    @UseGuards(AuthGuard)
    @Mutation((returns) => Boolean, { name: 'Follow' })
    async follow(
        @Args('followingId', { type: () => Int }) followingId: number,
        @CurrentUser('id') id: number
    ) {
        if (id === followingId) {
            throw new NotAcceptableException('You can not follow yourself');
        }
        await this.userService.follow({
            follower: {
                connect: { id },
            },
            following: {
                connect: { id: followingId },
            },
        });

        return true;
    }

    @UseGuards(AuthGuard)
    @Mutation((returns) => Boolean, { name: 'UnFollow' })
    async unFollow(
        @Args('followingId', { type: () => Int }) followingId: number,
        @CurrentUser('id') id: number
    ) {
        await this.userService.unFollow({
            followerId: id,
            followingId: followingId,
        });

        return true;
    }

    @ResolveField((returns) => [User])
    async follower(@Parent() { id }: User) {
        return this.userService.getFollower(id);
    }

    @ResolveField((returns) => [User])
    async following(@Parent() { id }: User) {
        return this.userService.getFollowing(id);
    }

    @ResolveField((returns) => Int)
    async followerNumber(@Parent() { id }: User) {
        return await this.userService.getFollowerNumber(id);
    }

    @ResolveField((returns) => Int)
    async followingNumber(@Parent() { id }: User) {
        return await this.userService.getFollowingNumber(id);
    }

    @UseGuards(AuthGuard)
    @ResolveField((returns) => Boolean)
    async isFollowed(@Parent() { id: followingId }: User, @CurrentUser('id') userId: number) {
        if (!userId) return false;
        return await this.userService.isFollowed(followingId, userId);
    }
}
