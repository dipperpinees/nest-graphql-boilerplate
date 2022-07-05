import { Module } from '@nestjs/common';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    imports: [CloudinaryModule],
    providers: [UserService, UserResolver],
    exports: [UserService]
})
export class UserModule {}
