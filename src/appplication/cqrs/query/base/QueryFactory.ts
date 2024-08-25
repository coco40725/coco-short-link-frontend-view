import {QueryHandler} from "@/appplication/cqrs/query/base/QueryHandler";
import {Query} from "@/appplication/cqrs/query/base/Query";
import {QueryValidator} from "@/appplication/cqrs/query/base/QueryValidator";


export class QueryFactory {

    private static QueryHandlerMap = new Map<string, QueryHandler<any, Query<any>>>()
    private static QueryValidatorMap = new Map<string, QueryValidator<any>>()

    static registerQueryHandler<R> (handler: QueryHandler<R, Query<R>>, queryName: string) {
        QueryFactory.QueryHandlerMap.set(queryName, handler)
    }

    static registerQueryValidator<R> (validator: QueryValidator<R>, queryName: string) {
        QueryFactory.QueryValidatorMap.set(queryName, validator)
    }

    getQueryHandler<R>(query: Query<R>): QueryHandler<any, Query<any>>{
        const queryName = query.constructor.name
        return QueryFactory.QueryHandlerMap.get(queryName)

    }
    getQueryValidator<R>(Query: Query<R>): QueryValidator<any> {
        const queryName = Query.constructor.name
        return QueryFactory.QueryValidatorMap.get(queryName)
    }
}

