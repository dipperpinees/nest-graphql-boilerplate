import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
    constructor(private readonly prismaService: PrismaService) {}

    async createComment (data: Prisma.CommentCreateInput) {
        return await this.prismaService.comment.create({data})
    }

    async getCommentById(id: number) {
        return await this.prismaService.comment.findUnique({
            where: {
                id
            }
        })
    }

    async deleteComment(id: number) {
        return await this.prismaService.comment.delete({
            where: {
                id
            }
        })
    }
}
