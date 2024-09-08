import {Query} from "@/application/cqrs/query/base/Query";

export interface QueryHandler<R, Q extends Query<R>> {
    handle(query: Q): R;
    getExceptionMessage(exceptionCode: string): string;
}