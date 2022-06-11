import { Field, InputType, Int } from "@nestjs/graphql";
import { Length } from "class-validator";
import { PaginationInput } from "src/shared/model/pagination.input";
import { TIMESORT } from "./time-sort.enum";

@InputType()
export class FilterPostInput extends PaginationInput {
    @Field((type) => TIMESORT, {nullable: true})
    createdAt?: TIMESORT;

    @Field((type) => TIMESORT, {nullable: true})
    updatedAt?: TIMESORT;

    @Field((type) => Int, {nullable: true})
    categoryId?: number;

    @Length(0,50)
    @Field({nullable: true})
    search?: string;
}