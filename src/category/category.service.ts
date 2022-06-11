import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAllCategory() {
        return this.prismaService.category.findMany();
    }

    async getCategoryById(id: number) {
        return await this.prismaService.category.findUnique({
            where: { id },
        });
    }
}
