import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotAcceptableException,
    NotFoundException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CommentService } from './comment.service';

@Injectable()
export class CommentGuard implements CanActivate {
    constructor(private readonly commentService: CommentService) {}

    async canActivate(context: ExecutionContext) {
        const graphqlContext = GqlExecutionContext.create(context);
        const user = graphqlContext.getContext().req?.user;
        const { id: commentId } = graphqlContext.getArgs();
        if (!commentId) {
            throw new NotFoundException('CommentId required');
        }

        const comment = await this.commentService.getCommentById(commentId);

        if (!comment) {
            throw new NotFoundException("This comment doesn't exist");
        }

        if (!user || user.id !== comment.authorId) {
            throw new NotAcceptableException("You aren't authorized to perform the action");
        }

        return true;
    }
}
