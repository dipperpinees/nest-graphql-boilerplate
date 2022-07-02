import { registerEnumType } from "@nestjs/graphql";

export enum SORT {
    ASC="asc",
    DESC="desc"
}

registerEnumType(SORT, {
    name: 'TimeSort',
});