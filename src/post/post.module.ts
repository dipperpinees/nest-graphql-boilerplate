import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/category/category.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UserModule } from 'src/user/user.module';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
    imports: [UserModule, CloudinaryModule, CategoryModule],
    providers: [PostService, PostResolver],
    exports: [PostService],
})
export class PostModule {}
