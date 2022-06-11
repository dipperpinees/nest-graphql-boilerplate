import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post, Prisma, User } from '@prisma/client';
import { FilterPostInput } from './models/filter-post.input';

@Injectable()
export class PostService {
    constructor(private readonly prismaService: PrismaService) {}

    async createPost(data: Prisma.PostCreateInput): Promise<Post> {
        return await this.prismaService.post.create({ data });
    }

    async getPostById(id: number): Promise<Post>  {
        return await this.prismaService.post.findUnique({
            where: {
                id,
            }
        });
    }

    async updatePost(id: number, data: Prisma.PostUpdateInput): Promise<Post> {
        return await this.prismaService.post.update({
            where: {
                id,
            },
            data,
        });
    }

    async getAuthorOfPost(id: number): Promise<User> {
        const post = await this.prismaService.post.findUnique({
            where: {
                id,
            },
            select: {
                author: true,
            },
        });

        return post?.author;
    }

    async deletePost(id: number): Promise<Post> {
        return await this.prismaService.post.delete({
            where: {
                id,
            },
        });
    }

    async filterPost(filterData: FilterPostInput) {
        const {createdAt, updatedAt, categoryId, page, limit} = filterData;

        const [totalDocs, docs] = await Promise.all([
            await this.prismaService.$queryRaw`SELECT COUNT(*) FROM "Post"`,
            this.prismaService.post.findMany({
                skip: (page - 1)*limit,
                take: limit,
                where: {
                    categoryId
                },
                orderBy: {
                    ...createdAt && {createdAt},
                    ...updatedAt && {updatedAt}
                }
            })
        ])

        return {
            docs,
            pagination: {
                page,
                limit,
                totalDocs: totalDocs[0].count,
                totalPages: Math.ceil(totalDocs[0].count/limit)
            }
        }
    }

    async getPostComment (postId: number) {
        return await this.prismaService.comment.findMany({
            where: {
                postId
            }
        })
    }
}
