import { UseGuards, UsePipes } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/auth.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { User } from 'src/user/model/user.model';
import { CreatePostInput } from './models/create-post.input';
import { Post } from './models/post.model';
import { PostGuard } from './post.guard';
import { PostService } from './post.service';

@Resolver((of) => Post)
export class PostResolver {
    constructor(private readonly postService: PostService) {}

    @Query((returns) => Post, { name: 'GetPost' })
    async getPost(@Args('id', { type: () => Int }) id: number) {
        return await this.postService.getPostById(id);
    }

    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @Mutation((returns) => Post, { name: 'CreatePost' })
    async createPost(
        @Args('postData') postData: CreatePostInput,
        @CurrentUser('id') userId: number
    ) {
        return await this.postService.createPost({
            ...postData,
            author: {
                connect: {
                    id: userId,
                },
            },
        });
    }

    @ResolveField((returns) => User)
    async author(@Parent() { id }: Post) {
        return this.postService.getAuthorPost(id);
    }

    @UseGuards(PostGuard)
    @UseGuards(AuthGuard)
    @Mutation((returns) => Post, { name: 'DeletePost' })
    async deletePost(@Args('id', { type: () => Int }) id: number) {
        return await this.postService.deletePost(id);
    }
}
