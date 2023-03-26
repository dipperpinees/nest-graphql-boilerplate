import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class PaginationInput {
    @Min(1)
    @Field((type) => Int)
    page = 1;

    @Field((type) => Int)
    limit = 10;
}
