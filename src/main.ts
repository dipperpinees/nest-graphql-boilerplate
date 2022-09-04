import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import * as cookieParser from 'cookie-parser';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);

    app.use(cookieParser());
    app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
