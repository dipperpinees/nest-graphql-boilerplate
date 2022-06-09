import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostService {
    constructor(private readonly prismaService: PrismaService) {}

    async createPost(data: Prisma.PostCreateInput) {
        return await this.prismaService.post.create({ data });
    }

    async getPostById(id: number) {
        return await this.prismaService.post.findUnique({
            where: {
                id,
            },
        });
    }

    async getAuthorPost(id: number) {
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

    async deletePost(id: number) {
        return await this.prismaService.post.delete({
            where: {
                id,
            },
        });
    }
}
