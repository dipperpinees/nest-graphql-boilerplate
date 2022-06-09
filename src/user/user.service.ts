import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    async findByEmail(email: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
                name: true,
                avatar: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return user;
    }

    async findById(id: number) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                avatar: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return user;
    }

    async getUserPosts(id: number) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id,
            },
            select: {
                posts: true,
            },
        });

        return user?.posts;
    }
}
