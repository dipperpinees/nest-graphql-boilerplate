import { UseFilters, UsePipes } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { User } from 'src/user/model/user.model';
import { RegisterExceptionFilter } from './auth-exception.filter';
import { AuthService } from './auth.service';
import { SignInInput } from './models/sign-in.input';
import { SignUpInput } from './models/sign-up.input';
import { SignInUser } from './models/sign-in-user.model';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @UseFilters(RegisterExceptionFilter)
    @UsePipes(ValidationPipe)
    @Mutation((returns) => User, { name: 'SignUp' })
    async signUp(@Args('signUpData') signUpData: SignUpInput) {
        return await this.authService.signUp(signUpData);
    }

    @UseFilters(RegisterExceptionFilter)
    @UsePipes(ValidationPipe)
    @Mutation((returns) => SignInUser, { name: 'SignIn' })
    async signIn(@Args('signInData') { email, password }: SignInInput) {
        return await this.authService.signIn(email, password);
    }
}
