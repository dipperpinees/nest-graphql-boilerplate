import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
    ) {}

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

    async getUserPosts(userId: number) {
        const posts = await this.prismaService.post.findMany({
            where: {
                authorId: userId
            }
        });

        return posts;
    }

    async updateUser (userId, updateData: Prisma.UserUpdateInput) {
        return this.prismaService.user.update({
            where: {
                id: userId
            },
            data: updateData
        })
    }

    async follow (data: Prisma.FollowsCreateInput) {
        return this.prismaService.follows.create({
            data,
            include: {
                follower: true,
                following: true
            }
        })
    }

    async getFollower(id: number) {
        const followerList = await this.prismaService.follows.findMany({
            where: {
                followingId: id
            },
            select: {
                follower: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                }
            }
        })

        return followerList.map((item) => item.follower);
    }

    async getFollowing (id: number) {
        const followingList = await this.prismaService.follows.findMany({
            where: {
                followerId: id
            },
            select: {
                following: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                }
            }
        })

        return followingList.map((item) => item.following);
    }
}