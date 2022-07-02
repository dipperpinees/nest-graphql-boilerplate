import { ApolloDriver } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        UserModule,
        PrismaModule,
        PostModule,
        ConfigModule.forRoot(),
        GraphQLModule.forRoot({
            driver: ApolloDriver,
            autoSchemaFile: 'schema.gql',
            introspection: true,
            playground: true,
            uploads: false,
            context: ({ req, res }) => ({ req, res })
        }),
        AuthModule,
        CategoryModule,
        CommentModule,
        CloudinaryModule,
    ],
    controllers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('graphql');
    }
}
