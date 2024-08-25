import {QueryValidateResult} from "@/appplication/cqrs/query/base/QueryValidateResult";
import {Query} from "@/appplication/cqrs/query/base/Query";

export interface QueryValidator<Q extends Query<any>> {
    validate(query: Q): QueryValidateResult;
    getValidationMessage(validateCode: string): string;
}