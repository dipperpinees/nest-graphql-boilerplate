import { UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { User } from 'src/user/model/user.model';
import { RegisterExceptionFilter } from './auth-exception.filter';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignInUser } from './models/sign-in-user.model';
import { SignInInput } from './models/sign-in.input';
import { SignUpInput } from './models/sign-up.input';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private cloudinaryService: CloudinaryService
    ) {}

    @UseFilters(RegisterExceptionFilter)
    @UsePipes(ValidationPipe)
    @Mutation((returns) => SignInUser, { name: 'SignUp' })
    async signUp(
        @Args({ name: 'avatar', type: () => GraphQLUpload, nullable: true }) avatar: FileUpload,
        @Args('signUpData') signUpData: SignUpInput,
        @Context() context: any
    ) {
        const avatarUploaded = avatar && (await this.cloudinaryService.uploadSingleImage(avatar));
        const userData = await this.authService.signUp({
            ...signUpData,
            ...(avatarUploaded && { avatar: avatarUploaded.url }),
        });

        context.res.cookie('token', userData.token, {
            maxAge: 1000 * Number(process.env.TOKENEXPIRATION),
            httpOnly: true,
            samesite: true,
            secure: true,
        });
        return userData;
    }

    @UseFilters(RegisterExceptionFilter)
    @UsePipes(ValidationPipe)
    @Mutation((returns) => SignInUser, { name: 'SignIn' })
    async signIn(@Args('signInData') { email, password }: SignInInput, @Context() context: any) {
        const userData = await this.authService.signIn(email, password);
        context.res.cookie('token', userData.token, {
            maxAge: 1000 * Number(process.env.TOKENEXPIRATION),
            httpOnly: true,
            samesite: true,
            secure: true,
        });
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
        context.res.cookie('token', '', { maxAge: 0 });
        return true;
    }
}
