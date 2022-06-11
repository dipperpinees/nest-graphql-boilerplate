import { Field, ObjectType } from "@nestjs/graphql";
import { Pagination } from "src/shared/model/pagination.model";
import { Post } from "./post.model";

@ObjectType()
export class FilterPost {
    @Field((type) => [Post], {nullable: 'items'})
    docs?: Post[]

    @Field((type) => Pagination)
    pagination: Pagination
}