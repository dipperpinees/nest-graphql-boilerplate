import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) {}

    userSelect = {
        id: true,
        name: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
    };

    async signUp(user: Prisma.UserCreateInput) {
        const hashedPassword = user.password && (await hash(user.password, 10));
        const userData = await this.prismaService.user.create({
            data: {
                ...user,
                password: hashedPassword,
            },
            select: this.userSelect,
        });

        const token = this.generateJWT(userData);

        return {
            user: userData,
            token,
        };
    }

    async signIn(email: string, password: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        });
        if (user) {
            return await compare(password, user.password).then((result) => {
                if (result) {
                    delete user.email;
                    delete user.password;
                    const token = this.generateJWT(user);
                    return {
                        user,
                        token,
                    };
                } else {
                    throw new HttpException('Wrong password', 400);
                }
            });
        } else {
            throw new HttpException("This account doesn't exist", 400);
        }
    }

    async updateAvatar(userId: number, avatar: string) {
        const userData = await this.prismaService.user.update({
            where: {
                id: userId,
            },
            data: {
                avatar,
            },
            select: this.userSelect,
        });

        const token = this.generateJWT(userData);

        return {
            user: userData,
            token,
        };
    }

    generateJWT(user: any) {
        return jwt.sign(
            {
                data: user,
            },
            process.env.SECRET_KEY,
            { expiresIn: Number(process.env.TOKENEXPIRATION) }
        );
    }

    setToken(context: any, token: string) {
        context.res.cookie('token', token, {
            maxAge: 1000 * Number(process.env.TOKENEXPIRATION),
            httpOnly: true,
            samesite: true,
            secure: true,
        });
    }

    deleteToken(context: any) {
        context.res.cookie('token', '', { maxAge: 0 });
    }
}
