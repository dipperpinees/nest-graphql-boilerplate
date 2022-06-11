import { registerEnumType } from "@nestjs/graphql";

export enum TIMESORT {
    ASC="asc",
    DESC="desc"
}

registerEnumType(TIMESORT, {
    name: 'TimeSort',
});