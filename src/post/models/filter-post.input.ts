import { Field, InputType, Int } from "@nestjs/graphql";
import { Length } from "class-validator";
import { PaginationInput } from "src/shared/model/pagination.input";
import { SORT } from "./time-sort.enum";

@InputType()
export class FilterPostInput extends PaginationInput {
    @Field((type) => SORT, {nullable: true})
    createdAt?: SORT;

    @Field((type) => SORT, {nullable: true})
    updatedAt?: SORT;

    @Field((type) => Int, {nullable: true})
    categoryId?: number;

    @Field({nullable: true})
    search?: string;

    @Field((type) => SORT, {nullable: true})
    views?: SORT
}