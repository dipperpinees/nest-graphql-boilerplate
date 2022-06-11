import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
    imports: [UserModule],
    providers: [PostService, PostResolver],
    exports: [PostService]
})
export class PostModule {}
