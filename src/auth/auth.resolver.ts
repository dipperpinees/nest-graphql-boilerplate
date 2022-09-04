import { UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { User } from 'src/user/model/user.model';
import { RegisterExceptionFilter } from './auth-exception.filter';
import { CurrentUser } from './auth.decorator';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignInUser } from './models/sign-in-user.model';
import { SignInInput } from './models/sign-in.input';
import { SignUpInput } from './models/sign-up.input';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly cloudinaryService: CloudinaryService
    ) {}

    @UseFilters(RegisterExceptionFilter)
    @UsePipes(ValidationPipe)
    @Mutation((returns) => SignInUser, { name: 'SignUp' })
    async signUp(@Args('signUpData') signUpData: SignUpInput, @Context() context: any) {
        const userData = await this.authService.signUp({
            ...signUpData,
        });
        this.authService.setToken(context, userData.token);
        return userData;
    }

    @UseFilters(RegisterExceptionFilter)
    @UsePipes(ValidationPipe)
    @Mutation((returns) => SignInUser, { name: 'SignIn' })
    async signIn(@Args('signInData') { email, password }: SignInInput, @Context() context: any) {
        const userData = await this.authService.signIn(email, password);
        this.authService.setToken(context, userData.token);
        return userData;
    }

    @Query((returns) => User, { name: 'Auth' })
    @UseGuards(AuthGuard)
    async auth(@Context() context: any) {
        return context.req.user;
    }

    @Mutation((returns) => Boolean, { name: 'LogOut' })
    @UseGuards(AuthGuard)
    async logOut(@Context() context: any) {
        this.authService.deleteToken(context);
        return true;
    }

    @UseGuards(AuthGuard)
    @Mutation((returns) => String, { name: 'UpdateAvatar' })
    async updateAvatar(
        @Args({ name: 'avatar', type: () => GraphQLUpload, nullable: true }) avatar: FileUpload,
        @CurrentUser('id') id: number,
        @Context() context: any
    ) {
        const { url } = await this.cloudinaryService.uploadSingleImage(avatar);
        const { token } = await this.authService.updateAvatar(id, url);
        this.authService.setToken(context, token);
        return url;
    }
}
