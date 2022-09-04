import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    userSelect = {
        id: true,
        name: true,
        avatar: true,
        education: true,
        work: true,
        birthday: true,
        description: true,
        address: true,
        createdAt: true,
        updatedAt: true,
    };

    async findByEmail(email: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email,
            },
            select: this.userSelect,
        });

        return user;
    }

    async findById(id: number) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id,
            },
            select: this.userSelect,
        });

        return user;
    }

    async getUserPosts(userId: number) {
        const posts = await this.prismaService.post.findMany({
            where: {
                authorId: userId,
            },
        });

        return posts;
    }

    async updateUser(userId, updateData: Prisma.UserUpdateInput) {
        return this.prismaService.user.update({
            where: {
                id: userId,
            },
            data: updateData,
            select: this.userSelect,
        });
    }

    async follow(data: Prisma.FollowsCreateInput) {
        return this.prismaService.follows.create({
            data,
            include: {
                follower: true,
                following: true,
            },
        });
    }

    async unFollow(data: Prisma.FollowsUncheckedCreateInput) {
        return await this.prismaService.follows.delete({
            where: {
                followerId_followingId: data,
            },
        });
    }

    async getFollower(id: number) {
        const followerList = await this.prismaService.follows.findMany({
            where: {
                followingId: id,
            },
            select: {
                follower: {
                    select: this.userSelect,
                },
            },
        });

        return followerList.map((item) => item.follower);
    }

    async getFollowing(id: number) {
        const followingList = await this.prismaService.follows.findMany({
            where: {
                followerId: id,
            },
            select: {
                following: {
                    select: this.userSelect,
                },
            },
        });

        return followingList.map((item) => item.following);
    }

    async getFollowerNumber(id: number) {
        const count = await await this.prismaService.follows.count({
            where: {
                followingId: id,
            },
        });
        return count;
    }

    async getFollowingNumber(id: number) {
        const count = await await this.prismaService.follows.count({
            where: {
                followerId: id,
            },
        });
        return count;
    }

    async isFollowed(followingId: number, userId: number) {
        const data = await this.prismaService.follows.findUnique({
            where: {
                followerId_followingId: {
                    followerId: userId,
                    followingId: followingId,
                },
            },
        });
        return !!data;
    }
}
