import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
    imports: [CloudinaryModule],
    providers: [AuthResolver, AuthService],
})
export class AuthModule {}
