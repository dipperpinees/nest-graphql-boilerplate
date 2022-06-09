import { Module } from '@nestjs/common';
import { PostModule } from 'src/post/post.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    providers: [UserService, UserResolver],
})
export class UserModule {}
