import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Pagination {
    @Field((type) => Int)
    totalDocs: number;

    @Field((type) => Int)
    page: number;

    @Field((type) => Int)
    limit: number;

    @Field((type) => Int)
    totalPages: number;
}
