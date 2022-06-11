import { Resolver, Mutation, Args, ResolveField, Query, Int, Parent } from '@nestjs/graphql';
import { Comment } from './models/comment.model';
import { CommentService } from './comment.service';
import { CreateCommentInput } from './models/create-comment.input';
import { UseGuards, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/auth.decorator';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';
import { CommentGuard } from './comment.guard';

@Resolver((of) => Comment)
export class CommentResolver {
    constructor(
        private readonly commentService: CommentService,
        private readonly userService: UserService,
        private readonly postService: PostService
    ) { }

    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard)
    @Mutation((type) => Comment, { name: 'CreateComment' })
    async createComment(@Args('commentData') {postId, ...rest}: CreateCommentInput, @CurrentUser('id') userId: number) {
        return await this.commentService.createComment({
            ...rest,
            author: {
                connect: { id: userId }
            },
            post: {
                connect: { id: postId }
            }
        });
    }

    @Query((type) => Comment, {name: 'GetCommentById'})
    async getCommentById(@Args('id', {type: () => Int}) id: number) {
        return await this.commentService.getCommentById(id);
    }

    @UseGuards(CommentGuard)
    @UseGuards(AuthGuard)
    @Mutation((type) => Comment, {name: 'DeleteComment'})
    async deleteComment(@Args('id', {type: () => Int}) id: number) {
        return this.commentService.deleteComment(id);
    }

    @ResolveField()
    async author (@Parent() {authorId}: any) {
        return this.userService.findById(authorId);
    }

    @ResolveField()
    async post (@Parent() {postId}: any) {
        return this.postService.getPostById(postId);
    }
}