import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) {}

    async signUp(user: Prisma.UserCreateInput) {
        const hashedPassword = user.password && (await hash(user.password, 10));
        const userData = await this.prismaService.user.create({
            data: {
                ...user,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                avatar: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        const token = this.generateJWT(userData);

        return {
            user: userData,
            token
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

    generateJWT(user: any) {
        return jwt.sign(
            {
                data: user,
            },
            process.env.SECRET_KEY,
            { expiresIn: Number(process.env.TOKENEXPIRATION) }
        );
    }
}
