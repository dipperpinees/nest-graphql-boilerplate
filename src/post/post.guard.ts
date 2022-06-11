import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotAcceptableException,
    NotFoundException
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PostService } from './post.service';

@Injectable()
export class PostGuard implements CanActivate {
    constructor(private readonly postService: PostService) {}

    async canActivate(context: ExecutionContext) {
        const graphqlContext = GqlExecutionContext.create(context);
        const user = graphqlContext.getContext().req?.user;
        const { id: postId } = graphqlContext.getArgs();
        if (!postId) {
            throw new NotFoundException('PostId required');
        }

        const post = await this.postService.getPostById(postId);

        if(!post) {
            throw new NotFoundException('This post doesn\'t exist')
        }

        if (!user || user.id !== post.authorId) {
            throw new NotAcceptableException("You aren't authorized to perform the action");
        }

        return true;
    }
}
