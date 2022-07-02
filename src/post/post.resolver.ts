import { UseGuards, UsePipes } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/auth.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { User } from 'src/user/model/user.model';
import { CreatePostInput } from './models/create-post.input';
import { FilterPostInput } from './models/filter-post.input';
import { Post } from './models/post.model';
import { UpdatePostInput } from './models/update-post.input';
import { PostGuard } from './post.guard';
import { PostService } from './post.service';
import { FilterPost } from './models/filter-post.model';
import { UserService } from 'src/user/user.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CategoryService } from 'src/category/category.service';

@Resolver((of) => Post)
export class PostResolver {
    constructor(
        private readonly postService: PostService,
        private readonly userService: UserService,
        private readonly cloudinaryService: CloudinaryService,
        private readonly categoryService: CategoryService
    ) { }

    @Query((returns) => Post, { name: 'GetPostById' })
    async getPostById(@Args('id', { type: () => Int }) id: number) {
        return await this.postService.getPostById(id);
    }

    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @Mutation((returns) => Post, { name: 'CreatePost' })
    async createPost(
        @Args('postData') {categoryId, ...postData}: CreatePostInput,
        @CurrentUser('id') userId: number
    ) {
        return await this.postService.createPost({
            ...postData,
            category: {
                connect: {
                    id: categoryId
                }
            },
            author: {
                connect: {
                    id: userId,
                },
            },
        });
    }

    @ResolveField((returns) => User)
    async author(@Parent() {authorId}: any) {
        return this.userService.findById(authorId);
    }

    @UseGuards(PostGuard)
    @UseGuards(AuthGuard)
    @Mutation((returns) => Post, { name: 'DeletePost' })
    async deletePost(@Args('id', { type: () => Int }) id: number) {
        return await this.postService.deletePost(id);
    }

    @UseGuards(PostGuard)
    @UseGuards(AuthGuard)
    @Mutation((returns) => Post, { name: 'UpdatePost' })
    async updatePost(@Args('id', { type: () => Int }) id: number,
        @Args('postData') updateData: UpdatePostInput) {
        return await this.postService.updatePost(id, updateData);
    }

    @UsePipes(ValidationPipe)
    @Query((returns) => FilterPost, {name: 'FilterPost'})
    async filterPost(@Args('filterData') filterData: FilterPostInput) {
        return await this.postService.filterPost(filterData);
    }

    @Mutation((returns) => String, { name: 'UploadImage'})
    async uploadImage(@Args({name: 'image', type: () => GraphQLUpload}) image: FileUpload) {
        const imageUploaded = await this.cloudinaryService.uploadSingleImage(image);
        return imageUploaded.url;
    }

    @ResolveField()
    async comments (@Parent() {id: postId}) {
        return await this.postService.getPostComment(postId);
    }

    @ResolveField()
    async category (@Parent() {categoryId}) {
        return await this.categoryService.getCategoryById(categoryId)
    }
}