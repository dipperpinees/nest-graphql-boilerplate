import { Injectable } from '@nestjs/common';
import { Post, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterPostInput } from './models/filter-post.input';

@Injectable()
export class PostService {
    constructor(private readonly prismaService: PrismaService) {}

    async createPost(postData: Prisma.PostCreateInput): Promise<Post> {
        const thumbnail = this.getThumbnail(postData.content);
        return await this.prismaService.post.create({
            data: {
                ...postData,
                thumbnail,
                ...(!postData.description && {
                    description: this.makeDescription(postData.content),
                }),
            },
        });
    }

    async getPostById(id: number): Promise<Post> {
        return await this.prismaService.post.update({
            where: {
                id,
            },
            data: { views: { increment: 1 } },
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
        const { createdAt, updatedAt, categoryId, page, limit, views, search } = filterData;
        const where = {
            categoryId,
            title: { search },
        };
        const [docs, totalDocs] = await this.prismaService.$transaction([
            this.prismaService.post.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    ...(views && { views }),
                    ...(createdAt && { createdAt }),
                    ...(updatedAt && { updatedAt }),
                },
            }),
            this.prismaService.post.count({ where }),
        ]);
        return {
            docs,
            pagination: {
                page,
                limit,
                totalDocs,
                totalPages: Math.ceil(totalDocs / limit),
            },
        };
    }

    async getPostComment(postId: number) {
        return await this.prismaService.comment.findMany({
            where: {
                postId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    getThumbnail(url: string): string | null {
        if (!url.includes('<img src') || !url.includes('http://res.cloudinary')) return null;

        return url.substring(
            url.indexOf('http://res.cloudinary'),
            url.indexOf('"', url.indexOf('http://res.cloudinary'))
        );
    }

    makeDescription(content: string) {
        const textContent = content.replace(/<(?:.|\n)*?>/gm, '');
        if (textContent.length < 130) return content;

        return textContent.substring(0, textContent.indexOf(' ', 120));
    }
}
